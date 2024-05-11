import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View , Image, Dimensions, ImageBackground} from 'react-native';
import { Magnetometer } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/DeviceSensor';
import Bell from '../bell/Bell';

const { height, width } = Dimensions.get('window');
const Compass = () => {
  Magnetometer.setUpdateInterval(8.3);
  const [headingAngle, setHeadingAngle] = useState(0) 

  const [subscription, setSubscription] = useState<Subscription>();

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener(result => {
        setCompassHeading(result.x, result.y);
      })
    );
  };
  const setCompassHeading = (magX: number, magY: number) => {
    // Convert magnetic field readings from microteslas to Gauss
    // 1 microtesla = 0.0001 Gauss
    var xGauss = magX * 0.0001;
    var yGauss = magY * 0.0001;

    // Calculate the heading in radians
    var headingRadians = Math.atan2(Math.floor(yGauss), Math.floor(xGauss));

    // Convert to degrees from radians
    var headingDegrees = headingRadians * (180 / Math.PI);

    // Adjust for a 0-360 degrees range
    if (headingDegrees < 0) {
        headingDegrees += 360;
    }
    setHeadingAngle(headingDegrees);
}

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(undefined);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style=
      {styles.container}>
      <View style={{ padding: 2, alignItems:"center"}}>
        <Image source={require('./../../../assets/compass/compass_pointer.png')}                
          style={{
            height: height / 26,
            resizeMode: "contain",
          }} 
        />
      </View>
      <View style={{transform:[{rotate: `${headingAngle.toString()} deg`}],  padding: 2}}>
        <ImageBackground source={require('./../../../assets/compass/compass_bg.png')}  style={{
                height: width - 80,
                justifyContent: "center",
                alignItems: "center",
              }} resizeMode='contain'>
              
        </ImageBackground>
        
        <Bell/>
      </View>
      </View>
    </View>
  );
}

export default Compass;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
});