import React from 'react';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { View, Asset, Text, Footer } from 'react-native';
import Screen from './Screen'

const Navigator = createSwitchNavigator(
    {
      Splash: Screen.Splash,
      SignUpPage: Screen.SignUp,
      emailVerifyPage: Screen.emailVerify,
    },
    {
      initialRouteName: 'Splash',
    }
  );

  export default Navigator;