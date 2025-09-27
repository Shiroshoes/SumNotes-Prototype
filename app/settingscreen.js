import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Switch, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

function SettingsScreen({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => setIsDarkMode(prev => !prev);

  const themeStyles = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <View style={[styles.toplayout, { backgroundColor: isDarkMode ? '#1e1e1e' : '#f1f1f1' }]}>     
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: isDarkMode ? '#313131' : '#b7b7b7' }]} onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="dots-horizontal" size={35} color={isDarkMode ? "#eaeaea" : "#000"} />
        </TouchableOpacity>

        <TextInput
          style={[styles.searchBar, { backgroundColor: isDarkMode ? '#313131' : '#b7b7b7', color: isDarkMode ? '#eaeaea' : '#000' }]}
          placeholder="Search"
          placeholderTextColor={isDarkMode ? "#aaa" : "#555"}
        />

        <TouchableOpacity style={[styles.iconButton, { backgroundColor: isDarkMode ? '#313131' : '#b7b7b7' }]}>
          <Ionicons name="search" size={30} color={isDarkMode ? "#eaeaea" : "#000"} />
        </TouchableOpacity>

        <Image source={require("../assets/sumnotes.png")} style={styles.logo} />
      </View>

      <View>
        <View style={{
          backgroundColor: isDarkMode ? "#585757" : "#a0a0a0",
          height: 3,
          marginHorizontal: 5,
          borderRadius: 2
        }} />
      </View>

      <Text style={[styles.heading, themeStyles.text]}>Settings</Text>

      {/* Dark Mode Switch */}
      <View style={styles.switchContainer}>
          <Text style={[styles.switchText, themeStyles.text]}>
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#81b0ff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDarkMode}
        />
      </View>

      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </SafeAreaView>
  );
}

const lightTheme = StyleSheet.create({
  container: { backgroundColor: '#f1f1f1' },
  text: { color: '#000' },
   card: { backgroundColor: '#fff' },
  divider: { backgroundColor: '#a0a0a0' },
  input: { backgroundColor: '#b7b7b7', color: '#000' },
  button: { backgroundColor: '#b7b7b7' },
});

const darkTheme = StyleSheet.create({
  container: { backgroundColor: '#121212' },
  text: { color: '#eaeaea' },
    card: { backgroundColor: '#1e1e1e' },
  divider: { backgroundColor: '#585757' },
  input: { backgroundColor: '#313131', color: '#eaeaea' },
  button: { backgroundColor: '#313131' },
});

export default SettingsScreen;

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
  },
  iconButton: {
    borderRadius: 9,
    height: 50,
    width: 50,
    padding: 8,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    flex: 1,                   
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 50,
    marginRight: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  heading: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    padding: 10 
  },
  switchContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15, 
  },
  switchText: { 
    fontSize: 18,
    fontWeight: 'bold',
  },
});
