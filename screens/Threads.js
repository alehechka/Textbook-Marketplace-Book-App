import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Image
} from "react-native";
import { createStackNavigator } from "react-navigation";
import styles from "../styles/base.js";

export default class ThreadScreen extends React.Component {
    static navigationOptions = {
      header: null
    };
    render() {
        return (
          <View style={[styles.container]}>
            <Text style={[styles.abovetextVerify]}>Threads</Text>
            </View>
        )
    };
}