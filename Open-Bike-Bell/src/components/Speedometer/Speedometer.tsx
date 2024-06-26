import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { styles } from "../../common/styles";
import Compass from "../compass/Compass";

const LOCATION_TASK_NAME = "LOCATION_TASK_NAME";
let foregroundSubscription: Location.LocationSubscription | null = null;

// Define the background task for location tracking
TaskManager.defineTask(
  LOCATION_TASK_NAME,
  async ({
    data,
    error,
  }: {
    data: { locations: LocationObject[] };
    error: any;
  }) => {
    if (error) {
      console.error(error);
      return;
    }
    if (data) {
      // Extract location coordinates from data
      const location = data.locations[0];
      if (location) {
        console.log("Location in background", location.coords);
      }
    }
  }
);

export default function App() {
  // Define position state: {latitude: number, longitude: number}
  const [position, setPosition] = useState<Location.LocationObject>();

  const requestPermissions = async () => {
    const foreground = await Location.requestForegroundPermissionsAsync();
    if (foreground.granted) await Location.requestBackgroundPermissionsAsync();
  };
  const startForegroundUpdate = async () => {
    // Check if foreground permission is granted
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      console.log("location tracking denied");
      return;
    }

    // Make sure that foreground location tracking is not running
    foregroundSubscription?.remove();

    // Start watching position in real-time
    foregroundSubscription = await Location.watchPositionAsync(
      {
        // For better logs, we set the accuracy to the most sensitive option
        accuracy: Location.Accuracy.BestForNavigation,
      },
      (location) => {
        setPosition(location);
      }
    );
  };
  // Request permissions right after starting the app
  useEffect(() => {
    requestPermissions();
  }, []);
  return (
    <View style={styles.container}>
      <Button title="dfdfdf" onPress={() => startForegroundUpdate()} />
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 64 }}>
          {position?.coords.speed
            ? Math.round(position?.coords.speed * 3.6)
            : "-"}{" "}
        </Text>
        <Text style={{ color: "#fff", fontSize: 24 }}>Km/hr</Text>
      </View>
      <Compass />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>
          {position ? position?.coords.altitude : "-"} m
        </Text>
      </View>
    </View>
  );
}
