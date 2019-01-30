import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  Picker
} from "react-native";
import { styles } from "../styles/base.js";
import firebase from "firebase";
import { _ } from "lodash";
import { BarCodeScanner, Permissions } from "expo";
var isbn = require("node-isbn");
import Layout from "../constants/Layout";
import Condition from "../constants/Condition";
import Major from "../constants/Majors";

console.disableYellowBox = true;

export default class Sell extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    hasCameraPermission: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isbn: null,
      title: null,
      subtitle: null,
      price: null,
      major: null,
      condition: null,
      authors: [],
      year: null,
      smallThumbnail: null,
      thumbnail: null,
      image: null,
      imageBase64: null,
      book: null,
      scanBarcode: false,
      formFull: false,
      userUID: firebase.auth().currentUser.uid,
      sellingBooks: [],
      college: null
    };
  }

  componentDidMount() {
    this.retrieveUser(firebase.auth().currentUser.uid);
  }

  componentDidUpdate(prevProps) {
    //Update formFull to true when all text fields are filled
    if (
      this.state.isbn != null &&
      this.state.isbn != "" &&
      this.state.major != null &&
      this.state.major != "" &&
      this.state.condition != null &&
      this.state.condition != "" &&
      this.state.price != null &&
      this.state.price != "" &&
      this.state.formFull != true
    ) {
      this.setState({ formFull: true });
    }
    //Update formFull to false when a text field is deleted
    if (
      (this.state.isbn == "" ||
        this.state.major == "" ||
        this.state.condition == "" ||
        this.state.price == "") &&
      this.state.formFull != false
    ) {
      this.setState({ formFull: false });
    }
    //Update all book fields when book info is retrieved from ISBN api
    if (
      this.state.book != null &&
      this.state.authors.length == 0 &&
      this.state.publishedDate == null &&
      this.state.smallThumbnail == null &&
      this.state.thumbnail == null &&
      this.state.year == null
    ) {
      console.log(this.state.book);
      this.setState({
        title: this.state.book.title,
        subtitle: this.state.book.subtitle,
        authors: this.state.book.authors,
        year: this.state.book.publishedDate,
        smallThumbnail: this.state.book.imageLinks.smallThumbnail,
        thumbnail: this.state.book.imageLinks.thumbnail
      });
    }
  }

  retrieveUser = userUID => {
    firebase
      .database()
      .ref("users/" + userUID)
      .on("value", snapshot => {
        let user = snapshot.val();
        this.setState({ sellingBooks: user.selling, college: user.college, major: user.major });
      });
  };

  onPressSell = () => {
    this._getBookInformation(this.state.isbn);
    let bookResult = firebase
      .database()
      .ref("books/" + this.state.college)
      .push();
    let bookKey = bookResult.key;
    let threadResult = firebase
      .database()
      .ref("threads/")
      .push();
    let threadKey = threadResult.key;

    //This code is for image upload. Currently it throws an error because it doesn't like base64
    /*
      var imageRef = firebase.storage().ref().child("images/" + key + ".jpg")
      .putString(this.state.imageBase64.substring(23), 'base64').then(function(snapshot) {
        console.log('Uploaded a base64 string!');
      }).catch(function(error) {
        console.log("Error uploading image");
      });
      imageRef.updateMetadata({'bookKey': key}).then(function(metadata) {
        console.log("Metadata update succesful")
      }).catch(function(error) {
        console.log("Metadata update failed")
      });
      imageRef.getDownloadURL().then(url => {
        this.setState({image: url})
      })
    */

    firebase
      .database()
      .ref("books/" + this.state.college + "/" + bookKey)
      .set({
        title: this.state.title,
        isbn: this.state.isbn,
        price: this.state.price,
        major: this.state.major,
        condition: this.state.condition,
        authors: this.state.authors,
        year: this.state.year,
        smallThumbnail:
          this.state.smallThumbnail != undefined
            ? this.state.smallThumbnail
            : "",
        thumbnail:
          this.state.thumbnail != undefined ? this.state.thumbnail : "",
        image: this.state.image,
        bookKey: bookKey,
        threadKey: threadKey
      });
    firebase
      .database()
      .ref("threads/" + threadKey)
      .set({
        bookKey: bookKey,
        sellerUID: this.state.userUID,
        chats: [{}],
        threadKey: threadKey
      });
    this.addBookToSelling(bookKey);
    this.props.navigation.navigate("Selling");
  };

  addBookToSelling = bookKey => {
    if (this.state.sellingBooks == null) {
      firebase
        .database()
        .ref("users/" + this.state.userUID)
        .update({
          selling: [bookKey]
        });
    } else {
      var list = this.state.sellingBooks;
      list.push(bookKey);
      this.setState({ sellingBooks: list });
      firebase
        .database()
        .ref("users/" + this.state.userUID)
        .update({
          selling: list
        });
    }
  };

  onPressScan = () => {
    this._requestCameraPermission();
    this.setState({ scanBarcode: true });
  };

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  _handleIsbnRead = data => {
    this.setState({ isbn: data.data });
    this._getBookInformation(this.state.isbn);
    this.setState({ scanBarcode: false });
  };

  _getBookInformation = isbnBook => {
    isbn
      .resolve(isbnBook)
      .then(returnBook => {
        this.setState({ book: returnBook });
        console.log("Book read successful");
      })
      .catch(err => {
        console.log("ISBN Read error: " + err);
      });
  };

  onPressReturn = () => {
    this.setState({ scanBarcode: false });
  };

  onPressUpload = () => {
    //This button temporarily retries the ISBN retieval until we can get a fix in for that function.
    this._getBookInformation(this.state.isbn);
  };

  onPressInvalidSell = () => {
    Alert.alert("All text fields must be entered.");
  };

  render() {
    let listBook;
    if (this.state.formFull) {
      listBook = (
        <TouchableOpacity
          style={[
            styles.sellbutton,
            { width: Layout.window.width / 2 - 40, marginLeft: 15 }
          ]}
          onPress={this.onPressSell}
        >
          <Text style={[styles.buttontext]}>List Book</Text>
        </TouchableOpacity>
      );
    } else {
      listBook = (
        <TouchableOpacity
          style={[
            styles.sellbutton,
            {
              width: Layout.window.width / 2 - 40,
              marginLeft: 15,
              backgroundColor: "gray"
            }
          ]}
          onPress={this.onPressInvalidSell}
        >
          <Text style={[styles.buttontext]}>List Book</Text>
        </TouchableOpacity>
      );
    }
    if (this.state.scanBarcode == true) {
      if (this.state.hasCameraPermission === false) {
        return (
          <View style={[styles.container, { alignItems: "center" }]}>
            <Text style={[styles.abovetextVerify, { fontSize: 20 }]}>
              Camera permission is not granted
            </Text>
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
      } else {
        return (
          <View style={{ flex: 1 }}>
            <BarCodeScanner
              onBarCodeRead={this._handleIsbnRead}
              style={StyleSheet.absoluteFill}
            />
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
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
    } else {
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
                <View style={{ borderColor: "gray", borderWidth: 1, marginBottom: 25, height: 40, width: Layout.window.width / 2 - 40, marginRight: 15 }}>
                  <Picker
                    style={[styles.halfbox]}
                    mode="dropdown"
                    selectedValue={this.state.major}
                    onValueChange={(itemValue) =>
                      this.setState({ major: itemValue })
                    }>
                    {Major.majors.map((item, index) => {
                      return (
                        <Picker.Item label={item} value={item} key={index} />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={[styles.abovetext, { marginLeft: 15 }]}>
                  Condition
                </Text>
                <View style={{ borderColor: "gray", borderWidth: 1, marginBottom: 25, height: 40, width: Layout.window.width / 2 - 40, marginLeft: 15 }}>
                  <Picker
                    style={[styles.halfbox]}
                    mode="dropdown"
                    selectedValue={this.state.condition}
                    onValueChange={(itemValue) =>
                      this.setState({ condition: itemValue })
                    }>
                    {Condition.condition.map((item, index) => {
                      return (
                        <Picker.Item label={item} value={item} key={index} />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>
            <View style={[styles.row]}>
              <TouchableOpacity
                style={[
                  styles.uploadbutton,
                  { width: Layout.window.width / 2 - 40, marginRight: 15 }
                ]}
                onPress={this.onPressUpload}
              >
                <Text style={[styles.buttontext]}>Upload</Text>
                <Text style={[styles.buttontext]}>Image</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "column" }}>
                <Text style={[styles.abovetext, { marginLeft: 15 }]}>
                  Price
                </Text>
                <View style={{ height: 40, marginBottom: 25 }}>
                  <TextInput
                    style={[styles.halfbox, { marginLeft: 15 }]}
                    placeholder={""}
                    keyboardType="numeric"
                    value={this.state.price}
                    onChangeText={text => this.setState({ price: text })}
                  />
                </View>
                {listBook}
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      );
    }
  }
}
