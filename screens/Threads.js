import React from "react";
import {
  View,
} from "react-native";
import { Card, ListItem, } from 'react-native-elements'
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
    //header: null
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
