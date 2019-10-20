import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import { fonts, colors } from '../../styles';
import { Button } from '../../components';
import { fetchRide } from '../../api';
import { ROLES } from '../../api/constants';

export default function DriverScreen(props) {
  const onPress = async () => {
    const { id } = props.data;
    const response = await fetchRide(id);
    const { driverLoc, passengerLoc, distance } = await response.json();

    if (!passengerLoc) {
      Alert.alert(
        'Hey!',
        'Your passenger has not yet scanned this barcode!',
        [{ text: 'OK' }],
        { cancelable: true },
      );
    } else if (distance && distance >= 10) {
      Alert.alert(
        'Hey!',
        'You and your passenger need to be close to each other to start carpooling!',
        [{ text: 'OK' }],
        { cancelable: true },
      );
    } else {
      props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'RideMap',
              params: {
                role: ROLES.DRIVER,
                driverLoc,
                passengerLoc,
                distance,
                rideId: id,
              },
            }),
          ],
        }),
      );
    }
  };

  if (props.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {props.data ? (
        <>
          <Text style={styles.title}>Show this to your passenger</Text>
          <Image
            source={{ uri: props.data.qrCode }}
            style={styles.qrCode}
          />
          <Text style={styles.driverId}>Your ride id is:</Text>
          <Text style={styles.textAccent}>{props.data.id}</Text>
          <Button caption="Continuar" style={styles.button} onPress={onPress} />
        </>
      ) : (
        <View style={styles.qrCode}>
          <Text style={styles.textError}>
            Oops! An error has occurred! Please try again!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    textAlign: 'center',
  },
  qrCode: {
    width: 300,
    height: 300,
    marginTop: 24,
  },
  driverId: {
    fontFamily: fonts.primaryRegular,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 24,
  },
  textAccent: {
    color: colors.primary,
    fontFamily: fonts.primaryBold,
    fontSize: 30,
    textAlign: 'center',
  },
  textError: {
    color: colors.error,
    fontFamily: fonts.primaryRegular,
    fontSize: 30,
    textAlign: 'center',
  },
  headerLeft: {
    marginLeft: 8,
  },
  headerRight: {
    paddingRight: 8,
  },
  button: {
    marginTop: 24,
    alignSelf: 'stretch',
  },
});
