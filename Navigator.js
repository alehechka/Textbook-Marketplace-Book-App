import React from "react";
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { View, Asset, Text, Footer } from "react-native";
import Screen from "./Screen";

const Navigator = createSwitchNavigator(
  {
    Chat: Screen.Chat,
    Sell: Screen.Sell,
    Feed: Screen.Feed
  },
  {
    initialRouteName: "Feed"
  }
);

export default Navigator;
