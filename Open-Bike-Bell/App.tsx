import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Bell from "./src/components/bell/Bell";
import React, { useState } from "react";
import Compass from "./src/components/compass/Compass";
import { Col, Grid, Row } from "react-native-easy-grid";
import Speedometer from "./src/components/Speedometer/Speedometer";

export default function App() {
  return (
    <Grid style={styles.container}>
      <Row>
        <Compass />
      </Row>
      <Row>
        <Bell />
      </Row>
      <Row>
        <Speedometer />
      </Row>
    </Grid>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
