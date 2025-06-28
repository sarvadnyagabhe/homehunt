import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MagicText from '../../../components/MagicText';
import CustomBack from '../../../components/CustomBack';
import {COLORS} from '../../../assets/colors';
import OTPTextField from '../../../components/OTPTextField';
import {TimerIcon} from '../../../assets/icons';
import {OtpScreenProps} from '../../../types/authTypes';
import {
  getAgentDetails,
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
  const {mobile, screen: prevScreen} = route.params;
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
  const handleUserVerifyOtp = useCallback(() => {
    const payload = {
      phone: mobile,
      otp: Number(otp),
    };
    VerifyUserOtp(payload)
      .then(async res => {
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
  }, [dispatch, mobile, otp]);

  const handleUserOtp = () => {
    const payload = {
      phone: mobile,
    };
    handleUserResendOtp(payload)
      .then(res => {
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
  const handleAgentVerifyOtp = useCallback(() => {
    const payload = {
      phone: mobile,
      otp: Number(otp),
    };
    VerifyAgentOtp(payload)
      .then(res => {
        const token = res?.tokens?.refresh?.token ?? '';
        const agentId = res?.agentId ?? '';

        if (agentId && token) {
          getAgentDetails(agentId, token).then(async (response: any) => {
            if (response?.success) {
              const agentData = response?.data ?? {};

              if (!agentData.name || !agentData.agency_name) {
                navigation.navigate('SignupScreen', {
                  mobile_number: mobile,
                  token,
                  agent_id: agentId,
                  role: res?.role,
                });
                return;
              }
              Toast.show({
                type: 'success',
                text1: res?.message,
              });

              if (agentData.verified !== 0) {
                dispatch(setToken(token));
                await AsyncStorage.setItem('token', token);
                dispatch(setUserData({role: res?.role, Id: agentId}));
                await AsyncStorage.setItem('role', res?.role);
                setAxiosInterceptor(token, dispatch);
                navigation.navigate('HomeScreenStack', {
                  screen: 'HomeScreen',
                });
              } else {
                navigation.navigate('HomeScreenStack', {
                  screen: 'PendingApprovalScreen',
                });
              }
            } else {
              navigation.navigate('SignupScreen', {
                mobile_number: mobile,
                token,
                agent_id: agentId,
                role: res?.role,
              });
            }
          });
        }
      })
      .catch(error => {
        console.log('error while verifying otp in handleAgentVerifyOtp', error);
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.message,
        });
      });
  }, [mobile, otp, dispatch, navigation]);

  const handleAgentResentOtp = () => {
    const payload = {
      phone: mobile,
    };
    handleAgentResendOtp(payload)
      .then(res => {
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
    if (otp.length === 6) {
      if (prevScreen === 'user') {
        handleUserVerifyOtp();
      } else {
        handleAgentVerifyOtp();
      }
    }
  }, [handleAgentVerifyOtp, handleUserVerifyOtp, otp, prevScreen]);

  return (
    <View style={styles.parent}>
      <View style={styles.row}>
        <CustomBack onPress={() => navigation.goBack()} />
        <MagicText style={styles.headerText}>OTP Verification</MagicText>
      </View>
      <View style={{flexGrow: 1}}>
        <View style={styles.titleView}>
          <MagicText style={styles.title}>
            We have sent a verification code to
          </MagicText>
          <MagicText style={[styles.title, {fontWeight: '700'}]}>
            +91-{mobile}
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
      <View style={styles.bottomView}>
        <MagicText style={{fontSize: 14, marginBottom: 10}}>
          Didn't get the OTP?
        </MagicText>
        {timer > 0 && timer < 30 && (
          <View style={styles.roundView}>
            <View style={[styles.row, {justifyContent: 'space-evenly'}]}>
              <TimerIcon />
              <MagicText>{timer}</MagicText>
            </View>
          </View>
        )}
        {!(timer > 0 && timer < 30) && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setTimer(30);
              if (prevScreen === 'user') {
                handleUserOtp();
              } else {
                handleAgentResentOtp();
              }
            }}
            disabled={timer > 0 && timer < 30}>
            <MagicText style={{fontWeight: 700, fontSize: 14}}>
              Resend OTP
            </MagicText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE_SMOKE,
  },
  headerText: {
    fontSize: 16,
    color: COLORS.BLACK,
    fontWeight: '600',
    marginLeft: 12,
  },
  codeText: {
    fontSize: 22,
  },
  titleView: {
    alignItems: 'center',
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
  },
  otpView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  roundView: {
    width: 80,
    height: 50,
    borderRadius: 30,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_SMOKE,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  bottomView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
