import forEach from 'lodash/forEach';
import values from 'lodash/values';
import numeral from 'numeral';
import moment from 'moment';
import { PLATFORM } from './Constant';
// import { URL, URLSearchParams } from 'whatwg-url';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

type Client = {
  id?: number;
  user_id?: number;
  name: string;
  phone: string;
};

type PriceList = Array<PriceListItem>;
type PriceListItem = {
  price: number;
};

const isQueryIncluded = (url: string) => {
  return url.match(/query=({.*})/i)?.length > 0;
  // Lookbehind not working
  // return new RegExp('(?<=query=){.*}').test(url);
  // let parsedURL = new URLSearchParams(url.split('/?')[1]);
  // return parsedURL.has('query');
};

const getQueryVariables = (url: string) => {
  let queryVariables = url.split('query=')[1];
  return decodeURIComponent(queryVariables);
};

const isUnique = (list = [], target = {}, key = 'no') => {
  return list.every(item => item[key] !== target[key]);
};

const createImmutableList = (list = [], target = {}, key = 'no') => {
  if (isUnique(list, target)) {
    return [...list, target];
  } else {
    return list.filter(item => item[key] !== target[key]);
  }
};

const getTotalPrice = (
  list: PriceList = [{ price: 0 }],
  basePrice: number | string,
) => {
  const sum = list.reduce(
    (total, { price }) => (total += price),
    numeral(basePrice).value(),
  );
  return numeral(sum).format('0,0');
};

const getPropertyValues = (
  collection: object = {},
  target: string,
): Array<any> => {
  let result: Array<any> = [];

  forEach(collection, (value, key) => {
    if (key === target) {
      result = value;
      return result;
    }

    if (typeof value === 'object' && values(value).length >= 1) {
      result = getPropertyValues(value, target);
      return result;
    }
  });

  return result;
};

const getCashbackRate = (collection, cashback, isDomestic) => {
  return (
    collection
      .filter(({ detailType }) => {
        if (detailType === 'ALL') return true;
        if (isDomestic && detailType === 'DOMESTIC') return true;
        if (!isDomestic && detailType === 'NONDOMESTIC') return true;
        return false;
      })
      .filter(({ startRange, endRange, carMasterRate }) => {
        if (startRange === 0 && cashback < endRange) return true;
        if (endRange === 0 && cashback >= startRange) return true;
        if (startRange <= cashback && cashback < endRange) return true;
        return false;
      })[0]?.carMasterRate ?? 0
  );
};

const getInstallmentCommissionRate = (collection, installmentRange) => {
  const commissionRate = collection
    .slice(0)
    .reduce((acc, { period, startRange, endRange, commission }, i, arr) => {
      const samePeriod = installmentRange === period;
      const sameStart = startRange === installmentRange;
      const sameEnd = endRange === installmentRange;

      if (samePeriod || sameStart || sameEnd) {
        arr.splice(0);
        return (acc += commission);
      }

      if (i === collection.length - 1) return (acc += commission);
      return acc;
    }, 0);

  return commissionRate;
};

const flattenInvoiceData = ({
  id: invoiceId,
  memo,
  newcarTask,
  account,
  client,
}) => {
  if (account === null) {
    account = {
      account: '',
      accountHolder: '',
      bank: {
        name: '',
      },
    };
  }

  const {
    grade,
    maker,
    model,
    partsOptions,
    updatedAt,
    newcarCashEstimate,
    newcarInstallmentEstimate,
  } = newcarTask;
  const { account: accountNumber = '', accountHolder = '', bank } = account;
  const { name: bankName } = bank;

  if (newcarTask.detailType === 'CASH') {
    const {
      acquisitionTax,
      acquisitionTaxRate,
      additionalFee,
      consignmentFee,
      bondDiscount,
      bondDiscountRate,
      carPrice,
      salePrice,
      totalCost,
      cashBackApply,
    } = newcarCashEstimate;

    let cashbackInfo = {};

    if (cashBackApply !== null) {
      const {
        downPayment,
        clientPaymentDate,
        clientCommission,
        clientCommissionRate,
        cashBackPromotion,
      } = cashBackApply;

      cashbackInfo = {
        downPayment,
        clientPaymentDate,
        clientCommission,
        clientCommissionRate,
        companyName: cashBackPromotion.company,
      };
    }

    return {
      invoiceId,
      clientName: client.name,
      memo,
      account: accountNumber,
      accountHolder,
      bank: bankName,
      grade,
      maker,
      model,
      partsOptions,
      updatedAt,
      acquisitionTax,
      acquisitionTaxRate,
      additionalFee,
      consignmentFee,
      bondDiscount,
      bondDiscountRate,
      carPrice,
      salePrice,
      totalCost,
      ...cashbackInfo,
    };
  }

  if (newcarTask.detailType === 'INSTALLMENT') {
    const {
      carPrice,
      salePrice,
      downPayment,
      installmentPrincipal,
      installmentRange,
      interestRate,
      acquisitionTax,
      acquisitionTaxRate,
      bondDiscount,
      bondDiscountRate,
      additionalFee,
      consignmentFee,
      totalCost,
      monthlyCost,
      installmentProductionApply,
    } = newcarInstallmentEstimate;

    let installmentPromotionInfo = {
      clientType: null,
      productName: null,
    };

    if (installmentProductionApply !== null) {
      const { clientType, installmentPromotion } = installmentProductionApply;

      installmentPromotionInfo = {
        clientType,
        productName: installmentPromotion.productName,
      };
    }

    return {
      invoiceId,
      clientName: client.name,
      memo,
      account: accountNumber,
      accountHolder,
      bank: bankName,
      grade,
      maker,
      model,
      partsOptions,
      updatedAt,
      carPrice,
      salePrice,
      downPayment,
      installmentPrincipal,
      installmentRange,
      interestRate,
      acquisitionTax,
      acquisitionTaxRate,
      bondDiscount,
      bondDiscountRate,
      additionalFee,
      consignmentFee,
      totalCost,
      monthlyCost,
      ...installmentPromotionInfo,
    };
  }
};

const getContactInfoByPlatform = contacts => {
  let collection = [];

  if (PLATFORM.IS_ANDROID && contacts.length) {
    collection = contacts.map(({ displayName, phoneNumbers }, i) => {
      const phone = phoneNumbers.reduce((acc, { label, number }, i, arr) => {
        if (
          label === 'mobile' ||
          label === 'work' ||
          label === 'home' ||
          label === 'other'
        ) {
          arr.splice(0);
          return (acc += number);
        }

        return acc;
      }, '');

      return {
        name: displayName,
        phone:
          phone.length === 11
            ? `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`
            : phone,
      };
    });
  }

  if (PLATFORM.IS_IOS && contacts.length) {
    collection = contacts.map(({ familyName, givenName, phoneNumbers }, i) => {
      const phone = phoneNumbers.reduce((acc, { label, number }, i, arr) => {
        if (
          label === '집' ||
          label === '직장' ||
          label === 'iPhone' ||
          label === '휴대전화' ||
          label === '기타'
        ) {
          arr.splice(0);
          return (acc += number);
        }

        return acc;
      }, '');

      return {
        name: `${familyName}${givenName}`,
        phone,
      };
    });
  }

  return collection;
};

const calculateLevelPayment = ({ principal, interestRate, period }) => {
  if (interestRate <= 0) {
    return 0;
  }

  const power = Math.pow(1 + interestRate / 12, period);
  const repayments = (((principal * interestRate) / 12) * power) / (power - 1);
  return repayments;
};

const _getLevelPaymentTableData = ({
  installmentPrincipal,
  period,
  interestRate,
}) => {
  const rate = interestRate / 12;
  // console.log('rate: ', rate);
  const denominator = Math.pow(1 + rate, period) - 1; // 분모
  // console.log('분모: ', denominator)
  const numerator = installmentPrincipal * rate * Math.pow(1 + rate, period); // 분자
  // console.log('분자: ', numerator)
  const monthlyCost = Math.round(numerator / denominator);
  // console.log('monthly pay: ', monthlyCost);

  const paymentData = [];

  let restTotal = installmentPrincipal;

  for (let month = 1; month <= period; month++) {
    const interest = Math.round(restTotal * rate);
    const principal = monthlyCost - interest;
    const isLastMonth = month === period;

    if (isLastMonth === false) {
      restTotal -= principal;
    }

    paymentData.push({
      monthlyCost: isLastMonth === false ? monthlyCost : restTotal,
      interest,
      principal: isLastMonth === false ? principal : restTotal - interest,
      restTotal: isLastMonth === false ? restTotal : 0,
    });
  }
  // console.log('old', paymentData);
  return paymentData;
};

const getLevelPaymentTableData = ({
  installmentPrincipal, // 할부 원금
  installmentRange, // 할부 기간
  interestRate, // 금리(연)
}) => {
  const rate = interestRate / 12 / 100;
  // console.log('rate: ', rate);
  const denominator = Math.pow(1 + rate, installmentRange) - 1; // 분모
  // console.log('분모: ', denominator)
  const numerator =
    installmentPrincipal * rate * Math.pow(1 + rate, installmentRange); // 분자
  // console.log('분자: ', numerator)
  const monthlyCost = numerator / denominator;
  // console.log('monthly pay: ', monthlyCost);

  const paymentData = [];

  let restTotal = installmentPrincipal;

  for (let month = 1; month <= installmentRange; month++) {
    const interest = restTotal * rate;
    const principal = monthlyCost - interest;

    restTotal -= principal;

    if (restTotal < 1) {
      restTotal = 0;
    }

    paymentData.push({
      monthlyCost,
      interest,
      principal,
      restTotal,
    });
  }
  // console.log('new', paymentData);
  return paymentData;
};

const createRestParams = (data: object): URLSearchParams => {
  const params = new URLSearchParams();

  for (let key in data) {
    params.append(key, data[key]);
  }

  return params;
};

const getPhoneNumberFormat = (prevNumber, phone) => {
  if (phone.length > 13) return prevNumber;
  if (phone.length > 3 && phone.split('-').length === 1) return prevNumber;

  try {
    if (phone.length === 0 && prevNumber.length === 0) return '';
    const backward = phone.length - prevNumber.length === -1;
    const collection = phone.split('-');

    if (backward && collection[collection.length - 1] === '') {
      collection.pop();
      return collection.join('-');
    }

    if (backward && collection[collection.length - 1] !== '') return phone;

    if (!backward && (phone.length === 3 || phone.length === 8)) {
      return phone + '-';
    } else {
      return phone;
    }
  } catch (error) {
    console.log('during formatting: ', error);
    return '';
  }
};

const categorizeHistoryListByDate = (flattenHistoryList: any[]) => {
  const sectionDataContainer = {};
  const today = moment().format('MM월 D일 (ddd)');

  flattenHistoryList.forEach((history, i) => {
    const historyDate = moment(history.createdAt).format('MM월 D일 (ddd)');
    const day = moment(history.createdAt).format('D');
    const sectionHeaderDate =
      today === historyDate ? `오늘 ・ ${historyDate}` : historyDate;
    const prevData = sectionDataContainer[day] || null;

    if (prevData !== null) {
      return (prevData.data = [...prevData.data, history]);
    }

    if (prevData === null) {
      sectionDataContainer[day] = {
        title: sectionHeaderDate,
        data: [history],
      };
    }
  });

  const categorized = [];

  for (let day in sectionDataContainer) {
    if (sectionDataContainer.hasOwnProperty(day)) {
      categorized[day] = sectionDataContainer[day];
    }
  }

  return categorized
    .filter(history => history)
    .map(history => {
      return {
        ...history,
        sortByType: function(type) {
          return this.data.filter(({ historyType }) => historyType !== type);
        },
      };
    })
    .reverse();
};

export default {
  setWDR(component: React.FunctionComponent, boolean: boolean = true) {
    component.whyDidYouRender = {
      logOnDifferentValues: boolean,
    };
  },
  keyExtractor(item) {
    if (typeof item.id === 'number') {
      return item.id.toString();
    }

    return `${item.name}:${item.no || item.bcc_no}`;
  },
  getAlphabet(type: 'upper' | 'lower' = 'upper') {
    const collection = {};
    let i = 0;

    while (i !== 26) {
      collection[String.fromCharCode(65 + i)] = [];
      i++;
    }

    return collection;
  },
  extractKoConsonant(str: string, num: number = 0): string {
    if (str.length < num) {
      throw new Error(
        'Second argument must be the same or less than the length of First argument',
      );
    }

    const ko_consonant: Array<String> = [
      'ㄱ',
      'ㄲ',
      'ㄴ',
      'ㄷ',
      'ㄸ',
      'ㄹ',
      'ㅁ',
      'ㅂ',
      'ㅃ',
      'ㅅ',
      'ㅆ',
      'ㅇ',
      'ㅈ',
      'ㅉ',
      'ㅊ',
      'ㅋ',
      'ㅌ',
      'ㅍ',
      'ㅎ',
    ];
    const alphabet = this.getAlphabet();

    // in case str is Korean consonant
    if (ko_consonant.includes(str) || alphabet[str]) {
      return str;
    }

    let result: string = '';
    let code: number = str.charCodeAt(num);

    // in case Korean character
    if (code >= 44032 && code < 55203) {
      code -= 44032;

      if (code > -1 && code < 11172) {
        return (result += ko_consonant[Math.floor(code / 588)]);
      }
    }

    const char = str[num].toUpperCase();
    return (result += alphabet[char] ? char : '#');
  },
  createContractFromData(data: Array<Client>) {
    const collection: { [key: string]: Array<Client> } = {
      ㄱ: [],
      ㄴ: [],
      ㄷ: [],
      ㄹ: [],
      ㅁ: [],
      ㅂ: [],
      ㅅ: [],
      ㅇ: [],
      ㅈ: [],
      ㅊ: [],
      ㅋ: [],
      ㅌ: [],
      ㅍ: [],
      ㅎ: [],
      ...this.getAlphabet(),
      '#': [],
    };

    for (let i = 0; i < data.length; i++) {
      const client: Client = data[i];
      if (!client || !client.name) {
        continue;
      }
      const category: string = this.extractKoConsonant(client.name);
      collection[category] = collection[category]
        ? collection[category].concat(client)
        : [client];
    }

    return collection;
  },
  getPropertyValues,
  getTotalPrice,
  createImmutableList,
  isQueryIncluded,
  getQueryVariables,
  isUnique,
  getCashbackRate,
  getInstallmentCommissionRate,
  flattenInvoiceData,
  getContactInfoByPlatform,
  calculateLevelPayment,
  getLevelPaymentTableData,
  createRestParams,
  getPhoneNumberFormat,
  categorizeHistoryListByDate,
};
