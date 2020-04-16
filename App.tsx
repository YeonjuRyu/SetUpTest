import React from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  Alert,
  View,
  TouchableOpacity,
} from 'react-native';
import apolloClient from './client';
import { ApolloProvider } from '@apollo/react-hooks';
import { BottomTabNavi } from '@routes';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

type PropTypes = {
  title?: string;
};

const RootStack = createStackNavigator();

const App = (props) => {
  const { title } = props;
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name={'DrawerNavi'} component={BottomTabNavi} />
        </RootStack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
