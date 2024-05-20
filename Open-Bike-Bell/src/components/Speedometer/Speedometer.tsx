import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";

const Speedometer = () => {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const speed = await Location.getCurrentPositionAsync();
      if (speed.coords.speed) setSpeed(speed.coords.speed);
    })();
  }, []);
  return (
    <View>
      <Text>
        Current Speed: {speed ? `${speed.toFixed(2)} km/h` : "Calculating..."}
      </Text>
    </View>
  );
};

export default Speedometer;
