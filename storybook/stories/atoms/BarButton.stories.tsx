import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import {
  action,
  actions,
  withActions,
  decorate,
  configureActions,
} from '@storybook/addon-actions';
import { BarButton } from '@components';
import { withKnobs, text, object, boolean } from '@storybook/addon-knobs/dist';

const firstArg = decorate([(args) => args.slice(0, 1)]);

const config = {
  depth: 100,
  limit: 20,
  clearOnStoryChange: false,
};

const barButtonStory = storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .addDecorator((story) => (
    <View style={{ flex: 1, justifyContent: 'center' }}>{story()}</View>
  ))
  .add('버튼', () => {
    const title = '텍스트가 들어갈 자리';
    const disabled = false;
    const style = {};
    return (
      <BarButton
        style={object('Style', style)}
        disabled={boolean('Disabled', disabled)}
        onPress={action('clicked')}
        title={text('Title', title)}
      />
    );
  });

export default barButtonStory;
