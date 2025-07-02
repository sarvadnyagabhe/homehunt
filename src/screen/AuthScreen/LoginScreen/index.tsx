import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MagicText from '../../../components/MagicText';
import {COLORS} from '../../../assets/colors';
import {IMAGE} from '../../../assets/images';
import TextField from '../../../components/TextField';
import Button from '../../../components/Button';
import {LoginScreenProps} from '../../../types/authTypes';
import {handleUserLogin} from '../../../services/authServices';
import Toast from 'react-native-toast-message';
import {BASE_URL} from '../../../constant/urls';

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const [mobile, setMobile] = useState('');

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Are you sure want to exit?', '', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Exit', onPress: () => BackHandler.exitApp(), style: 'default'},
      ]);
      return true;
    };
    const backhandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backhandler.remove();
    };
  }, []);

  const handleSignIn = () => {
    handleUserLogin({phone: mobile})
      .then((res: any) => {
        Toast.show({
          type: 'success',
          text1: res?.user?.message,
        });
        navigation.navigate('OtpScreen', {mobile, screen: 'user'});
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.message,
        });
      });
  };

  return (
    <View style={styles.parent}>
      <View>
        <Image source={IMAGE.COMPANY_LOGO} style={styles.logoStyle} />
        <View style={styles.row}>
          <View style={styles.hr} />
          <MagicText style={styles.continueText}>Log in or sign up</MagicText>
          <View style={styles.hr} />
        </View>
        <TextField
          placeholder="Enter Mobile Number"
          inputStyle={styles.inputStyle}
          style={styles.input}
          onChangeText={number => setMobile(number)}
          maxLength={10}
          showCountryCode={true}
          keyboardType="number-pad"
          value={mobile}
        />
        <Button
          label="Continue"
          style={styles.btnStyle}
          labelStyle={styles.btnLabel}
          onPress={() => handleSignIn()}
        />
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AgentLoginScreen')}
          style={styles.agentBtn}>
          <MagicText style={styles.agentText}>Agent Log in</MagicText>
        </TouchableOpacity>
        <MagicText style={styles.termsHeaderText}>
          By continuing, you agree to our
        </MagicText>
        <View style={styles.textRow}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`${BASE_URL}/v1/auth/terms`);
            }}>
            <MagicText style={styles.termsText}>Terms of Service</MagicText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.horizontalView}
            onPress={() => {
              Linking.openURL(`${BASE_URL}v1/auth/privacy-policy`);
            }}>
            <MagicText style={styles.termsText}>Privacy Policy</MagicText>
          </TouchableOpacity>
          <TouchableOpacity>
            <MagicText style={styles.termsText}>Content Policy</MagicText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  logoStyle: {
    width: '100%',
    height: 380,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  continueText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.TEXT_GRAY,
    fontWeight: '800',
  },
  inputStyle: {
    marginLeft: 12,
    fontSize: 16,
  },
  input: {
    borderWidth: 0.4,
    backgroundColor: COLORS.WHITE_SMOKE,
    marginHorizontal: 15,
  },
  btnStyle: {
    paddingVertical: 12,
    marginTop: 25,
    marginHorizontal: 15,
  },
  bottomView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  signinText: {
    fontSize: 16,
  },
  signinView: {
    flex: 1,
    alignItems: 'center',
    marginRight: 22,
  },
  moibleText: {
    fontSize: 14,
    marginBottom: 12,
  },
  btnLabel: {
    fontSize: 20,
    fontWeight: '700',
  },
  hr: {
    flex: 1,
    borderWidth: 0.2,
    borderColor: COLORS.GRAY,
    marginHorizontal: 10,
  },
  agentBtn: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: COLORS.GRAY,
    paddingHorizontal: 12,
    marginBottom: 25,
  },
  agentText: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.GRAY,
    // fontWeight: '700',
  },
  agentText1: {
    fontSize: 12,
    color: COLORS.WHITE,
    fontWeight: '700',
  },
  termsHeaderText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
    color: COLORS.BLACK,
    textDecorationLine: 'underline',
  },
  horizontalView: {marginHorizontal: 8},
});
