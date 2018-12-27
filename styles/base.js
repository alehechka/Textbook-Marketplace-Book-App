import React from "react";
import {  StyleSheet } from "react-native";
export default styles = StyleSheet.create({
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
      height: 150,
      width: 165,
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
    abovetextV: {
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
      marginBottom: 25,
    },
    button: {
      height: 49,
      width: 145,
      backgroundColor: "#E0A315",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50
    },
    uploadbutton: {
      height: 130,
      flex: 1,
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