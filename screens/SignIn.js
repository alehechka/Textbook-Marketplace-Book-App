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
import t from 'tcomb-form-native';
const Form = t.form.Form;

const firebaseConfig = {
  apiKey: "AIzaSyDr4YvpZXX752crkGU0ESjHTMm8yHAFi78",
  authDomain: "bookapp-cf18c.firebaseapp.com",
  databaseURL: "https://bookapp-cf18c.firebaseio.com/",
  projectId: "bookapp-cf18c",
  storageBucket: "bookapp-cf18c.appspot.com",
  messagingSenderId: "49641427326"
};
firebase.initializeApp(firebaseConfig);

const User = t.struct({
  email: t.String,
  password: t.String
});

const options = {
  fields: {
    email: {
      label: 'Email',
      keyboardType: "email-address"
    },
    password: {
      label: 'Password',
      error: 'Incorrect email or password.',
      password: true,
      secureTextEntry: true
    }
  },
};

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      value: {
        email: "",
        password: "",
      }
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
    signIn(this.state.value.email, this.state.value.password) 
  };
  handleLoginError = (error) => {
    if(error.code != null) {
      let value = this.state.value;
      value.password = "";
      console.log(value);
      this.setState({ value });
    }
  };

  onChange = (value) => {
    this.setState({ value });
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
          <t.form.Form
            ref="form"
            type={User}
            options={options}
            value={this.state.value}
            onChange={this.onChange}
          />
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
        </KeyboardAvoidingView>
      </View>
    );
  }
}

//TODO: FIX THIS ISSUE WITH VALIDATING EMAIl
function signIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => this.props.navigation.navigate("Feed"))
    .catch((error) => {
      //Handle errors here
      //if (error.code != null) {
        //Alert.alert("Email or password is incorrect.");
        //return false;
        this.handleLoginError(error);
      //}
    });
}

/*
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
*/
