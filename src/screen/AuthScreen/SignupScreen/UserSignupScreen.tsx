import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {UserSignupScreenProps} from '../../../types/authTypes';
import {COLORS} from '../../../assets/colors';
import CustomBack from '../../../components/CustomBack';
import MagicText from '../../../components/MagicText';
import TextField from '../../../components/TextField';
import {FormikValues, useFormik} from 'formik';
import * as yup from 'yup';
import {CameraIcon, ProfileIcon} from '../../../assets/icons';
import {launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import moment from 'moment';
import Button from '../../../components/Button';
import axios from 'axios';
import {BASE_URL, ENDPOINT} from '../../../constant/urls';
import {useAppDispatch} from '../../../store';
import {setToken, setUserData} from '../../../store/slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAxiosInterceptor} from '../../../axios';
import Toast from 'react-native-toast-message';

const UserSignupScreen = ({navigation, route}: UserSignupScreenProps) => {
  const {mobile_number, role, token} = route.params;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const dispatch = useAppDispatch();

  const handleValidation = yup.object().shape({
    name: yup
      .string()
      .required('User Name is required')
      .matches(/^[a-zA-Z\s]+$/, 'User Name must contain only letters'),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter valid email address.',
      )
      .notRequired(),
    profile_image: yup.mixed().notRequired(),
    dob: yup
      .date()
      .required('Date of Birth is required')
      .max(new Date(), 'Date of Birth cannot be in the future'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      profile_image: null,
      dob: new Date(),
    },
    validationSchema: handleValidation,
    onSubmit: values => {
      handleSignup(values);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleProfile = () => {
    launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    }).then(response => {
      formik.setFieldValue('profile_image', response.assets?.[0] ?? null);
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    formik.setFieldValue('dob', date);
    hideDatePicker();
  };

  const handleSignup = (values: FormikValues) => {
    if (formik.isValid) {
      const formData = new FormData();
      formData.append('name', values.name);
      if (values.email) {
        formData.append('email', values.email);
      }
      formData.append('dob', moment(values.dob).format('DD/MM/YYYY'));
      if (formik.values.profile_image !== null) {
        const image: any = formik.values.profile_image;
        formData.append('profile', {
          uri: image.uri,
          name: image.name || `image_profile}.jpg`,
          type: image.type || 'image/jpeg',
        });
      }

      const url = `${BASE_URL}${ENDPOINT.update_user_profile}`;

      axios
        .patch(url, formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async response => {
          dispatch(setToken(token));
          dispatch(setUserData({...response?.data}));
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('role', role);
          setAxiosInterceptor(token, dispatch);
          navigation.navigate('HomeScreenStack', {
            screen: 'HomeScreen',
          });
        })
        .catch(error => {
          console.log('error in handleSignup:', error);
          Toast.show({
            type: 'error',
            text1: error?.response?.data?.message,
          });
        });
    }
  };

  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.row}>
        <CustomBack onPress={() => navigation.goBack()} />
        <View style={styles.signinView}>
          <MagicText style={styles.signinText}>Sign Up</MagicText>
        </View>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.formView} onPress={handleProfile}>
          <View style={styles.roundView}>
            {formik.values.profile_image !== null ? (
              <Image
                source={{uri: (formik.values.profile_image as any)?.uri}}
                style={styles.profileImage}
              />
            ) : (
              <ProfileIcon width={80} height={80} />
            )}

            <View style={styles.absoluteView}>
              <CameraIcon />
            </View>
          </View>
        </TouchableOpacity>

        <TextField
          placeholder="Enter User Name"
          style={[
            styles.textFieldStyle,
            formik.errors.name ? {} : {marginBottom: 18},
          ]}
          value={formik.values.name}
          onChangeText={name => formik.setFieldValue('name', name)}
          isValid={formik.errors.name ? false : true}
          errorMessage={formik.errors.name}
          errorStyle={styles.errorLabel}
        />

        <TextField
          placeholder="Phone"
          style={[styles.textFieldStyle, {marginBottom: 18}]}
          value={mobile_number}
          isValid
          editable={false}
        />

        <TextField
          placeholder="Enter Email"
          style={[
            styles.textFieldStyle,
            formik.errors.email ? {} : {marginBottom: 18},
          ]}
          value={formik.values.email}
          onChangeText={text => formik.setFieldValue('email', text)}
          isValid={formik.errors.email ? false : true}
          errorMessage={formik.errors.email}
          errorStyle={styles.errorLabel}
        />

        <TouchableOpacity
          style={[
            styles.textFieldStyle,
            {
              height: 50,
              justifyContent: 'center',
              paddingHorizontal: 10,
              borderRadius: 12,
            },
          ]}
          onPress={() => showDatePicker()}>
          <MagicText
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: formik.values.dob ? COLORS.BLACK : COLORS.GRAY,
            }}>
            {formik.values.dob
              ? moment(formik.values.dob).format('DD/MM/YYYY')
              : 'Select Date of Birth'}
          </MagicText>
        </TouchableOpacity>

        <Button
          label="SignUp"
          style={styles.btnStyle}
          labelStyle={styles.btnLabel}
          onPress={() => handleSignup(formik.values)}
        />
      </View>
      <DateTimePickerModal
        mode="date"
        isVisible={isDatePickerVisible}
        date={new Date(formik.values.dob)}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE_SMOKE,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  signinText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
  signinView: {
    flex: 1,
    marginRight: 40,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  textFieldStyle: {
    fontSize: 16,
    color: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
  },
  errorLabel: {
    fontSize: 12,
    marginBottom: 18,
    color: COLORS.RED,
    marginLeft: 10,
  },
  roundView: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    marginBottom: 18,
    alignItems: 'center',
  },
  formView: {
    alignItems: 'center',
    marginTop: 28,
  },
  absoluteView: {
    position: 'absolute',
    bottom: 20,
    right: -2,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
    resizeMode: 'cover',
  },
  btnStyle: {
    marginVertical: 20,
  },
  btnLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default UserSignupScreen;
