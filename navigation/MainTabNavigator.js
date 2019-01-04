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
  Chat: Screen.Chat
});

FeedStack.navigationOptions = {
  title: 'Buy',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={ Platform.OS === 'ios' ? 'ios-filing' : 'md-filing' }
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault,
  },
};

const SellStack = createStackNavigator({
  Sell: Screen.Sell,
  barcode: Screen.barcode,
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
  title: 'Buying'
};

const SellingStack = createStackNavigator({
  Selling: Screen.Selling
});
SellingStack.navigationOptions = {
  title: 'Selling'
};

const BuySellStack = createMaterialTopTabNavigator({
  Buying: BuyingStack,
  Selling: SellingStack,
});

BuySellStack.navigationOptions = {
  tabBarPosition: 'top',
  header: null,
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault,
    style: {
      marginTop: 25,
      backgroundColor: 'white'
    },
    tabStyle: {
      height: 100,
      backgroundColor: 'white'
    }
  }
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
