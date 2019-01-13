import React from "react";
import { Text, View, ScrollView, TextInput } from "react-native";
import { styles, feedstyles } from "../styles/base.js";
import { List, ListItem, Avatar } from "react-native-elements";
import ImageView from "react-native-image-view";
import Layout from "../constants/Layout";
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
      currentUser: firebase.auth().currentUser.uid//DUNGO IS A GODDAMN IDIOT
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
    this.setState({ thumbnail: item.thumbnail });
    this.setState({ image: item.image });
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
                this.props.navigation.navigate("Threads", {
                  bookKey: item.bookKey,
                  currentUID: this.state.currentUser
                });
              }}
              avatar={
                <Avatar
                  width={100}
                  source={item.thumbnail !== undefined ? { uri: item.thumbnail }
                    : item.image !== null ? { uri: item.image } : require('../assets/bookDefault.png')}
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
            this.state.thumbnail !== undefined ?
              {
                source: { uri: this.state.thumbnail },
                width: this.state.thumbnail.width,
                height: this.state.thumbnail.height
              } :
              {
                source: require('../assets/bookDefault.png'),
                width: 150,
                height: 150
              },
            this.state.image !== undefined ?
              {
                source: { uri: this.state.image },
                width: Layout.window.width * (2 / 3),
                height: Layout.window.height * (2 / 3)
              } :
              {
                source: require('../assets/bookDefault.png'),
                width: 150,
                height: 150
              },
          ]}
          animationType="fade"
          isVisible={this.state.isImageViewVisible}
          onClose={() => this.setState({ isImageViewVisible: false })}
        />
      </ScrollView>
    );
  }
}
