/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, Text, StatusBar } from 'react-native';
import { RNCamera } from 'react-native-camera';

type PropTypes = {
  title?: string;
};

const App = (props) => {
  const { title } = props;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text style={{ color: 'blue', fontSize: 40 }}>
          {title === undefined ? 'hi there' : title}
        </Text>
        <RNCamera />
      </SafeAreaView>
    </>
  );
};

export default App;
