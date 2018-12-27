import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Colors from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';
import Screen from '../Screen.js';

const FeedStack = createStackNavigator({
  Feed: Screen.Feed,
});

FeedStack.navigationOptions = {
  title: 'Feed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault,
  },
};

const SellStack = createStackNavigator({
  Sell: Screen.Sell,
});

SellStack.navigationOptions = {
  title: 'Sell',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault,
  },
};

const LoginStack = createStackNavigator({
  SingIn: Screen.SignIn,
});

LoginStack.navigationOptions = {
  title: 'Login',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault,
  },
};

export default createBottomTabNavigator({
  FeedStack,
  SellStack,
  LoginStack,
});
