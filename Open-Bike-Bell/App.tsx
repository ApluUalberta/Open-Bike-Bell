import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import {Audio} from "expo-av";
import { useState } from 'react';


export default function App() {
  const [sound, setSound] = useState<Audio.Sound>();

  const playSound = async () => {
    console.log(" playing the sound");
    const {sound} = await Audio.Sound.createAsync(require('./assets/bell/default.mp3'));
    setSound(sound);
    await sound.playAsync();
  }


  return (
    <View style={styles.container}>
      <Button title={"Bell"} onPress={playSound}></Button>
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
