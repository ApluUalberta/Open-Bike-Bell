import React, { useState } from "react";
import { Audio } from "expo-av";
import { Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Bell = () => {
  const [sound, setSound] = useState<Audio.Sound>();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./../../../assets/bell/default.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };
  return (
    <TouchableOpacity onPress={playSound}>
      <Ionicons name="notifications" size={81} color="white" />
    </TouchableOpacity>
  );
  // <Button title={"Ring riing"} onPress={playSound}></Button>;
};

export default Bell;
