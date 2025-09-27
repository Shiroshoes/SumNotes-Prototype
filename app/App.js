import React, { useEffect, useState } from "react";
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text, ScrollView, TouchableHighlight, FlatList, Alert, Pressable} from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { NavigationContainer, useRoute, TabRouter } from "@react-navigation/native";
import deletedscreen from "./deletedscreen";
import settingscreen from "./settingscreen";
import Addnotescreen from "./addnotescreen";
import aboutUs from "./aboutUs";
import Animated, { Easing, Extrapolation, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withSpring, withTiming, runOnJS } from 'react-native-reanimated';


const Drawer = createDrawerNavigator();

// This is the main screen that shows notes
function main({ navigation }) {
  const [type, setType] = useState('first');
  const noteadd = useSharedValue(30);
  const noteaddwidth = useSharedValue(60);
  const isOpen = useSharedValue(false);
  const progress = useDerivedValue(() => isOpen.value ? withTiming(1) : withTiming(0),);
  const [showButton, setShowButton] = useState(false);

  const handlePress = () => {
    const config = {
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
      duration: 500,
    };

    if (isOpen.value) {
      noteaddwidth.value = withTiming(60, { duration: 200 });
      noteadd.value = withDelay(210, withTiming(30, config, (finish) => {
        if (finish) {
          runOnJS(setShowButton)(false);
        }
      }));
    } else {
      runOnJS(setShowButton)(true);
      noteadd.value = withDelay(200, withSpring(140));
      noteaddwidth.value = withDelay(500, withSpring(200));
    }
    isOpen.value = !isOpen.value;
  };

  const Notedaddwidth = useAnimatedStyle(() => {
    return {
      width: noteaddwidth.value,
    };
  });

  const Notedadd = useAnimatedStyle(() => {
    const scale = interpolate(
      noteadd.value,
      [30, 140],
      [0.2, 1],
      Extrapolation.CLAMP
    )
    return {
      bottom: noteadd.value,
      width: 80,
      height: 80,
      borderRadius: 50,
      transform: [{scale: scale}],
    };
  });

  const plusIcon = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${progress.value * 45}deg`}],
    };
  });


  const [pinnedNotes, setPinnedNotes] = useState([
    { id: "1", title: "Shopping List", content: "Milk, Eggs, Bread" },
    { id: "4", title: "Gunpla", content: "Granpa HG or RG"},
    { id: "5", title: "Adobo", content: "Suka, vinegar..."},
  ]);
  const [unpinnedNotes, setUnpinnedNotes] = useState([
    { id: "2", title: "Homework", content: "Math page 24" },
    { id: "3", title: "Ideas", content: "Build a notes app" },
    { id: "6", title: "New Notes", content: "Blank Notes"},
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

  const renderNote = (item) => (
    <TouchableHighlight
      underlayColor="#c7c7c7ff"
      style={[
        styles.note,
        selectedNotes.includes(item.id) && {
          backgroundColor: "#a6d1f2",
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
          Alert.alert(`${item.title} Notes`, `${item.content}`, [
            { text: "Back" },
          ]);
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

          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            placeholderTextColor="#555"
          />

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={30} color="black" />
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
                <TouchableOpacity style={styles.menuItem}>
                  <MaterialCommunityIcons name="delete" size={22} color="black" />
                  <Text style={styles.menuText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                  <MaterialCommunityIcons name="share-variant" size={22} color="black" />
                  <Text style={styles.menuText}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                  <MaterialCommunityIcons name="pin" size={22} color="black" />
                  <Text style={styles.menuText}>Pin</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                  <MaterialCommunityIcons name="pin-off" size={22} color="black" />
                  <Text style={styles.menuText}>Unpin</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}


      <ScrollView style={styles.container}>
        <Text style={styles.fon}>Pinned Notes</Text>
        <FlatList
          data={pinnedNotes}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          renderItem={({ item }) => renderNote(item)}
        />

        <View
          style={{
            height: 3,
            backgroundColor: "#585757ff",
            marginVertical: 10,
            marginHorizontal: 5,
            borderRadius: 2,
          }}
        />

        <Text style={styles.fon}>Unpinned Notes</Text>
        <FlatList
          data={unpinnedNotes}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          renderItem={({ item }) => renderNote(item)}
        />
      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.buttonContainer}>
        {showButton && (
          <TouchableHighlight
            onPress={() => {
              navigation.navigate("Addnotescreen");
              handlePress();
            }}
            hitSlop={200}
          >
            <Animated.View
              style={[styles.contentContainer, Notedadd, Notedaddwidth]}
            >
              <View style={styles.iconContainer}>
                <MaterialIcons name="note-add" size={30} color={"white"} />
              </View>
              <Text style={styles.text}>Add Notes</Text>
            </Animated.View>
          </TouchableHighlight>
        )}

        <Pressable
          style={styles.contentContainer}
          onPress={() => {
            handlePress();
          }}
        >
          <Animated.View style={[styles.iconContainer, plusIcon]}>
            <Image
              source={require("../assets/PlusIcon.png")}
              style={styles.icon}
            />
          </Animated.View>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

//this is the custom drawer content
const CustomDrawerContent = (props) => {
  const { state, navigation } = props;

  const currentIndex = state.index; // index of active screen
  const currentScreen = state.routeNames[currentIndex];

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerheaderpanel}>
        <Text style={styles.fontdrawer}>SumNotes</Text>
      </View>

      <DrawerItem icon={({ color, size }) => (  <MaterialCommunityIcons name="note-outline" size={size} color={currentScreen === "Notes" ? "#fff" : "#000"} 
        style={styles.icondrawer}/> )} 
        label="Notes"
        labelStyle={[styles.labeling, {color: currentScreen === "Notes" ? "#fff" : "#000"}]} 
        onPress={() => props.navigation.navigate("Notes")}
        style={[styles.backgrounddrawer, 
          {backgroundColor: currentScreen === "Notes" ? "#3896b3" : "#f1f1f1ff", 
           borderRadius: 10,     
           elevation: currentScreen === "Notes" ? 3 : 0,
           shadowColor: currentScreen === "Notes" ? "#000" : "transparent",
           shadowOpacity: currentScreen === "Notes" ? 0.3 : 0,
           shadowOffset: { width: 0, height: 2 },
           shadowRadius: 3,}]} />


      <DrawerItem icon={({ color, size }) => (  <MaterialCommunityIcons name="delete-outline" size={size} color={currentScreen === "Deleted History" ? "#fff" : "#000"} 
        style={styles.icondrawer}/> )} 
        label="Deleted History"
        labelStyle={[styles.labeling, {color: currentScreen === "Deleted History" ? "#fff" : "#000"}]} 
        onPress={() => props.navigation.navigate("Deleted History")} 
        style={[styles.backgrounddrawer, 
          {backgroundColor: currentScreen === "Deleted History" ? "#3896b3" : "#f1f1f1ff", 
           borderRadius: 10,     
           elevation: currentScreen === "Deleted History" ? 3 : 0,
           shadowColor: currentScreen === "Deleted History" ? "#000" : "transparent",
           shadowOpacity: currentScreen === "Deleted History" ? 0.3 : 0,
           shadowOffset: { width: 0, height: 2 },
           shadowRadius: 3,}]} />


      <DrawerItem icon={({ color, size }) => (  <MaterialCommunityIcons name="cog-outline" size={size} color={currentScreen === "Settings" ? "#fff" : "#000"} 
        style={styles.icondrawer}/> )} 
        label="Settings" 
        labelStyle={[styles.labeling, {color: currentScreen === "Settings" ? "#fff" : "#000"}]}
        onPress={() => props.navigation.navigate("Settings")} 
        style={[styles.backgrounddrawer, 
          {backgroundColor: currentScreen === "Settings" ? "#3896b3" : "#f1f1f1ff", 
           borderRadius: 10,     
           elevation: currentScreen === "Settings" ? 3 : 0,
           shadowColor: currentScreen === "Settings" ? "#000" : "transparent",
           shadowOpacity: currentScreen === "Settings" ? 0.3 : 0,
           shadowOffset: { width: 0, height: 2 },
           shadowRadius: 3,}]} />
      
      <DrawerItem icon={({ color, size }) => (  <AntDesign name="info-circle" size={24} color={ currentScreen === "About" ? "#fff" : "#000"} 
        style={styles.icondrawer}/> )} 
        label="About" 
        labelStyle={[styles.labeling, {color: currentScreen === "About" ? "#fff" : "#000"}]}
        onPress={() => props.navigation.navigate("About")} 
        style={[styles.backgrounddrawer, 
          {backgroundColor: currentScreen === "About" ? "#3896b3" : "#f1f1f1ff", 
           borderRadius: 10,     
           elevation: currentScreen === "About" ? 3 : 0,
           shadowColor: currentScreen === "About" ? "#000" : "transparent",
           shadowOpacity: currentScreen === "About" ? 0.3 : 0,
           shadowOffset: { width: 0, height: 2 },
           shadowRadius: 3,}]} />
    </DrawerContentScrollView>
  );
  
}


// App component with Drawer navigator
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Notes" screenOptions={{ headerShown: false, drawerStyle: {width: 250, elevation: 2, shadowColor: "#000", shadowOpacity: 0.3, shadowOffset: {width: 0, height: 2}, shadowRadius: 3,},}} drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Notes" component={main} options={{ headerShown: false }} />
        <Drawer.Screen name="Deleted History" component={deletedscreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="Settings" component={settingscreen} options={{ headerShown: false }}/>
        <Drawer.Screen name= "About" component={aboutUs} options={{ headerShown: false }}/>
        <Drawer.Screen name="Addnotescreen" component={Addnotescreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


// Styles or like a CSS
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
  searchBar: {
    flex: 1,                   
    backgroundColor: "#b7b7b7",
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 50,
    marginRight: 10,
    color: "black",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  fon: {
    fontSize: 24,
    fontWeight: "bold",
    alignItems: "left",
    padding: 10,
    color: "black",
  },
  note: {
    flex: 1,
    borderBlockColor: "#313131ff",
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 250,
    maxWidth: "45%",
  },
  notetitle: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    color: "black",
  },
  notecontent: {
    padding: 10,
    color: "black",
    fontWeight: "heavy"
  },
  fab: {
    position: "absolute",
    bottom: 50,
    right: 20,
    backgroundColor: "#3896b3",
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    fixed: true,
  },
  labeling: {
    fontSize: 18,
    marginLeft: -5,
  },
  icondrawer: {
    marginLeft: -5,
  },
  fontdrawer: {
    fontSize: 24, 
    fontWeight: "bold", 
    alignItems: "left", 
    padding: 10, 
    color: "black"
  },
  drawerheaderpanel: { 
    borderBottomWidth: 2, 
    borderBottomColor: "#ccc", 
    marginBottom: 10 
  },
  backgrounddrawer: { 
    marginVertical: 5, 
  },
  contentContainer: {
    backgroundColor: "#3896b3",
    position: "absolute",
    bottom: 40,
    right: 20,
    borderRadius: 50,
    elevation: 5, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    flexDirection: 'row',
    alignItems: "center",
    overflow: 'hidden',
    fixed: true,
  },
  iconContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 26,
    height: 26,
  },
  text: {
    color: "white",
    fontSize: 18,
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
    color: "black",
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
    minWidth: 150,
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
    color: "black",
  },
});
