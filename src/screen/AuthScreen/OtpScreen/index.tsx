import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MagicText from '../../../components/MagicText';
import CustomBack from '../../../components/CustomBack';
import {COLORS} from '../../../assets/colors';
import OTPTextField from '../../../components/OTPTextField';
import {TimerIcon} from '../../../assets/icons';
import {OtpScreenProps} from '../../../types/authTypes';
import {handleResendOtp, VerifyOtp} from '../../../services/authServices';
import Toast from 'react-native-toast-message';
import {useAppDispatch} from '../../../store';
import {setToken} from '../../../store/slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAxiosInterceptor} from '../../../axios';

const OtpScreen = ({navigation, route}: OtpScreenProps) => {
  const mobile = route?.params?.mobile;
  const [otp, setOtp] = useState<string>('');
  const [timer, setTimer] = useState<number>(30);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        if (timer === 0) {
          clearInterval(interval);
        } else {
          setTimer(timer - 1);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [timer]);

  const handleVerifyOtp = () => {
    const payload = {
      phone: mobile,
      otp: Number(otp),
    };
    VerifyOtp(payload)
      .then(async res => {
        console.log('res in verify otp', res);

        Toast.show({
          type: 'success',
          text1: res?.user?.message,
        });
        dispatch(setToken(res?.tokens?.access?.token));
        await AsyncStorage.setItem('token', res?.tokens?.access?.token);
        setAxiosInterceptor(res?.tokens?.access?.token, dispatch);
      })
      .catch(error => {
        console.log('error while verifying otp', error);
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.message,
        });
      });
  };

  const handleOtp = () => {
    const payload = {
      phone: mobile,
    };
    handleResendOtp(payload)
      .then(res => {
        console.log('res in resendOtp', res);
        Toast.show({
          type: 'success',
          text1: res?.user?.message,
        });
      })
      .catch(error => {
        console.log('error while re-sending otp ', error);
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.message,
        });
      });
  };
  useEffect(() => {
    if (otp?.length == 6) {
      handleVerifyOtp();
    }
  }, [otp?.length, otp]);

  return (
    <View style={styles.parent}>
      <CustomBack />
      <View style={{flex: 1, marginTop: 22}}>
        <MagicText style={styles.codeText}>Enter the code</MagicText>
        <View style={styles.titleView}>
          <MagicText style={styles.title}>
            Enter the 4 digit code that we just sent to +91 701 185 1822
          </MagicText>
        </View>
        <View style={styles.otpView}>
          <OTPTextField
            cellCount={6}
            otpValue={otp}
            onTextChange={number => setOtp(number)}
          />
        </View>
      </View>
      <View
        style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.roundView}>
          <View style={styles.row}>
            <TimerIcon />
            <MagicText>{timer}</MagicText>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setTimer(30);
            handleOtp();
          }}
          disabled={timer > 0 && timer < 30}>
          <MagicText>Didn't recieve otp? Resend OTP</MagicText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 14,
  },
  codeText: {fontSize: 22},
  titleView: {width: '60%'},
  title: {marginTop: 12, lineHeight: 22},
  otpView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundView: {
    width: 80,
    height: 50,
    borderRadius: 30,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_SMOKE,
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
