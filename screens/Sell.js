import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import { styles } from "../styles/base.js";
import firebase from "firebase";
import { _ } from "lodash";
import { BarCodeScanner, Permissions } from 'expo';
var isbn = require('node-isbn');

console.disableYellowBox = true;

export default class Sell extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    hasCameraPermission: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      isbn: null,
      title: null,
      price: null,
      major: null,
      course: null,
      authors: [],
      year: null,
      edition: null,
      smallThumbnail: null,
      thumbnail: null,
      book: null,
      scanBarcode: false,
    };
  }
  onPressSell = () => {
    this._getBookInformation();
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
        author: this.state.authors[0],
        year: this.state.year,
        edition: this.state.edition,
        smallThumbnail: this.state.smallThumbnail,
        thumbnail: this.state.thumbnail,
        key: key
      });
    console.log("List book");
    this.props.navigation.navigate("Selling");
  };

  onPressScan = () => {
    console.log("Scan barcode");
    this._requestCameraPermission();
    this.setState({ scanBarcode: true });
  };

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleIsbnRead = data => {
    console.log(data.data);
    this.setState({ isbn: data.data });
    this._getBookInformation();
    this.setState({ scanBarcode: false });
  };

  _getBookInformation = () => {
    this.setState({
      book: isbn.resolve(this.state.isbn, function (err, book) {
        if (err) {
          console.log('Book not found', err);
        } else {
          console.log('Book found', book);
        }
      })
    });
  };

  onPressReturn = () => {
    this.setState({ scanBarcode: false });
  };

  onPressUpload = () => {
    console.log("Upload image");
  };

  render() {
    if (this.state.scanBarcode == true) {
      if (this.state.hasCameraPermission === false) {
        return (
          <View style={[styles.container, { alignItems: 'center' }]}>
            <Text style={[styles.abovetextVerify, { fontSize: 20 }]}>Camera permission is not granted</Text>
            <TouchableOpacity
              style={[styles.button, { width: 185, marginBottom: 15 }]}
              onPress={this._requestCameraPermission}
            >
              <Text style={[styles.buttontext]}>Request again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { marginBottom: 15 }]}
              onPress={this.onPressReturn}
            >
              <Text style={[styles.buttontext]}>Return</Text>
            </TouchableOpacity>
          </View>
        );
      }
      else {
        return (
          <View style={{ flex: 1 }}>
            <BarCodeScanner
              onBarCodeRead={this._handleIsbnRead}
              style={StyleSheet.absoluteFill}
            />
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <TouchableOpacity
                style={[styles.button, { marginBottom: 15 }]}
                onPress={this.onPressReturn}
              >
                <Text style={[styles.buttontext]}>Return</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
    else {
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
              onEndEditing={text => this.setState({ title: text })}
            />
            <Text style={[styles.abovetext]}>ISBN</Text>
            <TextInput
              style={[styles.textbox]}
              placeholder={""}
              value={this.state.isbn}
              keyboardType="numeric"
              onEndEditing={text => this.setState({ isbn: text })}
            />
            <View style={[styles.row]}>
              <Text style={[styles.abovetext]}>Major</Text>
              <Text style={[styles.abovetext, { marginLeft: 135 }]}>Course</Text>
            </View>
            <View style={[styles.row]}>
              <TextInput
                style={[styles.halfbox, { marginRight: 15 }]}
                placeholder={""}
                onEndEditing={text => this.setState({ major: text })}
              />
              <TextInput
                style={[styles.halfbox, { marginLeft: 15 }]}
                placeholder={""}
                onEndEditing={text => this.setState({ course: text })}
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
                  onEndEditing={text => this.setState({ price: text })}
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
}
