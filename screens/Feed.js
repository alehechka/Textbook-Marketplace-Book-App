import React from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput, 
  Modal
} from "react-native";
import { styles, feedstyles } from "../styles/base.js";
import { List, ListItem, Avatar, } from "react-native-elements";
import ImageViewer from 'react-native-image-zoom-viewer';
import firebase from "firebase";
import { _ } from "lodash";

console.disableYellowBox = true;

export default class Feed extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { search: "" };

    this.state = {
      infoList: [],
      loading: true,
      currentUser: "-LUwfgY-M3fTZd_Rxi0z" //THIS IS DUNGOS USER ID. NEED A WAY TO SET GLOBAL USER ID WHEN A USER SIGNS IN AND MAINTAIN IT. I think firebase has a function
    };
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    firebase
      .database()
      .ref(`books/`)
      .on("value", snapshot => {
        let books = snapshot.val();
        let infoList = Object.values(books);
        console.log(infoList);
        this.setState({ infoList, loading: false });
      });
  };

  submitSearch = () => {
    console.log(this.state.search);
  };

  viewImage() {
    console.log("View image");
    return (
        <Modal visible={true} transparent={true}>
            <ImageViewer imageUrls={["../assets/bookDefault.png"]}/>
        </Modal>
    )
}

  render() {
    return (
      <ScrollView style={{ marginTop: 20, backgroundColor: "white" }}>
        <View style={[styles.container, { marginTop: 15 }]}>
          <TextInput
            style={[feedstyles.textbox, { borderRadius: 50 }]}
            placeholder={" Search"}
            onChangeText={text => this.setState({ search: text })}
            onSubmitEditing={this.submitSearch}
          />
        </View>
        <List>
          {this.state.infoList.map(item => (
            <ListItem
              onPress={() => {
                console.log("chat");
                this.props.navigation.navigate("Chat", {
                  bookKey: item.key,
                  currentUID: this.state.currentUser
                });
              }}
              avatar={
                <Avatar
                  width={100}
                  source={require("../assets/bookDefault.png")}
                  onPress={this.viewImage}
                />
              }
              key={item.key}
              title={
                <View style={[feedstyles.right]}>
                  <Text
                    ellipsizeMode={"tail"}
                    numberOfLines={1}
                    style={[feedstyles.title]}
                  >
                    {item.title}
                  </Text>
                </View>
              }
              subtitle={
                <View>
                  <View style={[feedstyles.right]}>
                    <Text>ISBN: {item.isbn}</Text>
                    <Text>Author | Year</Text>
                    <Text />
                  </View>
                  <View style={[feedstyles.row]}>
                    <View style={[feedstyles.left, { flex: 1 }]}>
                      <Text style={[feedstyles.price]}>${item.price}</Text>
                    </View>
                    <View style={[styles.right, { flex: 1 }]}>
                      <Text style={[feedstyles.majorCourse]}>{item.major}</Text>
                      <Text style={[feedstyles.majorCourse]}>
                        {item.course}
                      </Text>
                    </View>
                  </View>
                </View>
              }
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}