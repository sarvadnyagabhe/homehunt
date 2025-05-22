import React from 'react';
import LoginScreen from '../../screen/AuthScreen/LoginScreen';
import {AuthStackParamList} from '../../types/authTypes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CitySelectionScreen from '../../screen/AuthScreen/CitySelectionScreen';
import LocationSelectionScreen from '../../screen/AuthScreen/LocationSelectionScreen';
import LocalitiesScreen from '../../screen/LocalitiesScreen';
import OtpScreen from '../../components/OTPTextField/OtpScreen';
import SignupScreen from '../../screen/AuthScreen/SignupScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="CitySelectionScreen"
        component={CitySelectionScreen}
      />
      <Stack.Screen
        name="LocationSelectionScreen"
        component={LocationSelectionScreen}
      />
      <Stack.Screen name="LocalitiesScreen" component={LocalitiesScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
