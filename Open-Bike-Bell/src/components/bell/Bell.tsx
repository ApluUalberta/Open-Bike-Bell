import React, { useState } from 'react'
import { Button } from 'react-native'
import {Audio} from "expo-av";

const Bell = () => { 

    const [sound, setSound] = useState<Audio.Sound>();

    const playSound = async () => {
    const {sound} = await Audio.Sound.createAsync(require('./../../../assets/bell/default.mp3'));
    setSound(sound);
    await sound.playAsync();
  }
  return (<Button title={"Ring riing"} onPress={playSound}></Button>);
}

export default Bell;