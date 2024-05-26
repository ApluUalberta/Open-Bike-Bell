import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { styles } from "../../common/styles";

const Speedometer = () => {
  const [speed, setSpeed] = useState(0);
  const [altitudeDelta, setAltitudeDelta] = useState(0);

  const updateSpeedAndAltitude = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    if (location.coords.speed !== null) {
      console.log(location);

      setSpeed(location.coords.speed);
    }
    if (location.coords.altitude) {
      const altDelta = location.coords.altitude - altitudeDelta;
      setAltitudeDelta(altDelta);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      updateSpeedAndAltitude();
    }, 250);
  }, [altitudeDelta, speed]);
  return (
    <View>
      <Text style={styles.text}>
        Current Speed:
        {speed !== null ? `${speed.toFixed(2)} km/h` : "Calculating"}
      </Text>
      <Text style={styles.text}>
        Current Altitude:
        {altitudeDelta}
      </Text>
      {/* <Button title={`${speed.toFixed(2)} km/h`} />
      <Button title={`${altitudeDelta} Degrees`} /> */}
    </View>
  );
};

export default Speedometer;
