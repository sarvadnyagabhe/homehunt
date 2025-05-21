import {StyleSheet} from 'react-native';
import React from 'react';
import HomeScreen from '../screen/AppScreen/HomeScreen';
import {HomeScreenStackParamList} from '../types/appTypes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProprtyDetailScreen from '../screen/AppScreen/ProprtyDetailScreen';

const HomeStack = createNativeStackNavigator<HomeScreenStackParamList>();

const HomeScreenStack = () => (
  <HomeStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="HomeScreen">
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen
      name="ProprtyDetailScreen"
      component={ProprtyDetailScreen}
    />
  </HomeStack.Navigator>
);
export {HomeScreenStack};

const styles = StyleSheet.create({});
