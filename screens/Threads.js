import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { createStackNavigator } from "react-navigation";
import { Card, ListItem, Button } from 'react-native-elements'
import { styles } from "../styles/base.js";

const users = [
    {
       name: 'brynn',
       avatar: '../assets/bookDefault.png',
       title: 'title'
    },
    {
        name: 'adam',
        avatar: '../assets/bookDefault.png',
        title: 'title'
    }
];

export default class ThreadScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    onPressThreads = () => {
      this.props.navigation.navigate("Sell");
    };
    return (
      <View style={[styles.container]}>
        <Card containerStyle={{ padding: 10 }}>
          {users.map((u, i) => {
            return (
              <ListItem
                key={'i'}
                roundAvatar
                title={u.name}
                avatar={{ uri: u.avatar }}
              />
            );
          })}
        </Card>
      </View>
    );
  }
}
