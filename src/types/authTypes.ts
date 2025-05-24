import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AuthStackParamList = {
  LoginScreen: undefined;
  CitySelectionScreen: any;
  LocationSelectionScreen: any;
  LocalitiesScreen: any;
  OtpScreen: any;
  SignupScreen: any;
};

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'LoginScreen'
>;

export type CitySelectionScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'CitySelectionScreen'
>;

export type LocationSelectionScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'LocationSelectionScreen'
>;

export type LocalitiesScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'LocalitiesScreen'
>;

export type OtpScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'OtpScreen'
>;

export type SignupScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'SignupScreen'
>;
