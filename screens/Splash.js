import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import {createStackNavigator} from 'react-navigation';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
        this.state = {password: ''};
    }
    render() {
        return (
            <View>
                <TextInput
                    style = {{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 35, marginLeft: 10}}
                    onChangeText={(text) => this.setState({text})}
                />
                <TextInput
                    style = {{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 35, marginLeft: 10}}
                    password = {true}
                    secureTextEntry = {true}
                    onChangeText={(password) => this.setState({password})}
                />
                <Button
                    disabled = {false}
                    title = 'Login'
                    onPress={() => {
                        signIn(email, password);
                        Alert.alert("Sign in was successful");
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
    })
}