import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MagicText from '../../../components/MagicText';
import CustomBack from '../../../components/CustomBack';
import {COLORS} from '../../../assets/colors';
import OTPTextField from '../../../components/OTPTextField';
import {TimerIcon} from '../../../assets/icons';
import {OtpScreenProps} from '../../../types/authTypes';
import {
  handleAgentResendOtp,
  handleUserResendOtp,
  VerifyAgentOtp,
  VerifyUserOtp,
} from '../../../services/authServices';
import Toast from 'react-native-toast-message';
import {useAppDispatch} from '../../../store';
import {setToken, setUserData} from '../../../store/slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAxiosInterceptor} from '../../../axios';

const OtpScreen = ({navigation, route}: OtpScreenProps) => {
  const mobile = route?.params?.mobile;
  const prevScreen = route?.params?.screen;
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

  //service for user
  const handleUserVerifyOtp = () => {
    const payload = {
      phone: mobile,
      otp: Number(otp),
    };
    VerifyUserOtp(payload)
      .then(async res => {
        console.log('res in verify otp in handleUserVerifyOtp', res);

        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        dispatch(setToken(res?.tokens?.access?.token));
        await AsyncStorage.setItem('token', res?.tokens?.access?.token);

        dispatch(setUserData({role: res?.role, Id: res?.UserId}));
        await AsyncStorage.setItem('role', res?.role);

        setAxiosInterceptor(res?.tokens?.access?.token, dispatch);
      })
      .catch(error => {
        console.log('error while verifying otp in handleUserVerifyOtp', error);
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.message,
        });
      });
  };

  const handleUserOtp = () => {
    const payload = {
      phone: mobile,
    };
    handleUserResendOtp(payload)
      .then(res => {
        console.log('res in resendOtp in handleUserOtp', res);
        Toast.show({
          type: 'success',
          text1: res?.user?.message,
        });
      })
      .catch(error => {
        console.log('error while re-sending otp in handleUserOtp', error);
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.message,
        });
      });
  };

  //service for agent
  const handleAgentVerifyOtp = () => {
    const payload = {
      phone: mobile,
      otp: Number(otp),
    };
    VerifyAgentOtp(payload)
      .then(async res => {
        console.log('res in verify otp in handleAgentVerifyOtp', res);

        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        dispatch(setToken(res?.tokens?.access?.token));
        await AsyncStorage.setItem('token', res?.tokens?.access?.token);

        dispatch(setUserData({role: res?.role, Id: res?.agentId}));
        await AsyncStorage.setItem('role', res?.role);

        setAxiosInterceptor(res?.tokens?.access?.token, dispatch);
      })
      .catch(error => {
        console.log('error while verifying otp in handleAgentVerifyOtp', error);
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.message,
        });
      });
  };

  const handleAgentResentOtp = () => {
    const payload = {
      phone: mobile,
    };
    handleAgentResendOtp(payload)
      .then(res => {
        console.log('res in handleAgentResOtp', res);
        Toast.show({
          type: 'success',
          text1: res?.user?.message,
        });
      })
      .catch(error => {
        console.log('error while re-sending otp in handleAgentResOtp', error);
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.message,
        });
      });
  };

  useEffect(() => {
    if (otp?.length == 6) {
      if (prevScreen == 'user') {
        handleUserVerifyOtp();
      } else {
        handleAgentVerifyOtp();
      }
    }
  }, [otp?.length, otp]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.parent}>
        <View style={styles.row}>
          <CustomBack onPress={() => navigation.goBack()} />
          <MagicText style={{marginLeft: 12, fontSize: 16}}>
            OTP Verification
          </MagicText>
        </View>
        <View style={{flex: 1, marginTop: 22}}>
          {/* <MagicText style={styles.codeText}>Enter the code</MagicText> */}
          <View style={styles.titleView}>
            <MagicText style={styles.title}>
              We have sent a verification code to
            </MagicText>
            <MagicText style={styles.title}>+91-{mobile}</MagicText>
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
          <MagicText style={{marginBottom: 18, fontSize: 14}}>
            Didn't get the OTP?
          </MagicText>
          <View style={styles.roundView}>
            <View style={[styles.row, {justifyContent: 'space-evenly'}]}>
              <TimerIcon />
              <MagicText>{timer}</MagicText>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setTimer(30);
              if (prevScreen == 'user') {
                handleUserOtp();
              } else {
                handleAgentResentOtp();
              }
            }}
            disabled={timer > 0 && timer < 30}>
            <View style={{flexDirection: 'row'}}>
              <MagicText style={{fontWeight: 700, fontSize: 14}}>
                Resend OTP
              </MagicText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  codeText: {fontSize: 22},
  titleView: {alignItems: 'center'},
  title: {marginTop: 8, lineHeight: 22, fontSize: 16},
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
  },
});
