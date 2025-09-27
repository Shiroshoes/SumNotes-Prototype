import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TextInput, Image, Button, Pressable } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component, useState } from 'react'
import Addnotescreen from './addnotescreen';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

function aboutUs ({navigation}) {

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

    <ScrollView>
      <Text style={{ fontSize: 20, fontWeight: "bold", padding: 10, color: "black" }}>About Us</Text>

      <View style={styles.about}>
        <Text style={{fontSize: 20, fontWeight: "bold"}}>
          SumNotes
        </Text>
        <View>
          <Image source={require("../assets/Group5.png")} style={styles.GroupPhoto}/>
          <Text style={{textAlign: "center", marginBottom: 20, fontSize: 16, fontWeight: "bold"}}>Group 5 - Software Engineer Final Project</Text>
        </View>

        <Text style={styles.textp}>
            {"\t"} Welcome to SumNotes! This app was created to help you organize your notes efficiently and effectively with additional feature of AI summarizer.
        </Text>

        <Text style={styles.textp}>
          {"\t"} Our goal is to provide a simple and user-friendly experience for students and professionals alike. Thank you for choosing SumNotes!
        </Text>

        <Image source={require("../assets/summarize.png")} style={styles.sumphoto}/>
      </View>
    </ScrollView>

    <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default aboutUs

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
  about: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  GroupPhoto: {
    width: 300,
    height: 200,
    borderRadius: 30,
  },
  textp: {
    textAlign: "justify", 
    fontFamily: "Arial", 
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 10,
  },
  sumphoto: {
    width: 200,
    height: 300,
    borderRadius: 30,
  },
})