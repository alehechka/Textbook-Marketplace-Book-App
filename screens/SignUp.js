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
  Image
} from "react-native";
import { createStackNavigator } from "react-navigation";
import navigation from "react-navigation";
import firebase from "firebase";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "" };
    this.state = { password: "" };
    this.state = { confirmedPassword: "" };
  }

  render() {
    onPressSignup = () => {
      if (
        testPasswords(this.state.password, this.state.confirmedPassword) == false
      ) {
        Alert.alert("Your passwords do not match, please try again");
      } else {
        if (testEmail(this.state.email) == -1) {
          Alert.alert(
            "Doesn't contain @unomaha.edu, please try a correct email"
          );
        } else {
          createAccount(this.state.email, this.state.confirmedPassword);
          this.props.navigation.navigate("emailVerifyPage");
        }
      }
    };

    return (
      <View style={[styles.container]}>
      <Image
          style = {[styles.icon]}
          source={require('../assets/tempicon.png')}
        />
        <Text style={[styles.abovetextE]}>Email</Text>
        <TextInput
          style={[styles.textbox]}
          onChangeText={text => this.setState({ email: text })}
        />
        <Text style={[styles.abovetextP]}>Password</Text>
        <TextInput
          style={[styles.textbox]}
          password={true}
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
        />
        <Text style={[styles.abovetextCP]}>Confirm Password</Text>
        <TextInput
          style={[styles.textbox]}
          password={true}
          secureTextEntry={true}
          onChangeText={text => this.setState({ confirmedPassword: text })}
        />
        <TouchableOpacity style={[styles.button]} onPress={this.onPressSignup}>
          <Text style={[styles.buttontext]}>Sign up</Text>
        </TouchableOpacity>
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
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10
  },
  icon: {
    height: 150,
    width: 165
  },
  abovetextE: {
    textAlign: "left",
    color: "#BAB7B7",
    fontSize: 15,
    marginRight: 255
  },
  abovetextP: {
    textAlign: "left",
    color: "#BAB7B7",
    fontSize: 15,
    marginRight: 225
  },
  abovetextCP: {
    textAlign: "left",
    color: "#BAB7B7",
    fontSize: 15,
    marginRight: 175
  },
  textbox: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 25,
    width: 300
  },
  button: {
    height: 49,
    width: 165,
    marginBottom: 25,
    backgroundColor: "#5BA6DF",
    justifyContent: "center",
    alignItems: "center"
  },
  buttontext: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white"
  }
});
