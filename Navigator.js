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
    Splash: Screen.Splash,
    SignUpPage: Screen.SignUp,
    emailVerifyPage: Screen.emailVerify,
    Chat: Screen.Chat,
    Sell: Screen.Sell,
    Feed: Screen.Feed
  },
  {
    initialRouteName: "Splash"
  }
);

export default Navigator;
