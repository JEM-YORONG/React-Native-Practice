import React, { useState, useEffect } from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
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

  // Update API data
  // get, set update title
  const [titleUpdate, setTitleUpdate] = useState("");
  // get, set update title Id
  const [titleId, setTitleId] = useState("");
  const updateApiData = async (Id) => {
    // check empty field
    if (titleUpdate === "") {
      Alert.alert("Oops!", "Empty field detected.", [
        {
          text: "Enter Title",
          onPress: () => {
            console.log("Enter Title");
          },
        },
      ]);
    } else {
      // data to update
      const data = {
        id: titleId,
        title: titleUpdate,
        date: currentDate,
      };
      const apiUrl = `http://10.0.2.2:3000/todos/${Id}`;
      try {
        const response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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
  // modal for edit checker
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(false);
  };

  // Delete API data
  const deleteApiData = async (id) => {
    const apiUrl = `http://10.0.2.2:3000/todos/${id}`;
    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log(result);
      getApiData();
    } catch (error) {
      console.log(error);
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
        {/* edit modal */}
        <Modal
          isVisible={isModalVisible}
          style={styles.modalEdit}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContentContainer}>
            <Text style={styles.todoTitle}>Update To-Do Title</Text>
            <TextInput
              style={styles.editTitleInput}
              value={titleUpdate}
              placeholder="Enter new title"
              onChangeText={(text) => setTitleUpdate(text)}
            />
            {/* modal button */}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  updateApiData(titleId);
                  toggleModal();
                }}
                style={styles.modalButton}
              >
                <Text>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.modalButton}
              >
                <Text>cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
                Alert.alert("Item ID: " + item.id, "Title: " + item.title, [
                  {
                    text: "EDIT",
                    onPress: () => {
                      console.log("EDIT - " + item.id);
                      setModalVisible(true);
                      setTitleId(item.id);
                      setTitleUpdate(item.title);
                      console.log(item.id + " : " + item.title);
                    },
                  },
                  {
                    text: "DELETE",
                    onPress: () => {
                      console.log("DELETE - " + item.id);
                      deleteApiData(item.id);
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
  modalEdit: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    minHeight: 100,
    maxHeight: 200,
    marginTop: "auto",
  },
  modalContentContainer: {
    flex: 1,
    borderWidth: 1,
    alignSelf: "stretch",
    alignItems: "center",
    padding: 10,
  },
  modalButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-around",
    margin: 10,
  },
  editTitleInput: {
    borderWidth: 1,
    alignSelf: "stretch",
    margin: 10,
    borderRadius: 10,
    textAlign: "center",
  },
  todoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
});
