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
      retrieveBooks: false,
      userProfile: null
    };
  }

  componentDidMount() {
    this.retrieveUser(firebase.auth().currentUser.uid);
  }

  retrieveUser = (userUID) => {
    firebase
      .database()
      .ref("users/" + userUID)
      .on("value", snapshot => {
        this.setState({ userProfile: snapshot.val(), retrieveBooks: true });
      });
  }

  getBooks = () => {
    firebase
      .database()
      .ref("books/" + this.state.userProfile.college)
      .on("value", snapshot => {
        let books = snapshot.val();
        if (books != null) {
          let infoList = Object.values(books);
          this.setState({ infoList, retrieveBooks: false, loading: false });
        }
      });
  }

  render() {
    if (this.state.retrieveBooks == true) {
      this.getBooks();
    }
    return (
      <View>
        <Feed infoList={this.state.infoList} searchBar={true} navigation={this.props.navigation} />
      </View>
    );
  }
}

