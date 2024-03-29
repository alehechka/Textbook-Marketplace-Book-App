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
import firebase from "firebase";
import { styles } from "../styles/base.js";

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
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      password: "",
      userProfile: null,
      loading: true
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("Feed");
      }
    });
  }

  onPressSignup = () => {
    this.props.navigation.navigate("SignUp");
  };

  onPressLogin = () => {
    signIn(this.state.userEmail, this.state.password);
  };

  render() {
    return (
      <View style={[styles.container]}>
        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={{ alignItems: "center" }}>
            <Image
              style={[styles.icon]}
              source={require("../assets/tempicon.png")}
            />
          </View>
          <Text style={[styles.abovetext]}>Email</Text>
          <TextInput
            style={[styles.textbox]}
            placeholder={" ex: jdoe@college.edu"}
            keyboardType="email-address"
            onChangeText={text => this.setState({ userEmail: text })}
          />
          <Text style={[styles.abovetext]}>Password</Text>
          <TextInput
            style={[styles.textbox, { marginBottom: 25 }]}
            placeholder={""}
            password={true}
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
          />
        </KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[styles.button, { marginBottom: 25 }]}
            onPress={this.onPressLogin}
          >
            <Text style={[styles.buttontext]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={this.onPressSignup}
          >
            <Text style={[styles.buttontext]}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function signIn(email, password) {
  firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate("Feed"))
      .catch(function (error) {
          //Handle errors here
          var errorCode = error.code;
          if (errorCode != null) {
              Alert.alert("Email or password is incorrect.");
          }
      });
}
