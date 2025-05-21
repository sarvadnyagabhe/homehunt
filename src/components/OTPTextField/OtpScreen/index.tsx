import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MagicText from '../../MagicText';
import CustomBack from '../../CustomBack';
import {COLORS} from '../../../assets/colors';
import OTPTextField from '../../../components/OTPTextField';
import {TimerIcon} from '../../../assets/icons';

const OtpScreen = () => {
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
          <OTPTextField cellCount={6} />
        </View>
      </View>
      <View
        style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.roundView}>
          <View style={styles.row}>
            <TimerIcon />
            <MagicText>00.21</MagicText>
          </View>
        </View>
        <MagicText>Didn't recieve otp? Resend OTP</MagicText>
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
    // paddingTop: 14,
  },
  codeText: {fontSize: 22},
  titleView: {width: '60%'},
  title: {marginTop: 12, lineHeight: 22},
  otpView: {
    // flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundView: {
    width: 90,
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
