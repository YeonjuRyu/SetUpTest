/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import { name as appName } from './app.json';
import Root from './Root';

YellowBox.ignoreWarnings([
  'Remote debugger',
  'componentWill',
  'Require cycle: ',
]);

AppRegistry.registerComponent(appName, () => Root);
