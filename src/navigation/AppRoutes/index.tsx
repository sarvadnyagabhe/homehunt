import React from 'react';
import {MainStackParamList} from '../../types/appTypes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreenStack} from '../bottomTabStack';
import AuthRoutes from '../AuthRoutes';

const AppStack = createNativeStackNavigator<MainStackParamList>();
const AppRoutes = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name="HomeScreenStack" component={HomeScreenStack} />
      <AppStack.Screen name="AuthStack" component={AuthRoutes} />
    </AppStack.Navigator>
  );
};

export default AppRoutes;
