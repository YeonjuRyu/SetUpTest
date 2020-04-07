import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { ApolloProvider } from '@apollo/react-hooks';
import client from '../../client';

import BarButton from '../components/BarButton/BarButton';

storiesOf('Button', module)
  .add('with text', () => (
    <BarButton onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </BarButton>
  ))
  .add('with some emoji', () => (
    <BarButton onPress={action('clicked-emoji')} disabled>
      <Text>😀 😎 👍 💯</Text>
    </BarButton>
  ));
