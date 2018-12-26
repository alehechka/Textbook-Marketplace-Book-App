import React from "react";
import {  StyleSheet } from "react-native";
export default styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: "center",
      alignItems: "stretch",
      paddingHorizontal: 25
    },
    row: {
      //flex: 1,
      flexDirection: 'row',
      alignItems: 'stretch'
    },
    icon: {
      height: 150,
      width: 165,
    },
    abovetext: {
      textAlign: "left",
      color: "#BAB7B7",
      fontSize: 15,
    },
    abovetextV: {
      color: "#847B7B",
      fontSize: 24,
      marginBottom: 40
    },
    textbox: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 25,
    },
    halfbox: {
      height: 40,
      flex: 1,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 25,
    },
    button: {
      height: 49,
      width: 145,
      marginBottom: 25,
      backgroundColor: "#E0A315",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50
    },
    uploadbutton: {
      height: 140,
      flex: 1,
      marginBottom: 25,
      backgroundColor: "#E0A315",
      justifyContent: "center",
      alignItems: "center",
    },
    buttontext: {
      fontSize: 25,
      fontWeight: "bold",
      color: "white"
    }
  });