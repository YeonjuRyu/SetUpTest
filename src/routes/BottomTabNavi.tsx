import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import Main from '@screens/Main/Main';
import Setting from '@screens/Main/Setting';

const BottomTab = createMaterialBottomTabNavigator();

const BottomTabNavi = (props): JSX.Element => {
  return (
    <BottomTab.Navigator initialRouteName="Main" shifting={true}>
      <BottomTab.Screen name="Home" component={Main} />
      <BottomTab.Screen name="신차 금융" component={Setting} />
      <BottomTab.Screen
        name="메인?"
        component={Main}
        options={{ tabBarColor: 'white' }}
      />
      <BottomTab.Screen name="MP 연락" component={Setting} />
      <BottomTab.Screen name="Settings" component={Main} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavi;
