import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TextInput
} from "react-native";

import { List, ListItem, Avatar, Icon } from "react-native-elements";
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

export default class Chat extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      infoList: [],
      loading: true,
      partnerUID: null,
      chatID: null
    };
  }

  componentDidMount() {
    this.checkStatus();
  }

  checkStatus() {
    firebase
      .database()
      .ref("books/" + this.props.navigation.state.params.bookKey + "/uid")
      .once("value")
      .then(snapshot => {
        //console.log(this.props.navigation.state.params.bookKey);
        //console.log(snapshot.val());
        let sellerUID = snapshot.val();
        console.log(this.props.navigation.state.params.currentUID);
        console.log(snapshot.val());
        console.log(this.props.navigation.state.params.bookKey);
        firebase
          .database()
          .ref(
            "users/" +
              snapshot.val() +
              "/listings/" +
              this.props.navigation.state.params.bookKey +
              "/threads/" +
              this.props.navigation.state.params.currentUID
          )
          .once("value")
          .then(snapshot => {
            console.log(snapshot.val());
            if (snapshot.val() == null) {
              const min = 1;
              const max = 100;
              const thread = min + Math.random() * (max - min);
              //CREATE THREAD. LOTS OF INFO TO DO HOLY SHIT I HATE this
              console.log("Need to create a thread");

              firebase
                .database()
                .ref(
                  "users/" +
                    sellerUID +
                    "/listings/" +
                    this.props.navigation.state.params.bookKey +
                    "/threads/"
                )
                .set({
                  sellerUID: thread
                });
            } else {
              this.setState({
                threadID: snapshot.val(),
                loading: false
              });
            }
          });
      });

    this.checkThread();
    //Might have to have error catching if user doesn't exist
  }

  checkThread() {}

  setMessageListener() {
    let chatBucket = firebase.database().ref("threads/" + this.state.chatID);

    chatBucket.once("value").then(snapshot => {
      if (snapshot.val() === null) {
        this.setState({
          loading: false,
          newChatRoom: true
        });
      } else {
        tripRef.on("value", snapshot => {
          let data = snapshot.val();
          let msgArray = Object.values(data);
          this.setState({
            msgArray,
            loading: false
          });
        });
      }
    });
  }

  sendMessageToServer = message => {
    firebase
      .database()
      .ref("threads/" + this.state.chatID + "/" + 10)
      .set({
        msg: message,
        user: this.props.navigation.state.params.currentUID
      });
  };
  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      );
    }

    if (this.state.newChatRoom) {
      return (
        <View style={styles.container}>
          <TextInput
            style={{
              topMargin: 100,
              height: 60,
              borderColor: "gray",
              borderWidth: 0,
              width: 300,
              fontSize: 27,
              alignSelf: "center"
            }}
            placeholder={"Message Text"}
            onChangeText={text => this.setState({ message: text })}
          />

          <View style={{ marginLeft: 55, marginRight: 55, marginTop: 5 }}>
            <Button
              title={"Send Message"}
              disable={false}
              onPress={() => {
                this.sendMessageToServer(this.state.message);
              }}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {this.renderMessages()}
        <TextInput
          style={{
            topMargin: 100,
            height: 60,
            borderColor: "gray",
            borderWidth: 0,
            width: 300,
            fontSize: 27,
            alignSelf: "center"
          }}
          placeholder={"Message Text"}
          onChangeText={text => this.setState({ message: text })}
        />
        <View style={{ marginLeft: 55, marginRight: 55, marginTop: 5 }}>
          <Button
            title={"Send Message"}
            disable={false}
            onPress={() => {
              this.sendMessageToServer(this.state.message);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",

    justifyContent: "center"
  }
});
