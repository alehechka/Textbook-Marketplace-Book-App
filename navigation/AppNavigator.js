import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Screen from '../Screen.js';

import MainTabNavigator from './MainTabNavigator';

const LoginStack = createStackNavigator({
  SignIn: Screen.SignIn,
  SignUp: Screen.SignUp
});

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: LoginStack,
  Main: MainTabNavigator,
});