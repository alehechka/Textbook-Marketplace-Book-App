import React from "react";
import {  StyleSheet } from "react-native";
import Colors from '../constants/Colors';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'column',
      justifyContent: "center",
      alignItems: "stretch",
      paddingHorizontal: 25
    },
    row: {
      flexDirection: 'row',
      alignItems: 'stretch'
    },
    icon: {
      height: 180,
      width: 150,
    },
    barcode: {
      height: 75,
      width: 250,
      marginBottom: 10,
      marginTop: 20
    },
    abovetext: {
      textAlign: "left",
      color: "#BAB7B7",
      fontSize: 15,
    },
    abovetextVerify: {
      color: "#847B7B",
      fontSize: 22,
      marginBottom: 40
    },
    textbox: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 15,
    },
    halfbox: {
      height: 40,
      flex: 1,
      borderColor: "gray",
      borderWidth: 1,
    },
    button: {
      height: 49,
      width: 145,
      backgroundColor: Colors.tintColor,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50
    },
    uploadbutton: {
      height: 130,
      flex: 1,
      backgroundColor: Colors.tintColor,
      justifyContent: "center",
      alignItems: "center",
    },
    sellbutton: {
      height: 49,
      flex: 1,
      backgroundColor: Colors.tintColor,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50
    },
    buttontext: {
      fontSize: 25,
      fontWeight: "bold",
      color: "white"
    }
  });

  export const feedstyles = StyleSheet.create({
    right: {
      alignItems: "flex-end"
    },
    left: {
      marginLeft: 10
    },
    row: {
      flexDirection: "row"
    },
    textbox: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1
    },
    title: {
      fontWeight: "bold",
      fontSize: 20,
      marginLeft: 10
    },
    price: {
      color: "darkgray",
      fontSize: 20
    },
    majorCourse: {
      fontSize: 12,
      color: "gray",
      textAlign: "right"
    }
  });