import React from "react";
import { View } from "react-native";
import firebase from "firebase";
import Feed from "../components/Feed";
import { _ } from "lodash";

console.disableYellowBox = true;

export default class BuyingFeed extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            infoList: [],
            buyingBooks: [],
            college: null,
            retrieveBooks: false
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
                let user = snapshot.val();
                this.setState({ buyingBooks: user.buying, college: user.college, retrieveBooks: true });
            });
    }

    getBooks = () => {
        var list = [];
        if (this.state.buyingBooks != null && this.state.buyingBooks != undefined) {
            for (var i = 0; i < this.state.buyingBooks.length; i++) {
                firebase
                    .database()
                    .ref("books/" + this.state.college)
                    .orderByKey().equalTo(this.state.buyingBooks[i])
                    .on("value", snapshot => {
                        let book = snapshot.val();
                        list.push(Object.values(book)[0]);
                        this.setState({ infoList: list, retrieveBooks: false })
                    });
            }
        } else {
            this.setState({ infoList: list, retrieveBooks: false })
        }
    }

    render() {
        if (this.state.retrieveBooks == true) {
            this.getBooks();
        }
        return (
            <View>
                <Feed infoList={this.state.infoList} searchBar={false} navigation={this.props.navigation} />
            </View>
        );
    }
}

