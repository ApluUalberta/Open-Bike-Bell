import React, { useState } from 'react'
import {Audio} from "expo-av";
import { FAB } from 'react-native-paper';

const Bell = () => { 

    const [sound, setSound] = useState<Audio.Sound>();

    const playSound = async () => {
    const {sound} = await Audio.Sound.createAsync(require('./../../../assets/bell/default.mp3'));
    setSound(sound);
    await sound.playAsync();
  }
  return (<FAB onPress={playSound}
    style={{
      borderRadius: 4
    }}
  icon={{source: "./../../../assets/bell/Bell.png", direction: "auto"}}></FAB>);
}

export default Bell;