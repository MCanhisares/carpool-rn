import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import RNLocation from 'react-native-location';

import {  Button } from '../../components';

export default function HomeScreen(props) {
  
  useEffect(() => {
    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
        rationale: {
          title: 'We need to access your location to finish your carpool trip',
          message: '',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      },
    });
    RNLocation.configure({ distanceFilter: 0 });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.row}>
          <Button
            style={styles.button}
            primary
            caption="Driver"
            onPress={() => props.navigation.navigate("Driver")}
          />
          <Button
            style={styles.button}
            primary
            caption="Passenger"
            onPress={() => props.navigation.navigate("Passenger")}
          />
        </View>
      </ImageBackground>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
  }
  
});
