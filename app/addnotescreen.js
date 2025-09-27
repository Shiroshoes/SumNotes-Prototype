import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { Animated, Easing } from 'react-native';


const Drawer = createDrawerNavigator();

function addnotescreen ({navigation}) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const [isPinned, setIsPinned] = useState(false);
  const rotation = useState(new Animated.Value(0))[0];

  const handlePin = () => {
    setIsPinned(!isPinned);

    Animated.timing(rotation, {
      toValue: isPinned ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleBack = () => {
    Alert.alert(
      "Save Note",
      "Do you want to save the note?",
      [
        {
          text: "Yes",
          onPress: () => {

            console.log("Note saved:", { title, note });
  
            navigation.navigate("Notes");
          }
        },
        {
          text: "No",
          style: "cancel",
          onPress: () => navigation.navigate("Notes")
        },
        {
          text: "Cancel",
        }
      ]
    );
  };

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
      
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>

        {/*back button jeong to*/}
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={40} color="black"/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconpin} onPress={handlePin}>
          <Animated.View style={{
              transform: [{
                rotate: rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '-45deg']
                })
              }]
            }}>
            <AntDesign name="pushpin" size={30} color={isPinned ? "black" : "#ffffffff"} />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconSummarizeAI} onPress={() => {Alert.alert("Summarize Result");}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
            Summarize AI
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput style={styles.input} placeholder='Title'/>

      <View style={{ height: 2, backgroundColor: "#ccc", marginHorizontal: 20, borderRadius: 2}} />

      <ScrollView>
        <TextInput
          style={{ fontSize: 18, padding: 20, color: 'black' }}
          placeholder="Start typing your note..."
          multiline
        />
      </ScrollView>

      <View style={styles.bottomlayout}>
        <TouchableOpacity style={styles.iconsave} onPress={() => {Alert.alert("Notes Save", "This is a testing DB should be used");}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Save
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icontrash}>
          <MaterialCommunityIcons name="delete-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default addnotescreen;

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
    marginLeft: "68%",
  },
  iconpin: {
    backgroundColor: "#b7b7b7",
    borderRadius: 9,
    height: 50,
    width: 50,
    padding: 8,
    marginLeft: "25%",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  iconSummarizeAI: {
    backgroundColor: "#b7b7b7",
    borderRadius: 9,
    height: 50,
    width: 150,
    padding: 8,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  
},
  input: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 20,
    color: 'black',
  },
  iconsave: {
    backgroundColor: "#b7b7b7",
    borderRadius: 20,
    height: 50,
    width: 100,
    padding: 8,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    fixed: "bottom",
  },
  icontrash: {
    backgroundColor: "#b7b7b7",
    borderRadius: 9,
    height: 50,
    width: 50,
    padding: 8,
    marginLeft: "40%",
    justifyContent: "center",
    alignItems: "center",
    fixed: "bottom",
  },
  bottomlayout: {
    flexDirection: "row",
    alignItems: "center",
  },
})