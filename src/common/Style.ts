import {
  isIphoneX,
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { Dimensions, Platform } from 'react-native';
import { PLATFORM } from './Constant';

type Direction = 'column' | 'row';
type y_axis = x_axis;
type x_axis =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'baseline'
  | 'stretch';

export default {
  buttonBottom: {
    marginBottom: PLATFORM.IS_ANDROID ? 30 : PLATFORM.IS_IPHONE_X ? 0 : 25,
  },
  statusBarHeight: getStatusBarHeight(),
  pureScreenHeight: isIphoneX()
    ? Dimensions.get('window').height -
      getStatusBarHeight(true) -
      getBottomSpace()
    : Dimensions.get('window').height,
  textStyle: (
    size: number = 13,
    color: string = '#1A1A1A',
    bold: boolean | string = false,
    textAlign: string = 'left',
  ): object => ({
    fontSize: size,
    color: color,
    fontWeight: bold ? (typeof bold === 'string' ? bold : 'bold') : 'normal',
    textAlign,
  }),
  layout: (
    direction: Direction = 'column',
    x: x_axis = 'flex-start',
    y: y_axis = 'flex-start',
  ): object => ({
    flexDirection: direction || 'column',
    justifyContent: (direction || 'column') === 'column' ? y : x,
    alignItems: (direction || 'column') === 'column' ? x : y,
  }),
  scrollableContainer: (
    paddingHorizontal: number = 0,
    y: y_axis = 'flex-start',
  ): object => ({
    flexGrow: 1,
    paddingHorizontal,
    justifyContent: y,
  }),
  boldText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'SpoqaHanSans-Bold',
  },
  normalText: {
    fontSize: 20,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  white: '#ffffff',
  blue: {
    main: '#1976D2',
    _900: '#0D47A1',
    _800: '#1565C0',
    _700: '#1976D2',
    _600: '#1E88E5',
    _500: '#2196F3',
    _400: '#42A5F5',
    _300: '#64B5F6',
    _200: '#90CAF9',
    _100: '#BBDEFB',
    _50: '#E3F2FD',
  },
  red: {
    main: '#DA351A',
    _900: '#C12711',
    _800: '#DA351A',
    _700: '#E83C1E',
    _600: '#F64323',
    _500: '#FF4927',
    _400: '#FF6746',
    _300: '#FF8367',
    _200: '#FFA792',
    _100: '#FFCABC',
    _50: '#FBE8E7',
  },
  black: {
    main: '#1A1A1A',
    _900: '#1A1A1A',
    _800: '#3A3A3A',
    _700: '#595959',
    _600: '#6C6C6C',
    _500: '#949494',
    _400: '#B4B4B4',
    _300: '#D8D8D8',
    _200: '#E8E8E8',
    _100: '#F2F2F2',
    _50: '#F9F9F9',
  },
  size: {
    _32: 32,
    _28: 28,
    _27: 27,
    _22: 22,
    _20: 20,
    _17: 17,
    _15: 15,
    _13: 13,
    _10: 10,
  },
  space: {
    _100: 100,
    _55: 55,
    _50: 50,
    _48: 48,
    _35: 35,
    _30: 30,
    _24: 24,
    _21: 21,
    _20: 20,
    _18: 18,
    _15: 15,
    _13: 13,
    _8: 8,
    _5: 5,
  },
  bold: 'bold',
  normal: 'normal',
  width: (percentage: number): number => {
    return (Dimensions.get('screen').width / 100) * percentage;
  },
  height: (percentage: number): number => {
    return (Dimensions.get('screen').height / 100) * percentage;
  },
  fullWidth: Dimensions.get('screen').width,
  fullHeight: Dimensions.get('screen').height,
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  palette: {
    transparent: 'transparent',
    black: '#000',
    blackTwo: '#1a1a1a',
    charcoal: '#1e201d',
    blackThree: '#3a3a3a',
    greyishBrown: '#595959',
    brownishGrey: '#6c6c6c',
    brownGreyTwo: '#8d8d8d',
    brownGrey: '#949494',
    white: '#f9f9f9',
    whiteTwo: 'rgb(255, 255, 255)',
    white10: '#ffffff',
    white20: '#ffffff',
    veryLightPink: '#d8d8d8',
    veryLightPinkTwo: '#e8e8e8',
    veryLightPinkThree: '#f2f2f2',
    veryLightPinkFour: '#ffe3e3',
    iceBlue: '#e4f2fd',
    powderBlue: '#bbdefb',
    lightBlue: '#90caf9',
    darkSkyBlue: '#36aeeb',
    waterBlue: '#1976d2',
    orangeyRed: '#da351a',
    brick: '#c92a2a',
    cream: '#e9fac8',
    lawnGreen: '#5c940d',
    eggShell: '#fff3bf',
    pumpkin: '#e67700',
    veryLightBlue: '#dbe4ff',
    windowsBlue: '#364fc7',
    greyish: '#b4b4b4',
  },
};
