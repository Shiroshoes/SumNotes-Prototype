import { StyleSheet, Text, TouchableHighlight, View, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useRef } from 'react';

const Welcome = ({ onContinue }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current; // initial opacity 1

  const handlePress = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onContinue();
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.newfont}>Welcome To SumNotes</Text>

      <TouchableHighlight
        underlayColor="lightblue"
        style={styles.buttonwelcome}
        onPress={handlePress} 
      >
        <View>
          <Text style={styles.start}>Get Started</Text>
        </View>
      </TouchableHighlight>

      <StatusBar style="auto" />
    </Animated.View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newfont: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
    color: 'black',
  },
  buttonwelcome: {
    alignItems: 'center',
    backgroundColor: '#67b1b6ff',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    width: 200,
    height: 70,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  start: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
