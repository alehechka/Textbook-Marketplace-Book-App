import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, AppState} from 'react-native';
import firebase from 'firebase';

export default class emailVerify extends React.Component {

    constructor(props) { 
        super(props)
        this.state = {
            appState: AppState.currentState,
        }
    }

    componentDidMount() {

        AppState.addEventListener('change', this._handleAppStateChange);
        var userID = firebase.auth().currentUser;
        this.setState({currentUser:userID})
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if(this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            var currentUser = firebase.auth().currentUser;

            if(currentUser.emailVerified == true) {
                this.props.navigation.navigate('Feed');
            }else{
                sendVerifyEmail();
            }
        }
        this.setState({appState: nextAppState});
    }

    render() {
        return (
            <View>
                <Text style ={{marginTop: 40}}>
                    An verification link has been sent to your email
                </Text>
                <Button
                    disabled = {false}
                    title = 'Did not recieve an email?'
                    onPress={() => {
                        sendVerifyEmail();
                    }}
                />
                <Button
                    disabled = {false}
                    title = "Press me to navigate to Feed, dono"
                    onPress={() => {
                        this.props.navigation.navigate('Feed');
                    }}
                />
            </View>
        );
    }
}

function sendVerifyEmail () {
    var currentUser = firebase.auth().currentUser;
    currentUser.sendEmailVerification().then(function() {
        //Function will go here
        Alert.alert("An activation email has been sent, please verify your account.");
        //Email sent
    }).catch(function(error) {
        //An error happened
    });
}