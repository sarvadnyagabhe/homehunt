import React from 'react';
import {Alert, SafeAreaView, StyleSheet, View} from 'react-native';
import {AccountSettingsProps} from '../../../types/appTypes';
import {COLORS} from '../../../assets/colors';
import ScreenHeader from '../../../components/ScreenHeader';
import MagicText from '../../../components/MagicText';
import WhiteCardView from '../../../components/WhiteCardView';
import {ContactUsIcon, RightArrowIcon} from '../../../assets/icons';
import {deleteUser} from '../../../services/HomeService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearAuthState} from '../../../store/slice/authSlice';
import Toast from 'react-native-toast-message';
import {useAppDispatch, useAppSelector} from '../../../store';

const AccountSettings = ({navigation}: AccountSettingsProps) => {
  const dispatch = useAppDispatch();
  const {userData} = useAppSelector(state => state.auth);

  const handleDeleteUser = () => {
    const payload = {
      otp: '212551',
    };
    deleteUser(payload)
      .then(async res => {
        console.log('res in delete user', res);
        await AsyncStorage.clear();
        dispatch(clearAuthState());
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        navigation.navigate('HomeScreen');
      })
      .catch(error => {
        console.log('error', error);
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.message,
        });
      });
  };
  return (
    <SafeAreaView style={styles.parent}>
      <ScreenHeader
        showBackBtn
        onPressProfile={() => {
          navigation.navigate('ProfileScreen');
        }}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <MagicText style={styles.titleText}>Account Settings</MagicText>

        <WhiteCardView cardStyle={styles.cardStyle}>
          <View style={styles.row}>
            <ContactUsIcon />
            <MagicText style={styles.label}>About US</MagicText>
          </View>
          <RightArrowIcon />
        </WhiteCardView>

        <WhiteCardView cardStyle={styles.cardStyle}>
          <View style={styles.row}>
            <ContactUsIcon />
            <MagicText style={styles.label}>Contact US</MagicText>
          </View>
          <RightArrowIcon />
        </WhiteCardView>

        <WhiteCardView cardStyle={styles.cardStyle}>
          <View style={styles.row}>
            <ContactUsIcon />
            <MagicText style={styles.label}>Terms and Conditions</MagicText>
          </View>
          <RightArrowIcon />
        </WhiteCardView>

        <WhiteCardView cardStyle={styles.cardStyle}>
          <View style={styles.row}>
            <ContactUsIcon />
            <MagicText style={styles.label}>Privacy Policies</MagicText>
          </View>
          <RightArrowIcon />
        </WhiteCardView>

        {userData?.role !== 'agent' ? (
          <WhiteCardView
            cardStyle={styles.cardStyle}
            onPress={() => {
              Alert.alert(
                'Delete Account',
                'Are you sure want to delete account?',
                [
                  {text: 'No'},
                  {text: 'Yes', onPress: () => handleDeleteUser()},
                ],
              );
            }}>
            <MagicText
              style={[
                styles.label,
                {color: COLORS.APP_RED, fontWeight: '600'},
              ]}>
              Delete Account
            </MagicText>
            <RightArrowIcon />
          </WhiteCardView>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE_SMOKE,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  titleText: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between',
    marginHorizontal: 15,
    padding: 5,
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 15,
  },
});

export default AccountSettings;
