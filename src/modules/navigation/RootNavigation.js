import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import { colors, fonts } from '../../styles';
import RoleToggler from '../../components/RoleToggler';
import HomeScreen from '../home/HomeViewContainer';
import DriverScreen from '../driver/DriverViewContainer';
import RideMapScreen from '../rideMap/RideMapViewContainer';
import RideFinishedScreen from '../rideFinished/RideFinishedViewContainer';
import { ROLES } from '../../api/constants';
import PassengerScreen from '../passenger/PassengerViewContainer';

const headerBackground = require('../../../assets/images/topBarBg.png');

const stackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: 'Carpool',
        headerLeft: null,
        headerBackground: (
          <Image
            style={{ flex: 1 }}
            source={headerBackground}
            resizeMode="cover"
          />
        ),
      }),
    },
    Driver: {
      screen: DriverScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Driver',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
        headerRight: (
          <View
            style={{
              paddingRight: 8,
            }}
          >
            <RoleToggler
              style={{
                paddingRight: 8,
              }}
              onPress={() => navigation.navigate('Passenger')}
              role={ROLES.PASSENGER}
            />
          </View>
        ),
      }),
    },
    Passenger: {
      screen: PassengerScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Passenger',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
        headerRight: (
          <View
            style={{
              paddingRight: 8,
            }}
          >
            <RoleToggler
              style={{
                paddingRight: 8,
              }}
              onPress={() => navigation.navigate('Driver')}
              role={ROLES.PASSENGER}
            />
          </View>
        ),
      }),
    },
    RideMap: {
      screen: RideMapScreen,
      navigationOptions: () => ({        
        header: null
      }),
    },
    RideFinished: {
      screen: RideFinishedScreen,
      navigationOptions: () => ({        
        header: null
      }),
    },
  },
  {
    defaultNavigationOptions: () => ({
      titleStyle: {
        fontFamily: fonts.primaryLight,
      },
      headerStyle: {
        backgroundColor: colors.primary,
        borderBottomWidth: 0,
      },
      headerBackground: (
        <Image
          style={{ flex: 1 }}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTitleStyle: {
        color: colors.white,
        fontFamily: fonts.primaryRegular,
      },
      headerTintColor: '#222222',
      headerLeft: props => (
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            paddingLeft: 25,
          }}
        >
          <Image
            source={require('../../../assets/images/icons/arrow-back.png')}
            resizeMode="contain"
            style={{
              height: 20,
            }}
          />
        </TouchableOpacity>
      ),
    }),
  },
);

export default createAppContainer(stackNavigator);
