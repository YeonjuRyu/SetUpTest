import React, { Component } from 'react';
import { SafeAreaView, Text, View, Button } from 'react-native';

const Main = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>메인 페이지</Text>
      <Button title={'hi'} onPress={() => navigation.navigate('Setting')} />
    </SafeAreaView>
  );
};

export default Main;
