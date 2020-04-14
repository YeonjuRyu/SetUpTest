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

import { FullBottomButton } from '@components';
import { withKnobs, text, object, boolean } from '@storybook/addon-knobs/dist';

const barButtonStory = storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .add('Fullsize bottom버튼', () => {
    const disabled = false;
    const style = {};
    const title = '타이틀';
    return (
      <FullBottomButton
        style={object('Style', style)}
        disabled={boolean('Disabled', disabled)}
        onPress={action('clicked')}
        title={text('Title', 'title')}
      />
    );
  });

export default barButtonStory;
