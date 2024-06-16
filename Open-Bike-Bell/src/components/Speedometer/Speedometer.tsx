import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
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

  // Request permissions right after starting the app
  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();
      if (foreground.granted)
        await Location.requestBackgroundPermissionsAsync();
    };
    requestPermissions();
    const subForeground = async () => {
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
    subForeground();
  }, []);

  // Start location tracking in foregroun

  // Stop location tracking in foreground
  const stopForegroundUpdate = () => {
    foregroundSubscription?.remove();
    setPosition(undefined);
  };

  // Start location tracking in background
  const startBackgroundUpdate = async () => {
    // Don't track position if permission is not granted
    const { granted } = await Location.getBackgroundPermissionsAsync();
    if (!granted) {
      console.log("location tracking denied");
      return;
    }

    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME);
    if (!isTaskDefined) {
      console.log("Task is not defined");
      return;
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    );
    if (hasStarted) {
      console.log("Already started");
      return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      // For better logs, we set the accuracy to the most sensitive option
      accuracy: Location.Accuracy.BestForNavigation,
      // Make sure to enable this notification if you want to consistently track in the background
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Location",
        notificationBody: "Location tracking in background",
        notificationColor: "#fff",
      },
    });
  };

  // Stop location tracking in background
  const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    );
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      console.log("Location tacking stopped");
    }
  };

  return (
    <View style={styles.container}>
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
          Altitude: {position?.coords.altitude}
        </Text>
      </View>
    </View>
  );
}
