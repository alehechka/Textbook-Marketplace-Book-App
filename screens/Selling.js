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
            userUID: firebase.auth().currentUser.uid,
            sellingBooks: [],
            college: null
        };
    }

    componentDidMount() {
        this.retrieveUser();
    }

    retrieveUser = () => {
        firebase
            .database()
            .ref("users/" + this.state.userUID)
            .on("value", snapshot => {
                let user = snapshot.val();
                this.setState({ sellingBooks: user.selling, college: user.college, loading: false });
            });
    }

    getBooks = () => {
        var list = [];
        for (var i = 0; i < this.state.sellingBooks.length; i++) {
            firebase
                .database()
                .ref("books/" + this.state.college + "/" + this.state.sellingBooks[i])
                .on("value", snapshot => {
                    let book = snapshot.val();
                    list.push(Object.values(book)[0]);
                    console.log(list);
                });
        }
        this.setState({ infoList: list })
    };

    onPressViewImage = (item) => {
        this.setState({ thumbnail: item.thumbnail });
        this.setState({ image: item.image });
        this.setState({ isImageViewVisible: true });
    };

    render() {
        if (this.state.loading == false) {
            this.getBooks();
            this.setState({ loading: true })
        }
        return (
            <ScrollView style={{ backgroundColor: "white" }}>
                <List>
                    {this.state.infoList.map(item => (
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
                                            {truncateAuthorName(item.author)} | {item.year}
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

function truncateAuthorName(author) {
    if (author == null) {
        return "Author";
    } else {
        const result = author;
        const resultArray = result.split(" ");
        return resultArray[resultArray.length - 1];
    }
}