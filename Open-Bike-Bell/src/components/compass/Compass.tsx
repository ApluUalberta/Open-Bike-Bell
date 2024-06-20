import { Magnetometer } from "expo-sensors";
import { Subscription } from "expo-sensors/build/DeviceSensor";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, View } from "react-native";
import { styles } from "../../common/styles";
import Bell from "../bell/Bell";
import LPF from "lpf";
import { oneEightyPi, twoPi } from "../../../assets/compass/utils/utils";

const { height, width } = Dimensions.get("window");
const Compass = () => {
  Magnetometer.setUpdateInterval(8.3);
  const [headingAngle, setHeadingAngle] = useState(0);

  const [subscription, setSubscription] = useState<Subscription>();

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((result) => {
        setCompassHeading(result.x, result.y);
      })
    );
  };
  const setCompassHeading = (magX: number, magY: number) => {
    // Convert magnetic field readings from microteslas to Gauss
    // 1 microtesla = 0.0001 Gauss

    // Calculate the heading in radians

    // Convert to degrees from radians

    let angle = 0;
    const headingRad = Math.atan2(magY, magX);
    if (headingRad >= 0) {
      angle = headingRad * oneEightyPi;
    } else {
      angle = (headingRad + twoPi) * oneEightyPi;
    }

    setHeadingAngle(Math.round(LPF.next(angle)));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(undefined);
  };

  useEffect(() => {
    _subscribe();

    LPF.init([]);
    LPF.smoothing = 0.15;
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={{ padding: 2, alignItems: "center" }}>
          <Image
            source={require("./../../../assets/compass/compass_pointer.png")}
            style={{
              height: height / 26,
              resizeMode: "contain",
            }}
          />
        </View>
        <View
          style={{
            padding: 2,
          }}
        >
          <ImageBackground
            source={require("./../../../assets/compass/compass_bg.png")}
            style={{
              height: width - 80,
              width: width,
              justifyContent: "center",
              alignItems: "center",
              transform: [{ rotate: 360 - headingAngle + "deg" }],
            }}
            resizeMode="contain"
          >
            <Bell />
          </ImageBackground>
        </View>
      </View>
    </View>
  );
};

export default Compass;
