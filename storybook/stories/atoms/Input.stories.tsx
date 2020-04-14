import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import { Input } from '@components';

const inputStory = storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .add('인풋', () => (
    <Input disabled={boolean('Disabled', false)} content="blue" />
  ));
export default inputStory;
