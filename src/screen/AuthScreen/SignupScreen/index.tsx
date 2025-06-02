import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {SignupScreenProps} from '../../../types/authTypes';
import MagicText from '../../../components/MagicText';
import CustomBack from '../../../components/CustomBack';
import {COLORS} from '../../../assets/colors';
import {
  CallIcon,
  CameraIcon,
  EmailIcon,
  FormProfileIcon,
  ProfileIcon,
} from '../../../assets/icons';
import TextField from '../../../components/TextField';
import Button from '../../../components/Button';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {handleAgentSignup} from '../../../services/authServices';
import Toast from 'react-native-toast-message';
const SignupScreen = ({navigation}: SignupScreenProps) => {
  const handleValidation = yup.object().shape({
    name: yup.string().required('Name is required'),
    phone: yup.string().required('Phone is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
    },
    validationSchema: handleValidation,
    onSubmit: (values: any) => {
      handleSignup(values);
    },
  });
  const handleSignup = (values: {phone: number; name: string}) => {
    handleAgentSignup(values)
      .then(res => {
        console.log('res in handleSignup:', res);
        Toast.show({
          type: 'success',
          text1: res?.user?.message,
        });
      })
      .catch(error => {
        console.log('error in handleSignup:', error);
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
          <CustomBack />
          <View style={styles.signinView}>
            <MagicText style={styles.signinText}>Sign Up</MagicText>
          </View>
        </View>
        <View style={styles.mainView}>
          <MagicText style={styles.heading}>Create your account</MagicText>
          <MagicText style={styles.informationText}>
            Fill your information to continue
          </MagicText>
          <View style={styles.formView}>
            <View style={styles.roundView}>
              <ProfileIcon />
              <View style={styles.absoluteView}>
                <CameraIcon />
              </View>
            </View>
          </View>
          <View>
            <TextField
              placeholder="Name"
              leftIcon={<FormProfileIcon />}
              style={styles.textFieldStyle}
              value={formik.values.name}
              onChangeText={name => formik.setFieldValue('name', name)}
            />
            {formik.errors.name && (
              <MagicText style={styles.errorLabel}>
                {formik.errors.name}
              </MagicText>
            )}

            <TextField
              placeholder="Phone"
              leftIcon={<CallIcon />}
              style={styles.textFieldStyle}
              value={formik.values.phone}
              maxLength={10}
              onChangeText={phone => formik.setFieldValue('phone', phone)}
            />
            {formik.errors.phone && (
              <MagicText style={styles.errorLabel}>
                {formik.errors.phone}
              </MagicText>
            )}

            <TextField
              placeholder="Email"
              leftIcon={<EmailIcon />}
              style={styles.textFieldStyle}
              value={formik.values.email}
              onChangeText={email => formik.setFieldValue('email', email)}
            />

            <MagicText>Terms of service</MagicText>
            <View style={{}}>
              <Button
                label="Register"
                style={styles.btnStyle}
                onPress={() => formik.handleSubmit()}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingTop: 12,
    paddingHorizontal: 14,
  },
  heading: {fontSize: 22},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signinText: {fontSize: 16},
  signinView: {
    flex: 1,
    alignItems: 'center',
    marginLeft: -22,
    marginRight: 22,
  },
  mainView: {
    marginTop: 30,
  },
  informationText: {fontSize: 12, color: COLORS.TEXT_GRAY, marginTop: 16},
  roundView: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_SMOKE,
    marginBottom: 18,
    alignItems: 'center',
  },
  formView: {
    alignItems: 'center',
    marginTop: 28,
  },
  absoluteView: {position: 'absolute', bottom: 26, right: -2},
  textFieldStyle: {marginBottom: 18},
  btnStyle: {marginTop: 18, paddingVertical: 16},
  errorLabel: {
    fontSize: 12,
    marginBottom: 12,
    marginTop: -10,
    marginLeft: 12,
    color: COLORS.RED,
  },
});
