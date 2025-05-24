import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MagicText from '../../../components/MagicText';
import {COLORS} from '../../../assets/colors';
import CustomBack from '../../../components/CustomBack';
import {IMAGE} from '../../../assets/images';
import TextField from '../../../components/TextField';
import {CallIcon} from '../../../assets/icons';
import Button from '../../../components/Button';
import {LoginScreenProps} from '../../../types/authTypes';

const LoginScreen = ({navigation}: LoginScreenProps) => {
  return (
    <View style={styles.parent}>
      <View style={styles.row}>
        {/* <CustomBack /> */}
        <View style={styles.signinView}>
          <MagicText style={styles.signinText}>Sign In</MagicText>
        </View>
      </View>
      <View>
        <Image source={IMAGE.COMPANY_LOGO} style={styles.logoStyle} />

        <View style={{marginTop: 18}}>
          <MagicText style={styles.continueText}>To Continue...</MagicText>
          <MagicText style={styles.moibleText}>Enter Mobile Number</MagicText>
          <TextField
            placeholder="Phone"
            inputStyle={{marginLeft: 12}}
            leftIcon={<CallIcon />}
          />
          <MagicText style={styles.termsText}>Terms of service</MagicText>
          <Button
            label="Continue"
            style={styles.btnStyle}
            onPress={() => navigation.navigate('OtpScreen')}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
          <MagicText style={styles.agentText}>Continue as Agent</MagicText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  parent: {flex: 1, backgroundColor: COLORS.WHITE, paddingHorizontal: 14},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signinText: {fontSize: 16},

  signinView: {
    flex: 1,
    alignItems: 'center',
    // marginLeft: -22,
    marginRight: 22,
  },
  logoStyle: {width: 250, height: 200, alignSelf: 'center', marginTop: 22},
  continueText: {fontSize: 24, marginBottom: 22},
  moibleText: {fontSize: 14, marginBottom: 12},
  btnStyle: {paddingVertical: 16},
  termsText: {marginTop: 22, marginBottom: 18},
  agentText: {fontSize: 12},
});
