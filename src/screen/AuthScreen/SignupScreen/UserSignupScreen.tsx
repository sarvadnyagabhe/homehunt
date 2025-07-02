import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {UserSignupScreenProps} from '../../../types/authTypes';
import {COLORS} from '../../../assets/colors';
import CustomBack from '../../../components/CustomBack';
import MagicText from '../../../components/MagicText';
import TextField from '../../../components/TextField';
import {useFormik} from 'formik';
import {CameraIcon, ProfileIcon} from '../../../assets/icons';
import {launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import moment from 'moment';
import Button from '../../../components/Button';
import {useAppDispatch} from '../../../store';
import {setUserData} from '../../../store/slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {userFormValidationSchema, UserFormValues} from './constants';
import {
  handleUserDetails,
  handleUserUpdateProfile,
} from '../../../services/authServices';
import {prepareUserObj} from '../../../utils';

const UserSignupScreen = ({navigation, route}: UserSignupScreenProps) => {
  const {mobile_number} = route.params;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const dispatch = useAppDispatch();

  const handleSignup = (values: UserFormValues) => {
    const formData = new FormData();
    formData.append('name', values.name);
    if (values.email) {
      formData.append('email', values.email);
    }
    formData.append('dob', moment(values.dob).format('DD/MM/YYYY'));
    formData.append('location', {
      address: '1234 Sunset Blvd, Los Angeles, CA 90026',
      latitude: 34.09000912,
      longitude: -118.27498032,
    });
    if (formik.values.profile_image !== null) {
      const image: any = formik.values.profile_image;
      formData.append('image', {
        uri: image.uri,
        name: 'image_profile.jpg',
        type: 'image/jpeg',
      });
    }

    handleUserUpdateProfile(formData)
      .then(async () => {
        const userDetails = await handleUserDetails();
        if (userDetails?.id) {
          const userData: any = userDetails ?? {};
          const userObj = prepareUserObj(userData);
          await AsyncStorage.setItem('userData', JSON.stringify(userObj));
          dispatch(setUserData({...userObj}));
          navigation.navigate('HomeScreenStack', {
            screen: 'HomeScreen',
          });
        }
      })
      .catch(error => {
        console.log('error in handleSignup:', error);
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.message,
        });
      });
  };

  const formik = useFormik<UserFormValues>({
    initialValues: {
      name: '',
      email: '',
      profile_image: null,
      dob: '',
    },
    validationSchema: userFormValidationSchema,
    onSubmit: handleSignup,
    validateOnChange: false,
    // validateOnBlur: true,
  });

  const handleProfile = () => {
    launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    }).then(response => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        formik.setFieldValue('profile_image', selectedImage.uri ?? null);
      }
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
                source={{uri: formik.values.profile_image}}
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

        <MagicText style={styles.inputLabel}>
          Full Name <MagicText style={styles.astricStyle}>*</MagicText>
        </MagicText>
        <TextField
          placeholder="Enter Full Name"
          style={[
            styles.textFieldStyle,
            formik.errors.name ? {} : {marginBottom: 18},
          ]}
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
          isValid={formik.errors.name ? false : true}
          errorMessage={formik.errors.name}
          errorStyle={styles.errorLabel}
        />

        <MagicText style={styles.inputLabel}>
          Phone <MagicText style={styles.astricStyle}>*</MagicText>
        </MagicText>
        <TextField
          placeholder="Phone"
          style={[styles.textFieldStyle, {marginBottom: 18}]}
          value={mobile_number}
          isValid
          editable={false}
          showCountryCode
        />

        <Text style={styles.inputLabel}>
          Email <Text style={styles.optionalTextStyle}>(optional)</Text>
        </Text>
        <TextField
          placeholder="Enter Email"
          style={[
            styles.textFieldStyle,
            formik.errors.email ? {} : {marginBottom: 18},
          ]}
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          isValid={formik.errors.email ? false : true}
          errorMessage={formik.errors.email}
          errorStyle={styles.errorLabel}
          keyboardType="email-address"
        />

        <MagicText style={styles.inputLabel}>
          Date of Birth <MagicText style={styles.astricStyle}>*</MagicText>
        </MagicText>
        <TouchableOpacity
          style={[
            styles.textFieldStyle,
            styles.dobContainer,
            formik.errors.dob ? {borderWidth: 1, borderColor: COLORS.RED} : {},
          ]}
          onPress={() => showDatePicker()}>
          <MagicText
            style={[
              styles.dobText,
              {color: formik.values.dob ? COLORS.BLACK : COLORS.GRAY},
            ]}>
            {formik.values.dob
              ? moment(formik.values.dob).format('DD/MM/YYYY')
              : 'Date of Birth'}
          </MagicText>
        </TouchableOpacity>
        {formik.errors.dob ? (
          <MagicText style={[styles.errorLabel, {marginTop: 8}]}>
            {formik.errors.dob}
          </MagicText>
        ) : null}

        <Button
          label="SignUp"
          style={styles.btnStyle}
          labelStyle={styles.btnLabel}
          onPress={() => formik.handleSubmit()}
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
    backgroundColor: COLORS.WHITE,
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
    backgroundColor: COLORS.WHITE_SMOKE,
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
    backgroundColor: COLORS.WHITE_SMOKE,
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
  inputLabel: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.BLACK,
    fontWeight: '600',
    marginBottom: 8,
  },
  astricStyle: {
    color: COLORS.RED,
    fontSize: 14,
  },
  optionalTextStyle: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.GRAY,
  },
  dobContainer: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  dobText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default UserSignupScreen;
