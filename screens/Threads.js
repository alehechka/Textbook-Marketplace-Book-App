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
  constructor(props) {
    super(props);
    this.state = {
      book: this.props.navigation.getParam('book', 'Book not found'),
      sellerUID: null,
      buyerUIDs: [],
      
    };
  }

  onPressThreads = () => {
    console.log(this.state.book);
    console.log(this.state.book.threadKey);
    //this.props.navigation.navigate("Chat");
  };

  render() {
    return (
      <View style={[styles.container]}>
        <Card containerStyle={{ padding: 10 }}>
          {users.map((u, i) => {
            return (
              <ListItem
                onPress={() => {
                  this.onPressThreads();
                }}
                key={i}
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
