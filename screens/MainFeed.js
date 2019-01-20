import React from "react";
import { View } from "react-native";
import Feed from "../components/Feed";
import firebase from "firebase";
import { _ } from "lodash";

console.disableYellowBox = true;

export default class MainFeed extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      infoList: [],
      loading: true,
      college: global.userProfile.college
    };
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    firebase
      .database()
      .ref("books/" + this.state.college)
      .on("value", snapshot => {
        let books = snapshot.val();
        if (books != null) {
          let infoList = Object.values(books);
          this.setState({ infoList, loading: false });
        }
      });
  };

  render() {
    return (
      <View>
        <Feed infoList={this.state.infoList} searchBar={true} navigation={this.props.navigation} />
      </View>
    );
  }
}

