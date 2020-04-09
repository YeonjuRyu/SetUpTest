import React from 'react';
import Hello from './Hello';

export default {
  title: 'Hello', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Hello, // 어떤 컴포넌트를 문서화 할지 명시
};

export const standard = () => <Hello name="Storybook" big={false} />;
export const big = () => <Hello name="Storybook" big />;
