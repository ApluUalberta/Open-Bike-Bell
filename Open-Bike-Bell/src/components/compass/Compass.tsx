import React, { useEffect, useState } from 'react';
import { Magnetometer } from 'expo-sensors';
import LPF from "lpf";
import { View, Image, Text, Dimensions } from 'react-native';
import {Grid, Col, Row} from "react-native-easy-grid";
import { Subscription } from 'expo-sensors/build/DeviceSensor';

const { height, width } = Dimensions.get('window');
const Compass = () => {
    const [magnetometer, setMagnetometer] = useState(0);
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
      });

      const _subscribe = () => {
        setSubscription(
          Magnetometer.addListener(result => {
            setData(result);
            setMagnetometer(Math.atan2(result.y, result.x));
          })
        );
      };
    
      const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
      };

      useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
      }, []);
  const _degree = (magnetometer:number) => {
    return magnetometer - 90 >= 0
      ? magnetometer - 90
      : magnetometer + 271;
  };

  return (
    <Grid style={{backgroundColor: "black",
      rowGap: 2,
    }}>

        <Row style={{alignItems: "center"}} size={0.1}>
          <Col style={{alignItems: "center"}}>
            <View style={{width: width, alignItems: "center", bottom: 0}}>
              <Image
                source={require("./../../../assets/compass/compass_pointer.png")}
                style={{
                  height: height / 26,
                  resizeMode: "contain",
                }}
              />
            </View>
          </Col>
        </Row>

        <Row style={{alignItems: "center"}} size={2}>
          <Text
            style={{
              color: "#fff",
              fontSize: height / 27,
              width: width,
              position: "absolute",
              textAlign: "center",
            }}
          >
            {_degree(magnetometer)}
          </Text>

          <Col style={{alignItems: "center"}}>
            <Image
              source={require("./../../../assets/compass/compass_bg.png")}
              style={{
                height: width - 80,
                justifyContent: "center",
                alignItems: "center",
                resizeMode: "contain",
                transform: [
                  {rotate: 360 - magnetometer + "deg"},
                ],
              }}
            />
          </Col>
        </Row>
      </Grid>
  )
}

export default Compass