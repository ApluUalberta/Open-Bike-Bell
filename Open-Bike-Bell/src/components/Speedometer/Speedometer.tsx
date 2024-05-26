import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import * as Location from "expo-location";

const Speedometer = () => {
  const [speed, setSpeed] = useState(0);
  const [altitudeDelta, setAltitudeDelta] = useState(0);

  const updateSpeedAndAltitude = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Rejected");
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    if (location.coords.speed) setSpeed(location.coords.speed);
    if (location.coords.altitude) {
      const altDelta = location.coords.altitude - altitudeDelta;
      setAltitudeDelta(altDelta);
      console.log(altDelta);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      updateSpeedAndAltitude();
    }, 250);
  }, [altitudeDelta, speed]);
  return (
    <View>
      {/* <Text>
        Current Speed: {speed ? `${speed.toFixed(2)} km/h` : "Calculating..."}
      </Text> */}
      <Button title={`${speed.toFixed(2)} km/h`} />
      <Button title={`${altitudeDelta} km/h`} />
    </View>
  );
};

export default Speedometer;
