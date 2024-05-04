import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Bell from "./src/components/bell/Bell";
import React, { useState } from 'react';
import Compass from './src/components/compass/Compass';


export default function App() {

  return (
    <View style={styles.container}>
      <Bell/>
      <Compass/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
