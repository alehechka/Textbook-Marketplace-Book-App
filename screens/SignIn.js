import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Image
} from "react-native";
import { createStackNavigator } from "react-navigation";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDr4YvpZXX752crkGU0ESjHTMm8yHAFi78",
  authDomain: "bookapp-cf18c.firebaseapp.com",
  databaseURL: "https://bookapp-cf18c.firebaseio.com/",
  projectId: "bookapp-cf18c",
  storageBucket: "bookapp-cf18c.appspot.com",
  messagingSenderId: "49641427326"
};

firebase.initializeApp(firebaseConfig);

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userEmail: "" };
    this.state = { password: "" };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("Feed");
      }
    });
  }

  onPressSignup=() => {
    this.props.navigation.navigate("SignUpPage");
  }


  onPressLogin=() => {
    console.log(this.state.userEmail);
    console.log(this.state.password);
    signIn(this.state.userEmail, this.state.password);
  }

  render() {
    return (
      <View style={[styles.container]}>
      <Image
          style = {[styles.icon]}
          source={require('../assets/tempicon.png')}
        />
        <Text style={[styles.abovetextE]}>Email</Text>
        <TextInput
          style={[styles.textbox]}
          placeholder={" ex: jdoe@college.edu"}
          onChangeText={text => this.setState({ userEmail: text })}
        />
        <Text style={[styles.abovetextP]}>Password</Text>
        <TextInput
          style={[styles.textbox]}
          placeholder={" Required: lower, upper, number, symbol"}
          password={true}
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
        />
        <TouchableOpacity style={[styles.button]} onPress={this.onPressLogin}>
          <Text style={[styles.buttontext]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]} onPress={this.onPressSignup}>
          <Text style={[styles.buttontext]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
function signIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => this.props.navigation.navigate("Feed"))
    .catch(function(error) {
      //Handle errors here
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10, 
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
