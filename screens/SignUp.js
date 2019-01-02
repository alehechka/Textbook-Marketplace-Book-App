import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  string,
  Alert,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from "react-native";
import { styles } from "../styles/base.js";
import { createStackNavigator } from "react-navigation";
import navigation from "react-navigation";
import firebase from "firebase";

export default class SignUp extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { email: "" };
    this.state = { password: "" };
    this.state = { confirmedPassword: "" };
  }

  onPressSignup = () => {
    console.log("Sign up2");
    if (
      testPasswords(this.state.password, this.state.confirmedPassword) == false
    ) {
      Alert.alert("Your passwords do not match, please try again");
    } else {
      if (testEmail(this.state.email) == -1) {
        Alert.alert("Doesn't contain @unomaha.edu, please try a correct email");
      } else {
        createAccount(this.state.email, this.state.confirmedPassword);
        this.props.navigation.navigate("Email");
      }
    }
  };
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
            placeholder={" Required: lower, upper, number, symbol"}
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
function testEmail(userEmail) {
  var str = "";
  str = userEmail;

  var final = str.search("unomaha.edu");
  return final;
}
function testPasswords(userPassword, userConfirmedPassword) {
  if (userPassword === userConfirmedPassword) {
    return true;
  } else {
    return false;
  }
}
function createAccount(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Error's here
      console.log(error);
      var errorcode = error.code;
      var errorMessage = error.message;
    });

  let result = firebase
    .database()
    .ref("users/")
    .push();
  let key = result.key;
  //NEEd TO HAVE A WAY TO MAKE SURE A USER DOESNT SIGN UP TWICE OR DATABSE INTEGRITY WILL CRUMBLE!!!
  firebase
    .database()
    .ref("users/" + key)
    .set({
      email: email,
      verified: "true"
    });
  global.currentUser = key;
}
