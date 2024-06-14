import React from "react";
import { Grid, Row } from "react-native-easy-grid";
import { styles } from "./src/common/styles";
import Compass from "./src/components/compass/Compass";
import Speedometer from "./src/components/Speedometer/Speedometer";

export default function App() {
  return (
    <Grid style={styles.theme}>
      <Row>
        <Speedometer />
      </Row>
    </Grid>
  );
}
