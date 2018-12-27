import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  AppState,
  TouchableOpacity
} from "react-native";
import firebase from "firebase";
import styles from "../styles/base.js";

export default class emailVerify extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState
    };
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    var userID = firebase.auth().currentUser;
    this.setState({ currentUser: userID });
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      var currentUser = firebase.auth().currentUser;

      if (currentUser.emailVerified == true) {
        this.props.navigation.navigate("Feed");
      } else {
        sendVerifyEmail();
      }
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    onPressVerifyEmail = () => {
      sendVerifyEmail();
    };
    onPressFeed = () => {
      this.props.navigation.navigate("Feed");
    };

    return (
      <View style={[styles.container]}>
        <View style={{ alignItems: "center" }}>
          <Text style={[styles.abovetextV]}>Waiting for email verification...</Text>
          <TouchableOpacity style={[styles.button, {marginBottom: 25}]} onPress={this.onPressVerifyEmail}>
            <Text style={[styles.buttontext]}>Send again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button]} onPress={this.onPressFeed}>
            <Text style={[styles.buttontext]}>Feed</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function sendVerifyEmail() {
  var currentUser = firebase.auth().currentUser;
  currentUser
    .sendEmailVerification()
    .then(function() {
      //Function will go here
      Alert.alert(
        "An activation email has been sent, please verify your account."
      );
      //Email sent
    })
    .catch(function(error) {
      //An error happened
    });
}
