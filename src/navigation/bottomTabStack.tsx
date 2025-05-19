import {StyleSheet} from 'react-native';
import React from 'react';
import HomeScreen from '../screen/AppScreen/HomeScreen';
import {HomeScreenStackParamList} from '../types/appTypes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator<HomeScreenStackParamList>();

const HomeScreenStack = () => (
  <HomeStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="HomeScreen">
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
  </HomeStack.Navigator>
);
export {HomeScreenStack};

const styles = StyleSheet.create({});
