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
  TextInput,
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

  // get, set title
  const [title, setTitle] = useState("");
  // get current date
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = month + "/" + date + "/" + year;

  // save data
  const saveApiData = async () => {
    // check empty field
    if (title === "") {
      Alert.alert("Oops!", "Empty field detected.", [
        {
          text: "Enter Title",
          onPress: () => {
            console.log("Enter Title");
          },
        },
      ]);
    } else {
      // data to save
      const data = {
        id: Math.random().toString(),
        title: title,
        date: currentDate,
      };

      const apiUrl = "http://10.0.2.2:3000/todos";
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Typer": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(result);
        getApiData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // load response
  useEffect(() => {
    getApiData();
  }, []);

  return (
    // main container
    <View style={styles.container}>
      {/* title */}
      <Text style={styles.title} onPress={getApiData}>
        TO-DO LIST
      </Text>
      {/* add data container */}
      <View style={styles.addContainer}>
        {/* input fields */}
        <TextInput
          style={styles.titleInput}
          value={title}
          placeholder="Enter To-do title"
          onChangeText={(text) => setTitle(text)}
        />
        {/* save button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            saveApiData();
          }}
        >
          <Text style={{ textAlign: "center" }}>Save</Text>
        </TouchableOpacity>
      </View>
      {/* data display container */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          data.length ? ( // data holder display
            <TouchableOpacity
              style={styles.displayContainer}
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
    padding: 10,
  },
  defaultText: {
    flex: 1,
    padding: 10,
  },
  titleInput: {
    borderWidth: 1,
    padding: 5,
    textAlign: "center",
    margin: 5,
    borderRadius: 10,
  },
  saveButton: {
    borderWidth: 1,
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
  addContainer: {
    margin: 5,
  },
});
