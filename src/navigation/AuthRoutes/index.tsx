import React from 'react';
import LoginScreen from '../../screen/AuthScreen/LoginScreen';
import {AuthStackParamList} from '../../types/authTypes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CitySelectionScreen from '../../screen/AuthScreen/CitySelectionScreen';
import LocationSelectionScreen from '../../screen/AuthScreen/LocationSelectionScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="CitySelectionScreen"
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
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
