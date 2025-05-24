import {StyleSheet} from 'react-native';
import React from 'react';
import HomeScreen from '../screen/AppScreen/HomeScreen';
import {HomeScreenStackParamList} from '../types/appTypes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProprtyDetailScreen from '../screen/AppScreen/ProprtyDetailScreen';
import AddReviewScreen from '../screen/AppScreen/AddReviewScreen';
import ProfileScreen from '../screen/AppScreen/ProfileScreen';
import ExpertsScreen from '../screen/AppScreen/ExpertsScreen';
import SavedScreen from '../screen/AppScreen/SavedScreen';
import ReviewDetailsScreen from '../screen/AppScreen/ReviewDetailsScreen';

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
    <HomeStack.Screen name="AddReviewScreen" component={AddReviewScreen} />
    <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} />
    <HomeStack.Screen name="ExpertsScreen" component={ExpertsScreen} />
    <HomeStack.Screen name="SavedScreen" component={SavedScreen} />
    <HomeStack.Screen
      name="ReviewDetailsScreen"
      component={ReviewDetailsScreen}
    />
  </HomeStack.Navigator>
);
export {HomeScreenStack};

const styles = StyleSheet.create({});
