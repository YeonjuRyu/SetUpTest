import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import Input from './Input';

const inputStory = storiesOf('Input', module)
  .addDecorator(withKnobs)
  .add('able', () => (
    <Input disabled={boolean('Disabled', false)} content="blue" />
  ))
  .add('disable', () => (
    <Input disabled={boolean('Disabled', true)} content="red" />
  ));

export default inputStory;
