import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';
import Colors from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';
import Screen from '../Screen.js';

const FeedStack = createStackNavigator({
  Feed: Screen.Feed,
  Threads: Screen.Threads,
});

FeedStack.navigationOptions = {
  title: 'Buy',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-filing' : 'md-filing'}
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

const BuyingStack = createStackNavigator({
  Buying: Screen.Buying
});

BuyingStack.navigationOptions = {
  title: 'Buying',
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault,
    style: {
      marginTop: 25,
      backgroundColor: 'white'
    },
    indicatorStyle: {
      backgroundColor: Colors.tintColor,
    },
  }
};

const SellingStack = createStackNavigator({
  Selling: Screen.Selling
});
SellingStack.navigationOptions = {
  title: 'Selling',
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault,
    style: {
      marginTop: 25,
      backgroundColor: 'white'
    },
    indicatorStyle: {
      backgroundColor: Colors.tintColor,
    },
  }
};

const BuySellStack = createMaterialTopTabNavigator({
  Buying: BuyingStack,
  Selling: SellingStack,
});
BuySellStack.navigationOptions = {
  tabBarPosition: 'top',
  header: null,
};

const ThreadStack = createStackNavigator({
  BuySell: BuySellStack,
  Threads: Screen.Threads,
});

ThreadStack.navigationOptions = {
  title: 'Books',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-barcode' : 'md-barcode'}
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault,
  },
};

const ProfileStack = createStackNavigator({
  Profile: Screen.Profile
});

ProfileStack.navigationOptions = {
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
  ProfileStack,
});
