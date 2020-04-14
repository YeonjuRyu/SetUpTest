import { BackHandler, Alert } from 'react-native';

export default class BackPressHandler {
  static exit() {
    Alert.alert(
      '알림',
      '앱을 종료하시겠습니까?',
      [
        { text: '아니오' },
        { text: '종료', onPress: () => BackHandler.exitApp() },
      ],
      {
        cancelable: true,
      },
    );

    return true;
  }

  static backToExit() {
    BackHandler.addEventListener('hardwareBackPress', BackPressHandler.exit);
  }

  static removeBackToExit() {
    BackHandler.removeEventListener('hardwareBackPress', BackPressHandler.exit);
  }
}
