import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import {
  action,
  actions,
  withActions,
  decorate,
  configureActions,
} from '@storybook/addon-actions';

import { BottomFullTwoButtonsScrollView } from '@components';
import { withKnobs, text, object, boolean } from '@storybook/addon-knobs/dist';

const firstArg = decorate([(args) => args.slice(0, 1)]);

const config = {
  depth: 100,
  limit: 20,
  clearOnStoryChange: false,
};

const bottomBarButtonSceneStorys = storiesOf('templates', module)
  .addDecorator(withKnobs)
  .add('고정 버튼 템플릿2', () => {
    const content = '텍스트가 들어갈 자리';
    const disabled = false;
    const style = {};
    return <BottomFullTwoButtonsScrollView />;
  });

export default bottomBarButtonSceneStorys;
