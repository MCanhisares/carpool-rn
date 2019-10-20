import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import Button from '../../components/Button';


export default function RideFinishedScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.textCenter}>Ride finished successfully!</Text>
      <Button
        style={styles.button}
        caption="Start another ride"
        onPress={() =>
          props.navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: 'Home',
                }),
              ],
            }),
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  illustration: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginTop: 24,
  },
  textCenter: {
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
    alignSelf: 'stretch',
  },
});

RideFinishedScreen.navigationOptions = () => ({
  header: null,
});
