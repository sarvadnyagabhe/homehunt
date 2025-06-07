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
import CitySelectionScreen from '../screen/AppScreen/CitySelectionScreen';
import AreaSelectionScreen from '../screen/AppScreen/AreaSelectionScreen';
import LocalitiesScreen from '../screen/AppScreen/LocalitiesScreen';
import AuthRoutes from './AuthRoutes';
import LoginScreen from '../screen/AuthScreen/LoginScreen';
import OtpScreen from '../screen/AuthScreen/OtpScreen';
import SignupScreen from '../screen/AuthScreen/SignupScreen';
import AgentLoginScreen from '../screen/AuthScreen/AgentLoginScreen';
import {useAppSelector} from '../store';
import ProfileDetailScreen from '../screen/AppScreen/ProfileDetailScreen';

const HomeStack = createNativeStackNavigator<HomeScreenStackParamList>();

const HomeScreenStack = () => {
  const token = useAppSelector(state => state.auth.token);
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="CitySelectionScreen">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />

      <HomeStack.Screen
        name="ProprtyDetailScreen"
        component={ProprtyDetailScreen}
      />

      <HomeStack.Screen name="AddReviewScreen" component={AddReviewScreen} />
      {token ? (
        <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} />
      ) : (
        <HomeStack.Screen name="AuthRoutes" component={AuthRoutes} />
      )}
      <HomeStack.Screen name="ExpertsScreen" component={ExpertsScreen} />
      <HomeStack.Screen name="SavedScreen" component={SavedScreen} />
      <HomeStack.Screen
        name="ReviewDetailsScreen"
        component={ReviewDetailsScreen}
      />
      <HomeStack.Screen
        name="CitySelectionScreen"
        component={CitySelectionScreen}
      />
      <HomeStack.Screen
        name="AreaSelectionScreen"
        component={AreaSelectionScreen}
      />
      <HomeStack.Screen name="LocalitiesScreen" component={LocalitiesScreen} />
      <HomeStack.Screen
        name="ProfileDetailScreen"
        component={ProfileDetailScreen}
      />
    </HomeStack.Navigator>
  );
};
export {HomeScreenStack};

const styles = StyleSheet.create({});
