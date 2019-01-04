import React from "react";
import {
    View,
    Text,
    TouchableOpacity
} from "react-native";
import { styles } from "../styles/base.js";
export default class ThreadScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    onPressChat = () => {
        console.log("Chat");
        this.props.navigation.navigate("Threads");
    };
    render() {
        return (
            <View style={[styles.container]}>
                <Text>Buying</Text>
                <TouchableOpacity
                    style={[styles.button]}
                    onPress={this.onPressChat}
                >
                    <Text style={[styles.buttontext]}>Chats</Text>
                </TouchableOpacity>
            </View>
        );
    }
}