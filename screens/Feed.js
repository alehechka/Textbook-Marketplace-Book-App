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
import styles from "../styles/base.js";
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
    this.state = { search: "" };

    this.state = {
      infoList: [],
      loading: true,
      currentUser: "-LUwfgY-M3fTZd_Rxi0z" //THIS IS DUNGOS USER ID. NEED A WAY TO SET GLOBAL USER ID WHEN A USER SIGNS IN AND MAINTAIN IT. I think firebase has a function
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

  submitSearch = () => {
    console.log(this.state.search);
  };

  render() {
    return (
      <ScrollView style={{ marginTop: 20, backgroundColor: "white" }}>
        <View style={[styles.container, { marginTop: 15 }]}>
          <TextInput
            style={[feedstyles.textbox, { borderRadius: 50 }]}
            placeholder={" Search"}
            onChangeText={text => this.setState({ search: text })}
            onSubmitEditing={this.submitSearch}
          />
        </View>
        <List>
          {this.state.infoList.map(item => (
            <ListItem
              onPress={() => {
                console.log("chat");
                this.props.navigation.navigate("Chat", {
                  bookKey: item.key,
                  currentUID: this.state.currentUser
                });
              }}
              avatar={
                <Avatar
                  size={400}
                  large
                  source={require("../assets/bookDefault.png")}
                  onPress={() => console.log("Image pressed")}
                />
              }
              key={item.key}
              title={
                <View style={[feedstyles.right]}>
                  <Text
                    ellipsizeMode={"tail"}
                    numberOfLines={1}
                    style={[feedstyles.title]}
                  >
                    {item.title}
                  </Text>
                </View>
              }
              subtitle={
                <View>
                  <View style={[feedstyles.right]}>
                    <Text>ISBN: {item.isbn}</Text>
                    <Text>Author | Year</Text>
                    <Text />
                  </View>
                  <View style={[feedstyles.row]}>
                    <View style={[feedstyles.left, { flex: 1 }]}>
                      <Text style={[feedstyles.price]}>${item.price}</Text>
                    </View>
                    <View style={[styles.right, { flex: 1 }]}>
                      <Text style={[feedstyles.majorCourse]}>{item.major}</Text>
                      <Text style={[feedstyles.majorCourse]}>
                        {item.course}
                      </Text>
                    </View>
                  </View>
                </View>
              }
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

const feedstyles = StyleSheet.create({
  right: {
    alignItems: "flex-end"
  },
  left: {
    marginLeft: 10
  },
  row: {
    flexDirection: "row"
  },
  textbox: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10
  },
  price: {
    color: "darkgray",
    fontSize: 20
  },
  majorCourse: {
    fontSize: 12,
    color: "gray",
    textAlign: "right"
  }
});
