import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AuthStackParamList = {
  LoginScreen: undefined;
  OtpScreen: any;
  SignupScreen: any;
};

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'LoginScreen'
>;

export type OtpScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'OtpScreen'
>;

export type SignupScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'SignupScreen'
>;
