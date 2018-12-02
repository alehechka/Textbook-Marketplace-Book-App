import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';

import Navigator from './Navigator';

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <Navigator/>
    );
  }
}