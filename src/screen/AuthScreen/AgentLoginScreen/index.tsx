import {
  Alert,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MagicText from '../../../components/MagicText';
import {COLORS} from '../../../assets/colors';
import TextField from '../../../components/TextField';
import Button from '../../../components/Button';
import {AgentLoginScreenProps} from '../../../types/authTypes';
import Toast from 'react-native-toast-message';
import {handleAgentLogin} from '../../../services/authServices';
import {HouseAppIcon} from '../../../assets/icons';

const AgentLoginScreen = ({navigation}: AgentLoginScreenProps) => {
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
    <View style={styles.parent}>
      <View>
        <View style={styles.headerView}>
          <View style={{alignItems: 'center'}}>
            <HouseAppIcon />
            <MagicText style={styles.title}>Welcome! To Our Team</MagicText>
          </View>
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
          onPress={() => navigation.navigate('LoginScreen')}
          style={styles.agentBtn}>
          <MagicText style={styles.agentText}>User Log In</MagicText>
        </TouchableOpacity>
        <MagicText style={styles.termsHeaderText}>
          By continuing, you agree to our
        </MagicText>
        <View style={styles.textRow}>
          <TouchableOpacity>
            <MagicText style={styles.termsText}>Terms of Service</MagicText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.horizontalView}>
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

export default AgentLoginScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
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
    backgroundColor: COLORS.WHITE,
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
    borderWidth: 2,
    borderRadius: 25,
    borderColor: COLORS.TEXT_GRAY,
    paddingHorizontal: 12,
    marginBottom: 25,
  },
  agentText: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.TEXT_GRAY,
    fontWeight: '700',
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
  horizontalView: {
    marginHorizontal: 8,
  },
  headerView: {
    padding: 15,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    lineHeight: 34,
    color: COLORS.BLACK,
    fontWeight: '700',
  },
});
