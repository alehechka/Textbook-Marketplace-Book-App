import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  TextInput
} from "react-native";

import { List, ListItem, Avatar } from "react-native-elements";
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDr4YvpZXX752crkGU0ESjHTMm8yHAFi78",
  authDomain: "bookapp-cf18c.firebaseapp.com",
  databaseURL: "https://bookapp-cf18c.firebaseio.com/",
  projectId: "bookapp-cf18c",
  storageBucket: "bookapp-cf18c.appspot.com",
  messagingSenderId: "49641427326"
};

import { StackNavigator } from "react-navigation";

import { _ } from "lodash";

console.disableYellowBox = true;

export default class Sell extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          marginTop: 50,
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          flex: 1
        }}
      >
        <TextInput
          placeholder={"Title"}
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ title: text })}
        />
        <TextInput
          placeholder={"ISBN"}
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ isbn: text })}
        />
        <TextInput
          placeholder={"Price"}
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ price: text })}
        />
        <TextInput
          placeholder={"Category"}
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ category: text })}
        />
        <TextInput
          placeholder={"Condition"}
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ condition: text })}
        />
        <Button
          title={"Confirm"}
          disable={false}
          onPress={() => {

            let result = firebase.database().ref("books/").push();
            let key = result.key
            firebase
              .database()
              .ref("books/" + key)
              .set({
                title: this.state.title,
                isbn: this.state.isbn,
                price: this.state.price,
                category: this.state.category,
                condition: this.state.condition,
                key: key
              });
            this.props.navigation.navigate("Sell");
          }}
        />
      </View>
    );
  }
}
