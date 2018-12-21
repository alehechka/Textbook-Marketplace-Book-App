import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userEmail: ''};
        this.state = {password: ''};
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
                        if((signIn(this.state.userEmail, this.state.password)) == true) {
                            this.props.navigation.navigate('Feed');
                        } else {
                            Alert.alert("Invalid email or password, please try again");
                        }
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
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        //Handle errors here
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
    })
}