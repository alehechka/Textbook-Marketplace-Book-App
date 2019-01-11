import React from "react";
import { Text, View, ScrollView, TextInput } from "react-native";
import { styles, feedstyles } from "../styles/base.js";
import { List, ListItem, Avatar } from "react-native-elements";
import ImageView from "react-native-image-view";
import firebase from "firebase";
import { _ } from "lodash";

console.disableYellowBox = true;

export default class Feed extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      isImageViewVisible: false,
      thumbnail: "",
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
        this.setState({ infoList, loading: false });
      });
  };

  submitSearch = () => {
    console.log(this.state.search);
  };

  onPressViewImage = (item) => {
    this.setState({thumbnail: item.thumbnail});
    this.setState({ isImageViewVisible: true });
  };

  truncateAuthorName = author => {
    if (author == null) {
      return "Author";
    } else {
      const result = author;
      const resultArray = result.split(" ");
      return resultArray[resultArray.length - 1];
    }
  };

  render() {
    return (
      <ScrollView style={{ marginTop: 25, backgroundColor: "white" }}>
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
                  source={{ uri: item.thumbnail }}
                  onPress={() => this.onPressViewImage(item)}
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
                    <Text>
                      {this.truncateAuthorName(item.author)} | {item.year}
                    </Text>
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
        <ImageView
          images={[
            {
              source: this.state.thumbnail === undefined ? require('../assets/bookDefault.png') : { uri: this.state.thumbnail },
              width: this.state.thumbnail === undefined ? 150 : this.state.thumbnail.width,
              height: this.state.thumbnail === undefined ? 150 : this.state.thumbnail.height
            },
            {
              //Update this image to use the user uploaded image
              source: this.state.image === undefined ? require('../assets/bookDefault.png') : { uri: this.state.image }, 
              width: 150,
              height: 150
            }
          ]}
          animationType="slide"
          isVisible={this.state.isImageViewVisible}
          onClose={() => this.setState({ isImageViewVisible: false })}
        />
      </ScrollView>
    );
  }
}
