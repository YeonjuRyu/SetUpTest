import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import './rn-addons';

// import stories
configure(() => require('./stories/index.stories'), module);

const StorybookUIRoot = getStorybookUI({
  port: 7007,
  host: 'localhost',
  onDeviceUI: true,
  resetStorybook: true,
  shouldPersistSelection: true,
});

AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;
