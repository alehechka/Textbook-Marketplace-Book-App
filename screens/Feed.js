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

  render() {
    return (
      <ScrollView style={{ marginTop: 20 }}>
        <List>
          {this.state.infoList.map(item => (
            <ListItem
              avatar={
                <Avatar
                  source={require("./bookDefault.png")}
                  xlarge
                  onPress={() => console.log("YOTE")}
                />
              }
              key={item.key}
              rightIcon={
                this.state.currentUser != item.key && (
                  <Button
                    style={{ height: 100 }}
                    title={"chat"}
                    disable={false}
                    onPress={() => {
                      this.props.navigation.navigate("Chat", {
                        bookKey: item.key,
                        currentUID: this.state.currentUser
                      });
                    }}
                  />
                )
              }
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
        <View style={{ marginTop: 20, marginBottom: 50 }}>
          <Text style={{ alignSelf: "center" }}>Got a book to sell?</Text>
          <Button
            title={"Sell a book"}
            disable={false}
            onPress={() => {
              this.props.navigation.navigate("Sell");
            }}
          />
        </View>
      </ScrollView>
    );
  }
}
