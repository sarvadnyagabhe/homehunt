import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MagicText from '../../../components/MagicText';
import {COLORS} from '../../../assets/colors';

const LoginScreen = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={COLORS.RED}
        animated={true}
        barStyle="dark-content"
      />
      <MagicText>LoginScreen</MagicText>
      <MagicText>LoginScreen</MagicText>
      <MagicText>LoginScreen</MagicText>
      <MagicText>LoginScreen</MagicText>
      <MagicText>LoginScreen</MagicText>
      <MagicText>LoginScreen</MagicText>
      <MagicText>LoginScreen</MagicText>
      <MagicText>LoginScreen</MagicText>
      <MagicText>LoginScreen</MagicText>
      <MagicText>LoginScreen</MagicText>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
