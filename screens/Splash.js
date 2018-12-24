import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import firebase from 'firebase';

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
        this.state = {userEmail: ''};
        this.state = {password: ''};
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.props.navigation.navigate('Feed');
            }
        })
    }
    
    render() {
        return (
            <View>
                <TextInput
                    style = {{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 35, marginLeft: 10}}
                    placeholder={'Email'}
                    onChangeText={(text) => this.setState({userEmail: text})}
                />
                <TextInput
                    style = {{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 35, marginLeft: 10}}
                    placeholder={'Password'}
                    password = {true}
                    secureTextEntry = {true}
                    onChangeText={(text) => this.setState({password:text})}
                />
                <Button
                    disabled = {false}
                    title = 'Login'
                    onPress={() => {
                        console.log(this.state.userEmail);
                        console.log(this.state.password);
                        signIn(this.state.userEmail, this.state.password);
                    }}
                />
                <Button
                    disabled={false}
                    title = 'Sign up'
                    onPress = {() => {
                        this.props.navigation.navigate('SignUpPage');
                    }}
                />
            </View>
        )
    }
}
function signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => this.props.navigation.navigate('Feed')).catch(function(error) {
        //Handle errors here
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
    })
}
