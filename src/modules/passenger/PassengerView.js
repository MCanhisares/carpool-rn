import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNLocation from 'react-native-location';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { StackActions, NavigationActions } from 'react-navigation';

import { scanPassenger } from '../../api';
import { ROLES } from '../../api/constants';

export default function PassengerScreen(props) {
  const onQrCode = async e => {
    const location = await RNLocation.getLatestLocation({ timeout: 60000 });
    const position = `${location.latitude},${location.longitude}`;
    const response = await scanPassenger(e.data, position);
    const {
      id,
      driverPosition,
      passengerPosition,
      distance,
    } = await response.json();

    props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'ShareLocation',
            params: {
              role: ROLES.PASSENGER,
              driverPosition,
              passengerPosition,
              distance,
              rideId: id,
            },
          }),
        ],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner onRead={onQrCode} />
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
  },
});
