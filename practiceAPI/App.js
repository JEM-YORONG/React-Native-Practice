import React, { useState, useEffect } from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function App() {
  // data array
  const [data, setData] = useState([]);
  // fetch api data
  const getApiData = async () => {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      setData(result);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  // response checker
  useEffect(() => {
    getApiData();
  });

  return (
    // main container
    <View style={styles.container}>
      {/* title */}
      <Text style={styles.title}>LIST</Text>
      {/* data display container */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // data holder display
          <View style={styles.dataHolder}>
            <Text style={styles.defaultText}>User ID: {item.userId}</Text>
            <Text style={styles.defaultText}>Item ID: {item.id}</Text>
            <Text style={styles.defaultText}>Title: {item.title}</Text>
            <Text style={styles.defaultText}>Content: {item.body}</Text>
          </View>
        )}
        style={styles.displayContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    marginTop: StatusBar.currentHeight,
  },
  title: {
    textAlign: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  displayContainer: {
    flex: 1,
    padding: 10,
  },
  dataHolder: {
    flex: 1,
    alignSelf: "stretch",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
  },
  defaultText: {
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-evenly",
  },
  touch: {
    flex: 1,
    alignItems: "center",
  },
});
