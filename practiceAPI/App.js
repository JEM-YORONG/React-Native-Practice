import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

export default function App() {
  // data array
  const [data, setData] = useState([]);
  // fetch api data
  const getApiData = async () => {
    const ApiUrl = "";
  };
  // response checker
  return (
    // main container
    <View style={styles.container}>
      {/* title */}
      <Text style={styles.title}></Text>
      {/* data display container */}
      <View style={styles.displayContainer}></View>
      {/* data holder */}
      <View style={styles.dataHolder}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
