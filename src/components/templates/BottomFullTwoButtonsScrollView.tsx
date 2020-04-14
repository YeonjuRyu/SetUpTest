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
import { BarButton, FullBottomButton } from '@components';

const BottomFullTwoButtonsScrollView = (props) => {
  const { children } = props;
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
        style={{
          flexDirection: 'row',
        }}>
        <FullBottomButton
          title={'이렇게?'}
          onPress={() => {}}
          color="rgb(200,200, 200)"
          style={{ flex: 1 }}
        />
        <FullBottomButton
          title={'저렇게?'}
          onPress={() => {}}
          color="rgb(44, 160, 165)"
          style={{ flex: 1 }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

BottomFullTwoButtonsScrollView.defaultProps = {};

BottomFullTwoButtonsScrollView.propTypes = {};

export default BottomFullTwoButtonsScrollView;
