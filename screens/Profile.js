import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    TouchableOpacity,
    Image,
} from "react-native";
import { createStackNavigator } from "react-navigation";
import { styles } from "../styles/base.js";
import firebase from "firebase";

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    onPressSignout = () => {
        console.log("Sign out");
        firebase.auth().signOut();
        this.props.navigation.navigate("SignIn");
    };
    render() {
        return (
            <View style={[styles.container]}>
                <TouchableOpacity
                    style={[styles.button]}
                    onPress={this.onPressSignout}
                >
                    <Text style={[styles.buttontext]}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
