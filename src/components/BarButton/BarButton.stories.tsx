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

import BarButton from './BarButton';
import { withKnobs, text, object, boolean } from '@storybook/addon-knobs/dist';

const firstArg = decorate([(args) => args.slice(0, 1)]);

const config = {
  depth: 100,
  limit: 20,
  clearOnStoryChange: false,
};

const barButtonStory = storiesOf('BarButton', module)
  .addDecorator(withKnobs)
  .add('텍스트', () => {
    const content = 'hello';
    const disabled = true;
    const style = {
      width: 200,
      height: 100,
      borderRadius: 10,
    };
    return (
      <BarButton
        style={object('Style', style)}
        disabled={boolean('Disabled', disabled)}
        onPress={action('clicked')}>
        {<Text>{text('Content', content)}</Text>}
      </BarButton>
    );
  });

export default barButtonStory;
