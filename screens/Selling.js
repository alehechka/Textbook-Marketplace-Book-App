import React from "react";
import { View } from "react-native";
import Feed from "../components/Feed";
import { styles } from "../styles/base.js";
import firebase from "firebase";
import { _ } from "lodash";

console.disableYellowBox = true;

export default class SellingFeed extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            infoList: [],
            userUID: global.userProfile.userUID,
            sellingBooks: global.userProfile.selling,
            college: global.userProfile.college
        };
    }

    componentDidMount() {
        this.getBooks();
    }

    getBooks = () => {
        var list = [];
        if (this.state.sellingBooks != null || this.state.sellingBooks != undefined) {
            for (var i = 0; i < this.state.sellingBooks.length; i++) {
                firebase
                    .database()
                    .ref("books/" + this.state.college)
                    .orderByKey().equalTo(this.state.sellingBooks[i])
                    .on("value", snapshot => {
                        let book = snapshot.val();
                        list.push(Object.values(book)[0]);
                        this.setState({ infoList: list })
                    });
            }
        } else {
            this.setState({ infoList: list })
        }
    };

    render() {
        return (
            <View>
                <Feed infoList={this.state.infoList} searchBar={false} navigation={this.props.navigation} />
            </View>
        );
    }
}