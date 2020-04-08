import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';

import Input from './Input';

const InputStory = storiesOf('Input', module)
  .add('able', () => <Input content="blue" />)
  .add('disable', () => <Input disabled content="red" />);

export default InputStory;
