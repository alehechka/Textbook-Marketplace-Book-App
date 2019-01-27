import React from "react";
import {
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from "react-native";
import { styles } from "../styles/base.js";
import firebase from "firebase";

export default class SignUp extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      confirmedPassword: null,
      major: null,
      userUID: null
    };
  }

  createProfile = () => {
    firebase
      .database()
      .ref("users/" + this.state.userUID)
      .set({
        userUID: this.state.userUID,
        email: this.state.email,
        username: getUsername(this.state.email),
        college: getCollege(this.state.email),
        major: this.state.major,
        verified: "true"
      });
      console.log(this.state);
      this.props.navigation.navigate("Feed");
  }

  onPressSignup = () => {
    console.log("Sign up2");
    if (
      testPasswords(this.state.password, this.state.confirmedPassword) == false
    ) {
      Alert.alert("Your passwords do not match, please try again");
    } else {
      if (testEmail(this.state.email) == -1) {
        Alert.alert("Not a valid email, please use college email.");
      } else {
        createAccount(this.state.email, this.state.password);
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            this.setState({ userUID: firebase.auth().currentUser.uid })
            this.createProfile();
            this.props.navigation.navigate("Feed");
          }
        });
      }
    }
  }
  render() {
    return (
      <View style={[styles.container]}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={[styles.icon]}
            source={require("../assets/tempicon.png")}
          />
        </View>
        <KeyboardAvoidingView behavior="padding" enabled>
          <Text style={[styles.abovetext]}>Email</Text>
          <TextInput
            style={[styles.textbox]}
            placeholder={" ex: jdoe@college.edu"}
            keyboardType="email-address"
            onChangeText={text => this.setState({ email: text })}
          />
          <Text style={[styles.abovetext]}>Password</Text>
          <TextInput
            style={[styles.textbox]}
            placeholder={" At least 8 characters"}
            password={true}
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
          />
          <Text style={[styles.abovetext]}>Confirm Password</Text>
          <TextInput
            style={[styles.textbox, { marginBottom: 25 }]}
            password={true}
            secureTextEntry={true}
            onChangeText={text => this.setState({ confirmedPassword: text })}
          />
          <Text style={[styles.abovetext]}>Major</Text>
          <TextInput
            style={[styles.textbox, { marginBottom: 25 }]}
            onChangeText={text => this.setState({ major: text })}
          />
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={this.onPressSignup}
            >
              <Text style={[styles.buttontext]}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
function testEmail(email) {
  var str = email.substring(email.length-4);
  var final = str.search(".edu");
  return final;
}

function testPasswords(password, confirmedPassword) {
  if (password === confirmedPassword) {
    return true;
  } else {
    return false;
  }
}

function getUsername(email) {
  return email.split("@")[0];
}

function getCollege(email) {
  const domain = email.split("@")[1]
  return domain.split(".")[0];
}

function createAccount(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Error's here
      console.log(error);
    });
}
