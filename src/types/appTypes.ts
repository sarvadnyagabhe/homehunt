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
  ProprtyDetailScreen: any;
  AddReviewScreen: any;
  ProfileScreen: any;
  ExpertsScreen: any;
  SavedScreen: any;
  ReviewDetailsScreen: any;
};

export type HomeScreenProps = NativeStackScreenProps<
  HomeScreenStackParamList,
  'HomeScreen'
>;

export type ProprtyDetailScreenProps = NativeStackScreenProps<
  HomeScreenStackParamList,
  'ProprtyDetailScreen'
>;

export type AddReviewScreenProps = NativeStackScreenProps<
  HomeScreenStackParamList,
  'AddReviewScreen'
>;

export type ProfileScreennProps = NativeStackScreenProps<
  HomeScreenStackParamList,
  'ProfileScreen'
>;
export type ExpertsScreenProps = NativeStackScreenProps<
  HomeScreenStackParamList,
  'ExpertsScreen'
>;
export type SavedScreenProps = NativeStackScreenProps<
  HomeScreenStackParamList,
  'SavedScreen'
>;
export type ReviewDetailsScreenProps = NativeStackScreenProps<
  HomeScreenStackParamList,
  'ReviewDetailsScreen'
>;

export type {MainStackParamList, BottomTabParamList, HomeScreenStackParamList};
