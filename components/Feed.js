import React from "react";
import { Text, View, ScrollView, TextInput } from "react-native";
import { styles, feedstyles } from "../styles/base.js";
import { List, ListItem, Avatar } from "react-native-elements";
import ImageView from "react-native-image-view";
import Layout from "../constants/Layout";
import { _ } from "lodash";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      thumbnail: "",
      image: "",
      isImageViewVisible: false
    };
  }

  onPressViewImage = item => {
    this.setState({ thumbnail: item.thumbnail });
    this.setState({ image: item.image });
    this.setState({ isImageViewVisible: true });
  };

  submitSearch = () => {
    console.log(this.state.search);
  };

  render() {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        {this.props.searchBar ? (
          <View style={{ marginTop: 25 }}>
            <View style={[styles.container, { marginTop: 15 }]}>
              <TextInput
                style={[feedstyles.textbox, { borderRadius: 50 }]}
                placeholder={" Search"}
                onChangeText={text => this.setState({ search: text })}
                onSubmitEditing={this.submitSearch}
              />
            </View>
          </View>
        ) : (
          <View />
        )}
        <List>
          {this.props.infoList.map(item => (
            <ListItem
              onPress={() => {
                console.log("chat");
                this.props.navigation.navigate("Threads", {
                  book: item
                });
              }}
              avatar={
                <Avatar
                  width={100}
                  source={
                    item.thumbnail !== undefined
                      ? { uri: item.thumbnail }
                      : item.image !== null
                      ? { uri: item.image }
                      : require("../assets/bookDefault.png")
                  }
                  onPress={() => this.onPressViewImage(item)}
                />
              }
              key={item.bookKey}
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
                      {truncateAuthorName(item.authors)} |{" "}
                      {item.year.substring(0, 4)}
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
                        {item.condition}
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
            this.state.thumbnail !== undefined
              ? {
                  source: { uri: this.state.thumbnail },
                  width: this.state.thumbnail.width,
                  height: this.state.thumbnail.height
                }
              : {
                  source: require("../assets/bookDefault.png"),
                  width: 150,
                  height: 150
                },
            this.state.image !== undefined
              ? {
                  source: { uri: this.state.image },
                  width: Layout.window.width * (2 / 3),
                  height: Layout.window.height * (2 / 3)
                }
              : {
                  source: require("../assets/bookDefault.png"),
                  width: 150,
                  height: 150
                }
          ]}
          animationType="fade"
          isVisible={this.state.isImageViewVisible}
          onClose={() => this.setState({ isImageViewVisible: false })}
        />
      </ScrollView>
    );
  }
}
function truncateAuthorName(authors) {
  if (authors == null) {
    return "Author";
  } else {
    const result = authors[0];
    const resultArray = result.split(" ");
    return resultArray[resultArray.length - 1];
  }
}
