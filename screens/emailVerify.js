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
        
        var currentUser = firebase.auth().currentUser;
        currentUser.sendEmailVerification().then(function() {
            //Function will go here
            Alert.alert("An activation email has been sent, please verify your account.");
            //Email sent
        }).catch(function(error) {
            //An error happened
        });
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
                verifyEmail();
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
                        
                    }}
                />
            </View>
        );
    }
}

function verifyEmail () {
    var currentUser = firebase.auth().currentUser;
    currentUser.sendEmailVerification().then(function() {
        //Function will go here
        Alert.alert("An activation email has been sent, please verify your account.");
        //Email sent
    }).catch(function(error) {
        //An error happened
    });
}