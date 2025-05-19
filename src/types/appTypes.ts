import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AppStackParamList = {
  bottomTab: NavigatorScreenParams<BottomTabParamList>;
};
type BottomTabParamList = {
  HomeScreen: NavigatorScreenParams<HomeScreenStackParamList>;
};
type MainStackParamList = {
  BottomTab: BottomTabScreenProps<BottomTabParamList>;
  HomeScreenStack: NavigatorScreenParams<HomeScreenStackParamList>;
};

type HomeScreenStackParamList = {
  HomeScreen: any;
};

export type HomeScreenProps = NativeStackScreenProps<
  HomeScreenStackParamList,
  'HomeScreen'
>;

export type {MainStackParamList, BottomTabParamList, HomeScreenStackParamList};
