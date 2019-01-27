import React from "react";
import { View } from "react-native";
import Feed from "../components/Feed";
import firebase from "firebase";
import { _ } from "lodash";

export default class SellingFeed extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      infoList: [],
      sellingBooks: [],
      college: null,
      retrieveBooks: false
    };
  }

  componentDidMount() {
    this.retrieveUser(firebase.auth().currentUser.uid);
  }

  componentDidUpdate(prevProps) {
    if(this.state.retrieveBooks == true) {
        this.getBooks();
    }
}

  retrieveUser = userUID => {
    firebase
      .database()
      .ref("users/" + userUID)
      .on("value", snapshot => {
        let user = snapshot.val();
        this.setState({
          sellingBooks: user.selling,
          college: user.college,
          retrieveBooks: true
        });
      });
  };

  getBooks = () => {
    var list = [];
    if (this.state.sellingBooks != null && this.state.sellingBooks != undefined) {
      for (var i = 0; i < this.state.sellingBooks.length; i++) {
        firebase
          .database()
          .ref("books/" + this.state.college)
          .orderByKey()
          .equalTo(this.state.sellingBooks[i])
          .on("value", snapshot => {
            let book = snapshot.val();
            list.push(Object.values(book)[0]);
          });
      }
    }
    this.setState({ infoList: list, retrieveBooks: false });
  };

  render() {
    return (
      <View>
        <Feed
          infoList={this.state.infoList}
          searchBar={false}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}
