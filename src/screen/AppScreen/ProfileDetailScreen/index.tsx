import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomBack from '../../../components/CustomBack';
import {ProfileDetailScreenProps} from '../../../types/appTypes';
import MagicText from '../../../components/MagicText';
import FastImage from 'react-native-fast-image';
import {
  BookmarkIcon,
  CallIcon,
  CameraIcon,
  CityIcon,
  EmailIcon,
  ExperienceIcon,
  FormProfileIcon,
  OverviewIcon,
  ProfileIcon,
  VerifiedIcon,
} from '../../../assets/icons';
import TextField from '../../../components/TextField';
import {COLORS} from '../../../assets/colors';

import HR from '../../../components/HR';
import Button from '../../../components/Button';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../../../store';
import {
  handleAgentUpdateProfile,
  handleUserUpdateProfile,
} from '../../../services/authServices';
import Toast from 'react-native-toast-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {deleteUser} from '../../../services/HomeService';
import {clearAuthState} from '../../../store/slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileDetailScreen = ({navigation, route}: ProfileDetailScreenProps) => {
  const userDetails = route?.params?.data;
  const {token, userData} = useAppSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleValidation = yup.object().shape({
    name: yup.string().required('Name is required'),
    phone: yup.string().required('Phone is required'),
    email: yup.string().required('Email is required'),
    whatsapp_number: yup.string().required('WhatsApp number is required'),
    city: yup.string().required('City is required'),
    experience_years: yup.string().required('Experience years is required'),
    // image_url: yup.string().required('Image is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      whatsapp_number: '',
      city: '',
      experience_years: '',
      image: '',
      description: '',
    },
    validationSchema: handleValidation,
    onSubmit: (values: any) => {
      handleProfileUpdate(values);
    },
  });

  //to update user and agent data
  const handleProfileUpdate = (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('dob', '25/06/1997');
    formData.append('image', {
      uri: values.image.uri,
      name: values.image.name || `image_user_profile.jpg`,
      type: values.image.type || 'image/jpeg',
    });
    formData.append('location', {
      address: '1234 Sunset Blvd, Los Angeles, CA 90026',
      latitude: 34.09000912,
      longitude: -118.27498032,
    });

    const API = handleUserUpdateProfile(formData);
    // userData?.role === 'users'
    //   ? handleUserUpdateProfile(formData)
    //   : handleAgentUpdateProfile(values);

    API.then(res => {
      console.log('res in handleProfileUpdate', res);
      Toast.show({
        type: 'success',
        text1: res?.user?.message,
      });
      navigation.goBack();
    }).catch(error => {
      console.log('error in handleProfileUpdate:', error?.response?.data);
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
      });
    });
  };

  const openGallery = () => {
    const options: any = {
      mediaType: 'photo',
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log('Image URI: ', response.assets[0]);
        formik.setFieldValue('image', response.assets[0]);
      }
    });
  };

  const handleLogout = async () => {
    dispatch(clearAuthState());
    await AsyncStorage.setItem('token', '');
  };

  //to delete user and agent
  const handleDeleteUser = () => {
    const payload = {
      otp: '212551',
    };
    deleteUser(payload)
      .then(res => {
        console.log('res in delete user', res);
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        handleLogout();
      })
      .catch(error => {
        console.log('error', error);
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.message,
        });
      });
  };

  // useEffect(() => {
  //   formik.setValues(userDetails);
  // }, []);
  //   if (isLoading) {
  //     return <LoadingAndErrorComponent />;
  //   }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.parent}>
        <ScrollView>
          <View style={styles.row}>
            <CustomBack onPress={() => navigation.goBack()} />
            <View style={styles.header}>
              <MagicText style={styles.headerText}>Your Profile</MagicText>
            </View>
          </View>

          <View style={styles.formView}>
            <View style={styles.roundView}>
              {formik.values?.image_url ? (
                <FastImage
                  source={{uri: formik.values?.image_url}}
                  style={{width: '100%', height: '100%', borderRadius: 100}}
                />
              ) : (
                <ProfileIcon />
              )}
              <View style={styles.absoluteView}>
                <TouchableOpacity onPress={() => openGallery()}>
                  <CameraIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{flex: 1, marginTop: 14}}>
            <TextField
              placeholder="Name"
              leftIcon={<FormProfileIcon />}
              style={styles.textFieldStyle}
              value={formik.values?.name}
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
              rightIcon={formik.values?.verified && <VerifiedIcon />}
              style={styles.textFieldStyle}
              value={formik.values?.phone}
              maxLength={14}
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
              value={formik.values?.email}
              onChangeText={email => formik.setFieldValue('email', email)}
            />
            {formik.errors.email && (
              <MagicText style={styles.errorLabel}>
                {formik.errors.email}
              </MagicText>
            )}

            <TextField
              placeholder="WhatsApp Number"
              leftIcon={<CallIcon />}
              style={styles.textFieldStyle}
              maxLength={14}
              value={formik.values?.whatsapp_number}
              onChangeText={number =>
                formik.setFieldValue('whatsapp_number', number)
              }
            />
            {formik.errors.whatsapp_number && (
              <MagicText style={styles.errorLabel}>
                {formik.errors.whatsapp_number}
              </MagicText>
            )}

            <TextField
              placeholder="City"
              leftIcon={<CityIcon />}
              style={styles.textFieldStyle}
              value={formik.values?.city}
              onChangeText={city => formik.setFieldValue('city', city)}
            />
            {formik.errors.city && (
              <MagicText style={styles.errorLabel}>
                {formik.errors.city}
              </MagicText>
            )}

            <TextField
              placeholder="Experience Years"
              leftIcon={<ExperienceIcon />}
              style={styles.textFieldStyle}
              value={formik.values?.experience_years}
              onChangeText={experience_years =>
                formik.setFieldValue('experience_years', experience_years)
              }
            />
            {formik.errors.experience_years && (
              <MagicText style={styles.errorLabel}>
                {formik.errors.experience_years}
              </MagicText>
            )}

            {formik.values?.description && (
              <TextField
                placeholder="Overview"
                leftIcon={<OverviewIcon />}
                style={[styles.textFieldStyle]}
                value={formik.values?.description}
                onChangeText={description =>
                  formik.setFieldValue('description', description)
                }
              />
            )}
            {formik.errors.description && (
              <MagicText style={styles.errorLabel}>
                {formik.errors.description}
              </MagicText>
            )}

            {/* <MagicText>Terms of service</MagicText>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('SavedScreen')}>
              <View style={[styles.row, {marginTop: 22}]}>
                <View style={styles.bookmarkRound}>
                  <BookmarkIcon color={COLORS.BLACK} />
                </View>
                <MagicText style={styles.savedText}>Saved Agents</MagicText>
              </View>
            </TouchableOpacity> */}
            <Button
              label="Update"
              onPress={() => formik.handleSubmit()}
              style={{marginTop: 14, marginBottom: 14}}
            />

            {/* <View style={{flex: 1, justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ExpertsScreen')}
                activeOpacity={0.7}>
                <View style={styles.getHelpView}>
                  <MagicText style={styles.getHelpText}>
                    Get Expert Help
                  </MagicText>
                  <MagicText style={styles.sellbuyText}>
                    Sell, Buy or Rent
                  </MagicText>
                </View>
              </TouchableOpacity>
            </View> */}

            {/* <View
              style={[
                styles.row,
                {
                  flex: 1,
                  justifyContent: 'space-between',
                  marginTop: 12,
                },
              ]}>
              <MagicText style={styles.agentText}>Become Agent</MagicText>
             
            </View> */}
          </View>

          {/* <HR />
          <View style={{marginBottom: 20}}>
            <MagicText
              style={{
                fontSize: 18,
                fontWeight: '800',
                textAlign: 'center',
                marginBottom: 20,
              }}>
              Contact us
            </MagicText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <MagicText style={styles.contactText}>Email</MagicText>
              <MagicText style={styles.contactValueText}>
                contactus@gmail.com
              </MagicText>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <MagicText style={styles.contactText}>Phone Number</MagicText>
              <MagicText style={styles.contactValueText}>8899776655</MagicText>
            </View>
          </View> */}
          {/* <HR /> */}
          {/* <Button
            label="Delete"
            type="OUTLINE"
            onPress={() => handleDeleteUser()}
            labelStyle={{fontSize: 14, fontWeight: '800'}}
            style={{
              marginTop: 14,
              marginBottom: 14,
              borderColor: COLORS.RED,
            }}
          /> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileDetailScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    marginLeft: -22,
    marginRight: 22,
  },
  headerText: {
    fontSize: 14,
  },
  formView: {
    alignItems: 'center',
    marginTop: 12,
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
  bookmarkRound: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_SMOKE,
    alignItems: 'center',
    marginRight: 12,
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
  getHelpView: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.GREEN,
    paddingVertical: 10,
    marginHorizontal: 24,
  },
  getHelpText: {fontSize: 16, color: COLORS.GREEN, marginBottom: 2},
  sellbuyText: {fontSize: 12, color: COLORS.RED},
  savedText: {fontSize: 14},
  agentText: {fontSize: 16, fontWeight: '700', color: COLORS.GREEN},
  logout: {fontSize: 16, fontWeight: '700', color: COLORS.RED},
  contactText: {fontSize: 14, fontWeight: '700', marginBottom: 8},
  contactValueText: {fontSize: 14, fontWeight: '600'},
});
