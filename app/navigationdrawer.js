import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CustomDrawer({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>SumNotes Menu</Text>

      {/* Pinned Notes */}
      <Text style={styles.sectionTitle}>Pinned Notes</Text>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('PinnedNotes')}
      >
        <MaterialCommunityIcons name="pin" size={20} />
        <Text style={styles.itemText}>Pinned Notes</Text>
      </TouchableOpacity>

      {/* Unpinned Notes */}
      <Text style={styles.sectionTitle}>Unpinned Notes</Text>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('UnpinnedNotes')}
      >
        <MaterialCommunityIcons name="note-outline" size={20} />
        <Text style={styles.itemText}>Unpinned Notes</Text>
      </TouchableOpacity>

      {/* Settings */}
      <Text style={styles.sectionTitle}>Other</Text>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Settings')}
      >
        <MaterialCommunityIcons name="cog-outline" size={20} />
        <Text style={styles.itemText}>Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
