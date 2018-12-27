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
  title: 'Buy',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-filing${focused ? '' : '-outline'}`
          : 'md-filing'
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
      name={Platform.OS === 'ios' ? 'ios-cash' : 'md-cash'}
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault,
  },
};

const ThreadStack = createStackNavigator({
  Threads: Screen.Threads,
});

ThreadStack.navigationOptions = {
  title: 'Books',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-barcode${focused ? '' : '-outline'}`
          : 'md-barcode'
      }
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
  title: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
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
  ThreadStack,
  LoginStack,
});