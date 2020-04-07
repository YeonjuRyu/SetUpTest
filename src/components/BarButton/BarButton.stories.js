import React from 'react';
import { Text } from 'react-native';
import BarButton from '@components/BarButton';

export default {
  title: 'components|basic/BarButton', // 스토리북에서 보여질 그룹과 경로를 명시
  component: BarButton, // 어떤 컴포넌트를 문서화 할지 명시
};

export const able = () => (
  <BarButton onPress={console.log('hi')}>
    <Text>say hi</Text>
  </BarButton>
);
export const disable = () => (
  <BarButton onPress={console.log('bye')} disabled>
    <Text>say bye</Text>
  </BarButton>
);
