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
    Feed: Screen.Feed,
    Splash: Screen.Splash,
    SignUpPage: Screen.SignUp,
    emailVerifyPage: Screen.emailVerify,
    Feed: Screen.Feed,
  },
  {
    initialRouteName: "Splash"
  }
);

export default Navigator;
