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

import {IMAGE} from '../../../assets/images';
import TextField from '../../../components/TextField';
import {CallIcon} from '../../../assets/icons';
import Button from '../../../components/Button';
import {AgentLoginScreenProps} from '../../../types/authTypes';
import Toast from 'react-native-toast-message';
import {handleAgentLogin} from '../../../services/authServices';

const AgentLoginScreen = ({navigation}: AgentLoginScreenProps) => {
  const [mobile, setMobile] = useState<any>();

  const handleSignIn = () => {
    const payload = {
      phone: mobile,
    };

    handleAgentLogin(payload)
      .then(res => {
        Toast.show({
          type: 'success',
          text1: res?.user?.message,
        });
        navigation.navigate('OtpScreen', {mobile, screen: 'agent'});
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
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.parent}>
        <View style={styles.row}>
          {/* <CustomBack /> */}
          {/* <View style={styles.signinView}> */}
          {/* <MagicText style={styles.signinText}>Sign In</MagicText> */}
          {/* </View> */}
        </View>
        <View>
          <View
            style={{
              height: 380,
            }}>
            <Image
              source={IMAGE.COMPANY_LOGO}
              style={styles.logoStyle}
              resizeMode="contain"
            />
          </View>
          <View style={styles.row}>
            <View style={styles.hr} />
            <MagicText style={styles.continueText}>Log in or sign up</MagicText>
            <View style={styles.hr} />
          </View>
          <View style={{marginTop: 18}}>
            <TextField
              placeholder="Enter Mobile Number"
              inputStyle={{marginLeft: 12, fontSize: 16}}
              // leftIcon={<CallIcon />}
              style={{
                borderWidth: 0.4,
                backgroundColor: COLORS.WHITE,
                marginHorizontal: 30,
              }}
              onChangeText={number => setMobile(number)}
              maxLength={10}
              showCountryCode={true}
            />
            {/* <MagicText style={styles.termsText}>Terms of service</MagicText> */}
            <Button
              label="Continue"
              style={styles.btnStyle}
              labelStyle={styles.btnLabel}
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
          <View style={styles.row}>
            <View style={styles.hr} />
            <MagicText style={styles.continueText}>or</MagicText>
            <View style={styles.hr} />
          </View>
        </View>
        <View style={{alignItems: 'center', marginBottom: 30}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignupScreen')}
            style={styles.agentBtn}>
            <MagicText style={styles.agentText}>Sign up</MagicText>
            {/* <MagicText style={styles.agentText}>Agent</MagicText>
            <MagicText style={styles.agentText1}>Log in or sign up</MagicText> */}
          </TouchableOpacity>
          <MagicText
            style={{
              textAlign: 'center',
              width: 180,
              marginBottom: 2,
            }}>
            By continuing, you agree to our
          </MagicText>
          <MagicText style={{textAlign: 'center'}}>
            Terms of Service, Privacy Policy And Content Policy
          </MagicText>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AgentLoginScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    // paddingHorizontal: 14,
    // paddingTop: 14,
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
  logoStyle: {
    width: '100%',
    height: '100%',
    // marginTop: 22,
  },
  continueText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.TEXT_GRAY,
    fontWeight: '800',
  },
  moibleText: {fontSize: 14, marginBottom: 12},
  btnStyle: {paddingVertical: 12, marginTop: 22, marginHorizontal: 30},
  termsText: {marginTop: 22, marginBottom: 18},

  btnLabel: {fontSize: 20, fontWeight: '700'},
  hr: {
    flex: 1,
    borderWidth: 0.2,
    borderColor: COLORS.GRAY,
    marginHorizontal: 10,
  },
  agentBtn: {
    backgroundColor: COLORS.APP_RED,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    width: '60%',
    marginBottom: 22,
  },
  agentText: {fontSize: 22, color: COLORS.WHITE, fontWeight: '700'},
  agentText1: {fontSize: 12, color: COLORS.WHITE, fontWeight: '700'},
});
