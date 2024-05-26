import React from "react";
import { Grid, Row } from "react-native-easy-grid";
import { styles } from "./src/common/styles";
import Compass from "./src/components/compass/Compass";

export default function App() {
  return (
    <Grid style={styles.container}>
      <Row>
        <Compass />
      </Row>
      {/* <Row>
        <Speedometer />
      </Row> */}
    </Grid>
  );
}
