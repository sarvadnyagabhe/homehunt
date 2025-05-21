import {StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppSelector} from '../store';
import {useDispatch} from 'react-redux';
import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes';
import {setToken} from '../store/slice/authSlice';
import SplashScreen from '../screen/AuthScreen/SplashScreen';
import NoInternetComponent from '../screen/AuthScreen/NoInternetScreen';

const RootNavigator = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const {token, isOnBoardingComplete} = useAppSelector(state => state.auth);

  useEffect(() => {
    const getToken = async () => {
      //get token from local storage and set it to redux
      const token = await AsyncStorage.getItem('token');
      dispatch(setToken(token));
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };

    getToken();
  }, [dispatch]);

  const getRoute = () => {
    if (loading) {
      return <SplashScreen />;
    }
    // && !isOnBoardingComplete
    if (!token) {
      return <AppRoutes />;
    }
    return <AuthRoutes />;
  };
  return <NavigationContainer>{getRoute()}</NavigationContainer>;
};

export default RootNavigator;

const styles = StyleSheet.create({});
