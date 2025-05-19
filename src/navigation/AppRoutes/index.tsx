import {StyleSheet} from 'react-native';
import React from 'react';
import {MainStackParamList} from '../../types/appTypes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreenStack} from '../bottomTabStack';

const AppStack = createNativeStackNavigator<MainStackParamList>();
const AppRoutes = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name="HomeScreenStack" component={HomeScreenStack} />
    </AppStack.Navigator>
  );
};

export default AppRoutes;

const styles = StyleSheet.create({});
