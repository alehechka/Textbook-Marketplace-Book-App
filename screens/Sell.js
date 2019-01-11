import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Alert
} from "react-native";
import { styles } from "../styles/base.js";
import firebase from "firebase";
import { _ } from "lodash";
import { BarCodeScanner, Permissions } from 'expo';
var isbn = require('node-isbn');
import Layout from '../constants/Layout';

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
      subtitle: null,
      price: null,
      major: null,
      course: null,
      authors: [],
      year: null,
      smallThumbnail: null,
      thumbnail: null,
      book: null,
      scanBarcode: false,
      formFull: false,
    };
  }

  componentDidMount() {
  }

  onPressSell = () => {
    this._getBookInformation(this.state.isbn);
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
        //subtitle: this.state.subtitle,
        isbn: this.state.isbn,
        price: this.state.price,
        major: this.state.major,
        course: this.state.course,
        author: this.state.authors[0],
        year: this.state.year,
        smallThumbnail: this.state.smallThumbnail,
        thumbnail: this.state.thumbnail,
        key: key
      });
    console.log("List book:");
    console.log(this.state.title, this.state.isbn, this.state.major, this.state.course, this.state.price);
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
    this._getBookInformation(this.state.isbn);
    this.setState({ scanBarcode: false });
  };

  _getBookInformation = (isbnBook) => {
    isbn.resolve(isbnBook).then(returnBook => {
      this.setState({ book: returnBook });
      console.log('Book read successful')
    }).catch(err => {
      console.log('ISBN Read error: ' + err);
    });
  };

  onPressReturn = () => {
    this.setState({ scanBarcode: false });
  };

  onPressUpload = () => {
    console.log("Upload image");
  };

  onPressInvalidSell = () => {
    console.log("Invalid sell");
    Alert.alert("All text fields must be entered.");
  };

  render() {
    let listBook;
    if (this.state.formFull) {
      listBook = <TouchableOpacity
        style={[styles.sellbutton, { width: ((Layout.window.width / 2) - 40), marginLeft: 15 }]}
        onPress={this.onPressSell}
      >
        <Text style={[styles.buttontext]}>List Book</Text>
      </TouchableOpacity>
    } else {
      listBook = <TouchableOpacity
        style={[styles.sellbutton, { width: ((Layout.window.width / 2) - 40), marginLeft: 15, backgroundColor: 'gray' }]}
        onPress={this.onPressInvalidSell}
      >
        <Text style={[styles.buttontext]}>List Book</Text>
      </TouchableOpacity>
    }
    if (this.state.isbn != null && this.state.isbn != ''
      && this.state.major != null && this.state.major != ''
      && this.state.course != null && this.state.course != ''
      && this.state.price != null && this.state.price != ''
      && this.state.formFull != true) {
      this.setState({ formFull: true })
    }
    if ((this.state.isbn == ''
      || this.state.major == ''
      || this.state.course == ''
      || this.state.price == '')
      && this.state.formFull != false) {
      this.setState({ formFull: false })
    }
    if (this.state.book != null
      && this.state.authors == null
      && this.state.publishedDate == null
      && this.state.smallThumbnail == null
      && this.state.thumbnail == null) {
      console.log(this.state.book)
      this.setState({ title: this.state.book.title });
      this.setState({ subtitle: this.state.book.subtitle })
      this.setState({ authors: this.state.book.authors });
      this.setState({ year: this.state.book.publishedDate });
      this.setState({ smallThumbnail: this.state.book.imageLinks.smallThumbnail });
      this.setState({ thumbnail: this.state.book.imageLinks.thumbnail });
    }

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
              value={this.state.title}
              onChangeText={text => this.setState({ title: text })}
            />
            <Text style={[styles.abovetext]}>ISBN</Text>
            <TextInput
              style={[styles.textbox]}
              placeholder={""}
              value={this.state.isbn}
              keyboardType="numeric"
              onChangeText={text => this.setState({ isbn: text })}
              onEndEditing={() => this._getBookInformation()}
            />
            <View style={[styles.row, { height: 86 }]}>
              <View style={{ flexDirection: "column" }}>
                <Text style={[styles.abovetext]}>Major</Text>
                <TextInput
                  style={[styles.halfbox, { width: ((Layout.window.width / 2) - 40), marginRight: 15 }]}
                  placeholder={""}
                  value={this.state.major}
                  onChangeText={text => this.setState({ major: text })}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={[styles.abovetext, { marginLeft: 15 }]}>Course</Text>
                <TextInput
                  style={[styles.halfbox, { width: ((Layout.window.width / 2) - 40), marginLeft: 15 }]}
                  placeholder={""}
                  value={this.state.course}
                  onChangeText={text => this.setState({ course: text })}
                />
              </View>
            </View>
            <View style={[styles.row]}>
              <TouchableOpacity
                style={[styles.uploadbutton, { width: ((Layout.window.width / 2) - 40), marginRight: 15 }]}
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
                  value={this.state.price}
                  onChangeText={text => this.setState({ price: text })}
                />
                {listBook}
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      );
    }
  }
}
