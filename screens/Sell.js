import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import styles from "../styles/base.js";
import { List, ListItem, Avatar } from "react-native-elements";
import firebase from "firebase";

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
    onPressSell = () => {
      let result = firebase
        .database()
        .ref("books/")
        .push();
      let key = result.key;
      firebase
        .database()
        .ref("books/" + key)
        .set({
          title: this.state.title,
          isbn: this.state.isbn,
          price: this.state.price,
          major: this.state.major,
          course: this.state.course,
          key: key
        });
      this.props.navigation.navigate("Sell");
    };
    return (
      <View style={[styles.container]}>
      <View style={{alignItems: 'center'}}>
        <Image
          style={[styles.icon]}
          source={require("../assets/tempicon.png")}
        />
        </View>
        <Text style={[styles.abovetext]}>Title</Text>
        <TextInput
          style={[styles.textbox]}
          placeholder={""}
          onChangeText={text => this.setState({ title: text })}
        />
        <Text style={[styles.abovetext]}>ISBN</Text>
        <TextInput
          style={[styles.textbox]}
          placeholder={""}
          onChangeText={text => this.setState({ isbn: text })}
        />
        <View style={[styles.row]}>
          <Text style={[styles.abovetext]}>Major</Text>
          <Text style={[styles.abovetext, {marginLeft: 150}]}>Course</Text>
        </View>
        <View style={[styles.row]}>
          <TextInput
            style={[styles.halfbox, { marginRight: 15 }]}
            placeholder={""}
            onChangeText={text => this.setState({ major: text })}
          />
          <TextInput
            style={[styles.halfbox, { marginLeft: 15 }]}
            placeholder={""}
            onChangeText={text => this.setState({ course: text })}
          />
        </View>
        <View style={[styles.row]}>
          <TouchableOpacity
            style={[styles.uploadbutton, { marginRight: 15 }]}
            onPress={this.onPressUpload}
          >
            <Text style={[styles.buttontext]}>Upload</Text>
            <Text style={[styles.buttontext]}>Image</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "column" }}>
            <Text style={[styles.abovetext, { marginLeft: 15 }]}>Price</Text>
            <TextInput
              style={[styles.halfbox, { marginLeft: 15 }]}
              placeholder={""}
              onChangeText={text => this.setState({ price: text })}
            />
            <TouchableOpacity
              style={[styles.button, { marginLeft: 15 }]}
              onPress={this.onPressSell}
            >
              <Text style={[styles.buttontext]}>List Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
