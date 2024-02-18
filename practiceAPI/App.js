import React, { useState, useEffect } from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function App() {
  // data array
  const [data, setData] = useState([]);
  // fetch api data
  const getApiData = async () => {
    const apiUrl = "http://10.0.2.2:3000/todos";
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      setData(result);
      //console.log(result);
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
        renderItem={({ item }) =>
          data.length ? ( // data holder display
            <TouchableOpacity
              onLongPress={() => {
                Alert.alert(item.title, "", [
                  {
                    text: "EDIT",
                    onPress: () => {
                      console.log("EDIT");
                    },
                  },
                  {
                    text: "DELETE",
                    onPress: () => {
                      console.log("DELETE");
                    },
                  },
                ]);
              }}
            >
              <View style={styles.dataHolder}>
                <Text style={styles.defaultText}>Item ID: {item.id}</Text>
                <Text style={styles.defaultText}>Title: {item.title}</Text>
                <Text style={styles.defaultText}>Date: {item.date}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.dataHolder}>
              <Text style={styles.defaultText}>NO TO-TO</Text>
            </View>
          )
        }
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
