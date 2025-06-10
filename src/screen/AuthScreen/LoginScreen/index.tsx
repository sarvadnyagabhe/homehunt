import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MagicText from '../../../components/MagicText';
import {COLORS} from '../../../assets/colors';
import CustomBack from '../../../components/CustomBack';
import {IMAGE} from '../../../assets/images';
import TextField from '../../../components/TextField';
import {CallIcon} from '../../../assets/icons';
import Button from '../../../components/Button';
import {LoginScreenProps} from '../../../types/authTypes';
import {handleUserLogin} from '../../../services/authServices';
import Toast from 'react-native-toast-message';

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const [mobile, setMobile] = useState<any>();

  const handleSignIn = () => {
    const payload = {
      phone: mobile,
    };
    handleUserLogin(payload)
      .then(res => {
        console.log('res', res);
        Toast.show({
          type: 'success',
          text1: res?.user?.message,
        });
        navigation.navigate('OtpScreen', {mobile, screen: 'user'});
      })
      .catch(error => {
        console.log('error', error?.response?.data?.message);
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.message,
        });
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
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
              onChangeText={number => setMobile(number)}
              maxLength={10}
            />
            <MagicText style={styles.termsText}>Terms of service</MagicText>
            <Button
              label="Continue"
              style={styles.btnStyle}
              onPress={() => handleSignIn()}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AgentLoginScreen')}>
            <MagicText style={styles.agentText}>Continue as Agent</MagicText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 14,
    paddingTop: 14,
  },
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
  agentText: {fontSize: 14, color: COLORS.ORANGE},
});
