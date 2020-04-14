import { isIphoneX } from 'react-native-iphone-x-helper';
import { Platform, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

/**
 * @참고문서 CHABOT SERVICE 연동 규격서 1.04
 *
 * @보험조건 (필수조건)
 * treaty_range!            운전자 범위
 * treaty_charge!           물적사고할증기준
 * treaty_ers!              긴급출동서비스
 * coverage_bil!            대인배상2
 * coverage_pdl!            대물배상
 * coverage_mp_list!        자기신체손해/자동차상해
 * coverage_mp!             자기신체손해/자동사상해 범위
 * coverage_umbi!           무보험차상해
 * coverage_cac!            자기차량손해
 *
 * @보험조건 (운전자 범위가 피보험자1인이 아닐 경우에만 필수조건)
 * driver_year!             YYYY
 * driver_month!            MM
 * driver_day!              DD
 *
 * @블랙박스특약 (선택조건)
 * discount_bb!             블랙박스할인
 * discount_bb_price!       블랙박스 가격
 * discount_bb_year         구입년도
 * discount_bb_month        구입월
 *
 * @자녀할인특약 (선택조건)
 * discount_child!          자녀할인
 * discount_child_year!     YYYY
 * discount_child_month!    MM
 * discount_child_day!      DD
 *
 * @주행거리특약 (선택조건
 * discount_dis!            주행거리 ex) 1,000km
 *
 */

export const CLIENT_TYPE = {
  EMPLOYEE: '직장인(4대보험가입자/6개월이상)',
  EMPLOYER: '개인사업자(1년이상)',
  ETC: '기타',
};

export const API = {
  AUTH: 'https://www.chabot.kr/chabot/auth/',
  CAR_FOR_INSURANCE: 'https://www.chabot.kr/chabot/car_info/',
  CAR_BY_NUMBER: 'https://its-api.net/api/get-carinfo/',
  INSURANCE: 'https://www.chabot.kr/chabot/condition/',
  BIZ_CAR_DATA_SERVER: 'https://bon.chabot.kr:8021/api',
  // NOTE: Dev port
  // BIZ_SERVER: "https://bon.chabot.kr:8000/api",
  // BIZ_SERVER: 'http://bon.chabot.kr:4000/api',
  // NOTE: Prod port
  BIZ_SERVER: 'https://bon.chabot.kr:8021/api',
  EM_EYE: 'https://api.chabot.kr/chabot/query/',
  IMAGE_PATH:
    'https://s3.ap-northeast-2.amazonaws.com/s3.chabot.co.kr/carDBMaker/',
  BIZ_PRIME_REST_SERVER: 'https://bon.chabot.kr:3000',
};

export const PLATFORM = {
  IS_IOS: Platform.OS === 'ios',
  IS_IPHONE_X:
    parseInt(
      DeviceInfo.getDeviceId()
        .split('iPhone')
        .pop(),
    ) >= 10,
  IS_ANDROID: Platform.OS === 'android',
  PLATFORM_SPECIFIC_MARGIN_BOTTOM: (
    lowLevelDeviceMarginScale: number = 30,
    highLevelOne: number = 0,
  ) => {
    if (Platform.OS === 'ios') {
      if (!isIphoneX()) {
        return lowLevelDeviceMarginScale;
      }

      return highLevelOne;
    }

    if (Platform.OS === 'android') {
      return lowLevelDeviceMarginScale;
    }
  },
};

export default {
  DISTRICT: [
    { label: '서울', value: '서울' },
    { label: '부산', value: '부산' },
    { label: '대구', value: '대구' },
    { label: '경남', value: '경남' },
    { label: '인천', value: '인천' },
    { label: '충북', value: '충북' },
    { label: '경기', value: '경기' },
    { label: '강원', value: '강원' },
    { label: '울산', value: '울산' },
    { label: '전남', value: '전남' },
    { label: '대전', value: '대전' },
    { label: '전북', value: '전북' },
    { label: '광주', value: '광주' },
    { label: '경북', value: '경북' },
    { label: '세종', value: '세종' },
    { label: '충남', value: '충남' },
    { label: '제주', value: '제주' },
  ],
  AUTH: {
    PROVIDER_LIST: [
      { label: 'SKT', value: '01' },
      { label: 'KT', value: '02' },
      { label: 'LG', value: '03' },
      { label: 'sk알뜰폰', value: '04' },
      { label: 'kt알뜰폰', value: '05' },
      { label: 'lg알뜰폰', value: '06' },
    ],
  },
  INSURANCE: {
    TREATY_RANGE: [
      '피보험자1인',
      '피보험자1인+지정1인',
      '누구나',
      '부부한정',
      '가족한정',
      '가족한정+형제자매',
    ], // 운전자 범위
    TREATY_CHARGE: ['50만원', '100만원', '150만원', '200만원'], // 물적사고할증기준
    COVERAGE_PDL: [
      '2천만원',
      '3천만원',
      '5천만원',
      '1억원',
      '2억원',
      '3억원',
      '5억원',
    ], //대물배상
    COVERAGE_MP_LIST: ['자기신체손해', '자동차상해'], // 자기신체손해/자동차상해
    COVERAGE_MP: {
      //자상/자손 범위
      BODY_INJURY: [
        '1천5백만원/1천5백만원',
        '3천만원/1천5백만원',
        '5천만원/1천5백만원',
        '1억원/1천5백만원',
      ],
      CAR_DAMAGE: [
        '1억원/2천만원',
        '1억원/3천만원',
        '2억원/2천만원',
        '2억원/3천만원',
      ],
    },
    JOIN: '가입',
    JOIN_WITH_2B: '가입(2억원)',
    NOT_JOIN: '미가입',
    YES: 'YES',
    NO: 'NO',
  },
  INSURANCE_CONDITION: {
    BASIC: {
      treaty_range: '피보험자1인',
      coverage_bil: '가입',
      coverage_pdl: '1억원',
      coverage_mp_list: '자기신체손해',
      coverage_mp: '3천만원/1천5백만원',
      coverage_umbi: '가입(2억원)',
      coverage_cac: '가입',
      treaty_ers: '가입',
      treaty_charge: '200만원',
    },
    STANDARD: {
      treaty_range: '피보험자1인',
      coverage_bil: '가입',
      coverage_pdl: '3억원',
      coverage_mp_list: '자동차상해',
      coverage_mp: '1억원/2천만원',
      coverage_umbi: '가입(2억원)',
      coverage_cac: '가입',
      treaty_ers: '가입',
      treaty_charge: '200만원',
    },
    PREMIUM: {
      treaty_range: '피보험자1인',
      coverage_bil: '가입',
      coverage_pdl: '5억원',
      coverage_mp_list: '자동차상해',
      coverage_mp: '2억원/3천만원',
      coverage_umbi: '가입(2억원)',
      coverage_cac: '가입',
      treaty_ers: '가입',
      treaty_charge: '200만원',
    },
  },
  CAR: {
    MANUFACTURER_LIST: [
      { label: '현대', value: '현대' },
      { label: '기아', value: '기아' },
      { label: '삼성', value: '삼성' },
      { label: '대우', value: '대우' },
      { label: '쌍용', value: '쌍용' },
      { label: '수입차', value: '외산' },
    ],
    MANUFACTURER: 'manufacturer',
    CAR_NAME: 'car_name',
    REGISTER_YEAR: 'register_year',
    DETAIL_OPTION: 'detail_option',
    DETAIL_NAME: 'detail_name',
  },
  NEXT_COL: {
    MANUFACTURER: 'manufacturer',
    CAR_NAME: 'car_name',
    REGISTER_YEAR: 'register_year',
    DETAIL_NAME: 'detail_name',
    DETAIL_OPTION: 'detail_option',
    INSURANCE: 'request',
    AUTH: 'auth',
    AUTH_CONFIRM: 'auth_ok',
  },
  UNIT: {
    KM: 'Km',
    WON: '원',
  },
  PAYMENT: {
    PAY_IN_FULL: 'payInFull',
    EMI: 'installment',
    LEASE: 'lease',
    RENT: 'rent',
  },
  SERVICES: {
    INSURANCE: 'insurance',
  },
  ACCORDION_DATA: {
    NEW_CAR: [
      { service: 'NewCarPurchase', title: '현금(카드)', payment: 'PayInFull' },
      { service: 'NewCarPurchase', title: '할부', payment: 'Installment' },
      { service: 'ExchangeLoan', title: '대환', payment: 'ExchangeLoan' },
      // { service: "NewCarPurchase", title: "리스", payment: "Lease" },
      // { service: "NewCarPurchase", title: "렌트", payment: "Rent" },
    ],
    SECOND_HAND: [{ service: 'SecondhandCarSelling', title: '중고차 판매' }],
    INSURANCE: [{ service: 'InsurantSelect', title: '견적 신청하기' }],
    OTHER_SERVICES: [{ service: 'OtherServices', title: '기타 서비스' }],
  },
};
