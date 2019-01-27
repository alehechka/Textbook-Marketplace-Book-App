import React from 'react';
import AppNavigator from './navigation/AppNavigator';
console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}