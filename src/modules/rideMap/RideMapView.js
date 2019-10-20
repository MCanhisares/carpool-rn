import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StackActions, NavigationActions } from 'react-navigation';

import Button from '../../components/Button';
import { ROLES } from '../../api/constants';
import { confirmDriver, confirmPassenger } from '../../api';

export default function RideMapScreen(props) {
  const role = props.navigation.getParam('role', '');
  const rideId = props.navigation.getParam('rideId', '');
  const driverPosition = props.navigation.getParam('driverLoc', '');
  const passengerPosition = props.navigation.getParam('passengerLoc', '');
  const distance = props.navigation.getParam('distance', '');

  const driverLatLng = {
    latitude: parseFloat(driverPosition.split(',')[0]),
    longitude: parseFloat(driverPosition.split(',')[1]),
  };

  const passengerLatLng = {
    latitude: parseFloat(passengerPosition.split(',')[0]),
    longitude: parseFloat(passengerPosition.split(',')[1]),
  };

  const onContinue = async () => {
    if (role === ROLES.DRIVER) {
      await confirmDriver(rideId);
    } else {
      await confirmPassenger(rideId);
    }

    props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'RideFinished',
          }),
        ],
      }),
    );
  };

  return (
    <View style={styles.container}>
      {role === ROLES.PASSENGER && (
        <>
          <Text style={styles.textCenter}>Your ride id is</Text>
          <Text size="h6" style={styles.textCenter}>
            {rideId}
          </Text>
        </>
      )}
      <Text size="h5" style={styles.textCenter}>
        Your {role === ROLES.DRIVER ? 'passenger' : 'driver'} is
      </Text>
      <Text size="h6" style={styles.textCenter}>
        {distance} km away
      </Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            ...(role === ROLES.DRIVER ? driverLatLng : passengerLatLng),
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            coordinate={{
              latitude: driverLatLng.latitude,
              longitude: driverLatLng.longitude,
              latitudeDelta: 0,
              longitudeDelta: 0,
            }}
            title={
              role === ROLES.DRIVER ? 'You are here' : 'Your driver is here'
            }
          />
          <Marker
            coordinate={{
              latitude: passengerLatLng.latitude,
              longitude: passengerLatLng.longitude,
              latitudeDelta: 0,
              longitudeDelta: 0,
            }}
            title={
              role === ROLES.PASSENGER
                ? 'You are here'
                : 'Your passenger is here'
            }
          />
        </MapView>
      </View>
      <Button style={styles.button} caption="Finish ride" onPress={onContinue} />
      <View style={styles.buttonSubtitle}>
        <Text>
          {role === ROLES.DRIVER
            ? 'When you drop off your passenger, finish the ride!'
            : 'When you arrive at your destination, finish the ride!'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  mapContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 8,
    marginTop: 24,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
  },
  textCenter: {
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
  },
  buttonSubtitle: {
    textAlign: 'center',
    marginTop: 8,
  },
});

RideMapScreen.navigationOptions = () => ({
  header: null,
});
