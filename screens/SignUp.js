import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, string, Alert} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import navigation from 'react-navigation';
import firebase from 'firebase';


export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: ''};
        this.state = {password: ''};
        this.state = {confirmedPassword: ''};
    }

    render() {
        return (
            <View>
                <Text style={{marginTop: 35, alignContent: 'center'}}>
                    This is the signup page
                </Text>
                <TextInput
                    style = {{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 35, marginLeft: 10}}
                    onChangeText={text => this.setState({email: text})}
                />
                <TextInput
                    style = {{height: 40, borderColor: 'gray', borderWidth: 1, marginLeft: 10}}
                    password = {true}
                    secureTextEntry = {true}
                    onChangeText={text => this.setState({password: text})}
                />
                <TextInput
                    style = {{height: 40, borderColor: 'gray', borderWidth: 1, marginLeft: 10}}
                    password = {true}
                    secureTextEntry = {true}
                    onChangeText={text => this.setState({confirmedPassword: text})}
                />
                <Button
                    disabled={false}
                    title = 'Sign up'
                    onPress = {() => {
                        if((testPasswords(this.state.password,this.state.confirmedPassword)) == false) {
                            Alert.alert("Your passwords do not match, please try again");
                        } else {
                            if((testEmail(this.state.email) == -1)) {
                                Alert.alert("Doesn't contain @unomaha.edu, please try a correct email");
                            } else {
                                createAccount(this.state.email, this.state.confirmedPassword);
                                this.props.navigation.navigate("emailVerifyPage");
                            }
                        }
                    }}
                />
            </View>
        )
    }
}
function testEmail (userEmail){
    var str = '';
    str = userEmail;

    var final = str.search("unomaha.edu");
    return final;
}
function testPasswords (userPassword, userConfirmedPassword) {
    if(userPassword === userConfirmedPassword) {
        return true;
    } else {
        return false;
    }
}
function createAccount(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error) {
        // Handle Error's here
        console.log(error);
        var errorcode = error.code;
        var errorMessage = error.message;
    })
}
