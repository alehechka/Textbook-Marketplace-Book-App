import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { styles } from "../styles/base.js";
import firebase from "firebase";
import { _ } from "lodash";

console.disableYellowBox = true;

export default class Sell extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {};
  }
  onPressSell = () => {
    let result = firebase
      .database()
      .ref("books/")
      .push();
    let key = result.key;
    firebase
      .database()
      .ref("books/" + key)
      .set({
        title: this.state.title,
        isbn: this.state.isbn,
        price: this.state.price,
        major: this.state.major,
        course: this.state.course,
        key: key
      });
    console.log("List book");
    this.props.navigation.navigate("ThreadStack");
  };

  onPressScan = () => {
    this.props.navigation.navigate('barcode');
  };

  onPressUpload = () => {
    console.log("Upload image");
  };
  render() {
    return (
      <View style={[styles.container]}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={[styles.barcode]}
            source={require("../assets/barcode.png")}
          />
          <TouchableOpacity
            style={[styles.button, { width: 185, marginBottom: 15 }]}
            onPress={this.onPressScan}
          >
            <Text style={[styles.buttontext]}>Scan Barcode</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView behavior="padding" enabled>
          <Text style={[styles.abovetext]}>Title</Text>
          <TextInput
            style={[styles.textbox]}
            placeholder={""}
            onChangeText={text => this.setState({ title: text })}
          />
          <Text style={[styles.abovetext]}>ISBN</Text>
          <TextInput
            style={[styles.textbox]}
            placeholder={""}
            keyboardType="numeric"
            onChangeText={text => this.setState({ isbn: text })}
          />
          <View style={[styles.row]}>
            <Text style={[styles.abovetext]}>Major</Text>
            <Text style={[styles.abovetext, { marginLeft: 135 }]}>Course</Text>
          </View>
          <View style={[styles.row]}>
            <TextInput
              style={[styles.halfbox, { marginRight: 15 }]}
              placeholder={""}
              onChangeText={text => this.setState({ major: text })}
            />
            <TextInput
              style={[styles.halfbox, { marginLeft: 15 }]}
              placeholder={""}
              onChangeText={text => this.setState({ course: text })}
            />
          </View>
          <View style={[styles.row]}>
            <TouchableOpacity
              style={[styles.uploadbutton, { marginRight: 15 }]}
              onPress={this.onPressUpload}
            >
              <Text style={[styles.buttontext]}>Upload</Text>
              <Text style={[styles.buttontext]}>Image</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "column" }}>
              <Text style={[styles.abovetext, { marginLeft: 15 }]}>Price</Text>
              <TextInput
                style={[styles.halfbox, { marginLeft: 15 }]}
                placeholder={""}
                keyboardType="numeric"
                onChangeText={text => this.setState({ price: text })}
              />

              <TouchableOpacity
                style={[styles.button, { marginLeft: 15 }]}
                onPress={this.onPressSell}
              >
                <Text style={[styles.buttontext]}>List Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
