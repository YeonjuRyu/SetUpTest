import React from 'react';
import { Text } from 'react-native';

const Hello = ({ name, big }) => {
  if (big) {
    return <Text style={{ fontSize: 30 }}>안녕하세요, {name}!</Text>;
  }
  return <Text>안녕하세요, {name}!</Text>;
};

export default Hello;
