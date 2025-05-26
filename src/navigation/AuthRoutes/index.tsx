import React from 'react';
import LoginScreen from '../../screen/AuthScreen/LoginScreen';
import {AuthStackParamList} from '../../types/authTypes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OtpScreen from '../../screen/AuthScreen/OtpScreen';
import SignupScreen from '../../screen/AuthScreen/SignupScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
