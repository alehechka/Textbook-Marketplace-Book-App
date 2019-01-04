import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Screen from '../Screen.js';

import MainTabNavigator from './MainTabNavigator';

const LoginStack = createStackNavigator({
  SignIn: Screen.SignIn,
  SignUp: Screen.SignUp,
  Email: Screen.EmailVerify
});

export default createSwitchNavigator({
  Login: LoginStack,
  Main: MainTabNavigator,
});