import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import BarButton from './BarButton';

const BarButtonStory = storiesOf('Button', module)
  .add('텍스트', () => (
    <BarButton onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </BarButton>
  ))
  .add('이모티콘', () => (
    <BarButton onPress={action('clicked-emoji')} disabled>
      <Text>😀 😎 👍 💯</Text>
    </BarButton>
  ));

export default BarButtonStory;
