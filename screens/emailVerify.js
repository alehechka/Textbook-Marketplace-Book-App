import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import firebase from 'firebase';

export default class emailVerify extends React.Component {
    componentDidMount() {
        var currentUser = firebase.auth().currentUser;

        currentUser.sendEmailVerification().then(function() {
            //Function will go here
            //Email sent
        }).catch(function(error) {
            //An error happened
        });
    }

    render() {
        return (
            <View>
                <Text>
                    An verification link has been sent to your email
                </Text>
            </View>
        );
    }
}