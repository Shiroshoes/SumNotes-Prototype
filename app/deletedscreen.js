import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, TouchableHighlight, StyleSheet, Alert, Image, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function DeletedScreen({navigation}) {
  const [deletedNotes, setDeletedNotes] = useState([
    { id: "1", title: "Old Shopping List", content: "Milk, Eggs, Bread" },
    { id: "2", title: "Old Homework", content: "Math page 24" },
    { id: "3", title: "Old Ideas", content: "Build a notes app" },
  ]);

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleSelect = (id) => {
    if (selectedNotes.includes(id)) {
      setSelectedNotes(selectedNotes.filter((noteId) => noteId !== id));
    } else {
      setSelectedNotes([...selectedNotes, id]);
    }
  };

  const handleLongPress = (id) => {
    if (!selectionMode) {
      setSelectionMode(true);
      setSelectedNotes([id]);
    }
  };

  const handleBack = () => {
    setSelectionMode(false);
    setSelectedNotes([]);
    setMenuVisible(false);
  };


  useEffect(() => {
    if (selectionMode && selectedNotes.length === 0) {
      setSelectionMode(false);
      setMenuVisible(false);
    }
  }, [selectedNotes]);

  const renderNote = (item) => (
    <TouchableHighlight
      underlayColor="#c7c7c7ff"
      style={[
        styles.note,
        selectedNotes.includes(item.id) && {
          backgroundColor: "#f7c6c6",
          borderRadius: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          borderWidth: 2,
          borderColor: "rgba(0, 0, 0, 0.6)",
        },
      ]}
      onPress={() => {
        if (selectionMode) {
          toggleSelect(item.id);
        } else {
          Alert.alert(`${item.title}`, `${item.content}`, [{ text: "Back" }]);
        }
      }}
      onLongPress={() => handleLongPress(item.id)}
      delayLongPress={300}
    >
      <View>
        <Text style={styles.notetitle}>{item.title}</Text>
        <View
          style={{
            height: 3,
            backgroundColor: "#9e9e9e",
            marginHorizontal: 5,
            borderRadius: 2,
          }}
        />
        <Text style={styles.notecontent}>{item.content}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.toplayout}>     
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="dots-horizontal" size={35} color="black" />
        </TouchableOpacity>

        <Image source={require("../assets/sumnotes.png")} style={styles.logo} />
      </View>

      <View>
        <View style={{ height: 3, backgroundColor: "#585757ff", marginHorizontal: 5, borderRadius: 2}} />
      </View>

      {/* Selection Action Bar */}
      {selectionMode && (
        <View style={styles.selectionBar}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>

          <Text style={styles.selectionCount}>
            {selectedNotes.length} selected
          </Text>

          {/* 3 dots menu button */}
          <View style={{ marginLeft: "auto" }}>
            <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
              <MaterialCommunityIcons name="dots-vertical" size={28} color="black" />
            </TouchableOpacity>

            {/* Dropdown menu */}
            {menuVisible && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    Alert.alert("Restore", `Restore ${selectedNotes.length} note(s)?`);
                  }}
                >
                  <MaterialCommunityIcons name="restore" size={22} color="black" />
                  <Text style={styles.menuText}>Restore</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    Alert.alert("Delete Permanently", `Delete ${selectedNotes.length} note(s)?`);
                  }}
                >
                  <MaterialCommunityIcons name="delete-forever" size={22} color="black" />
                  <Text style={styles.menuText}>Delete Permanently</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}

      <FlatList
        data={deletedNotes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => renderNote(item)}
        ListHeaderComponent={
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
            Deleted History
          </Text>
        }
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toplayout: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 3,
    backgroundColor: "#fff",   
    },
  iconButton: {
    backgroundColor: "#b7b7b7",
    borderRadius: 9,
    height: 50,
    width: 50,
    padding: 8,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    left: 230,
  },
  note: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    height: 200,
    maxWidth: "45%",
  },
  notetitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    padding: 10 
  },
  notecontent: { 
    padding: 10, 
    fontWeight: "400", 
    color: "#333" 
  },
  selectionBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#f1f1f1",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectionCount: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
  dropdownMenu: {
    position: "absolute",
    top: 35,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    paddingVertical: 5,
    zIndex: 10,
    minWidth: 180,
    alignSelf: "flex-end",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
