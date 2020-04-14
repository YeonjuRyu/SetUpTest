import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { FullBottomButton } from '@components';

const BottomFullOneButtonScrollView = (props) => {
  const { children, disabled, onPress } = props;
  const paddingSafe = Platform.OS === 'ios' ? 'padding' : undefined;
  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <ScrollView style={{ padding: 20 }}>{children}</ScrollView>
      <KeyboardAvoidingView
        behavior={paddingSafe}
        style={{ flexDirection: 'row' }}>
        <FullBottomButton
          title={'이렇게?'}
          onPress={onPress}
          color="rgb(44, 160, 165)"
          style={{ flex: 1 }}
          disabled={disabled}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BottomFullOneButtonScrollView;
