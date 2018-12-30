import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView
} from "react-native";

import { List, ListItem, Avatar, Icon } from "react-native-elements";
import firebase from "firebase";

import { StackNavigator } from "react-navigation";

import { _ } from "lodash";

console.disableYellowBox = true;

export default class Feed extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      infoList: [],
      loading: true,
      currentUser: 123
    };
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    firebase
      .database()
      .ref(`books/`)
      .on("value", snapshot => {
        let books = snapshot.val();
        let infoList = Object.values(books);
        console.log(infoList);
        this.setState({ infoList, loading: false });
      });
  };

  onPressChat = () => {
    console.log("Chat");
    /*this.props.navigation.navigate("Chat", {
      bookKey: key,
      currentUID: this.state.currentUser
    });*/
  };

  render() {
    return (
      <ScrollView style={{ marginTop: 20 }}>
        <List>  
          {this.state.infoList.map(item => (
            <ListItem
              onPress={this.onPressChat}
              avatar={
                <Avatar
                  source={require("../assets/bookDefault.png")}
                  xlarge
                  onPress={() => console.log("YOTE")}
                />
              }
              key={item.key}
              title={item.title}
              subtitle={
                <View style={{ marginLeft: 20 }}>
                  <Text>{item.category}</Text>
                  <Text>${item.price}</Text>
                </View>
              }
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}