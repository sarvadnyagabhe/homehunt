import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import CustomBack from '../../../components/CustomBack';
import MagicText from '../../../components/MagicText';
import {COLORS} from '../../../assets/colors';
import {
  BookmarkIcon,
  CallIcon,
  CameraIcon,
  EmailIcon,
  FormProfileIcon,
  ProfileIcon,
  RightArrowIcon,
  VerifiedIcon,
} from '../../../assets/icons';
import TextField from '../../../components/TextField';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Button from '../../../components/Button';
import {ProfileScreennProps} from '../../../types/appTypes';
import {useAppDispatch, useAppSelector} from '../../../store';
import {clearAuthState} from '../../../store/slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  handleAgentDetails,
  handleAgentUpdateProfile,
  handleUserDetails,
  handleUserUpdateProfile,
} from '../../../services/authServices';
import Toast from 'react-native-toast-message';
import {jwtDecode} from 'jwt-decode';
import FastImage from 'react-native-fast-image';
import LoadingAndErrorComponent from '../../../components/LoadingAndErrorComponent';
import {launchImageLibrary} from 'react-native-image-picker';
import {deleteUser} from '../../../services/HomeService';
import HR from '../../../components/HR';
import WhiteCardView from '../../../components/WhiteCardView';

const ProfileScreen = ({navigation}: ProfileScreennProps) => {
  // ({navigation}: ProfileScreennProps) => {
  //TODO: take agentID from redux after which is needs to store after login

  const isVerified = true;
  const dispatch = useAppDispatch();
  const {token, userData} = useAppSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<any>([]);

  // const handleValidation = yup.object().shape({
  //   name: yup.string().required('Name is required'),
  //   phone: yup.string().required('Phone is required'),
  //   email: yup.string().required('Email is required'),
  //   whatsapp_number: yup.string().required('WhatsApp number is required'),
  //   city: yup.string().required('City is required'),
  //   experience_years: yup.string().required('Experience years is required'),
  //   // image_url: yup.string().required('Image is required'),
  // });

  // const formik = useFormik({
  //   initialValues: {
  //     name: '',
  //     phone: '',
  //     email: '',
  //     whatsapp_number: '',
  //     city: '',
  //     experience_years: '',
  //     image_url: '',
  //   },
  //   validationSchema: handleValidation,
  //   onSubmit: (values: any) => {
  //     handleProfileUpdate(values);
  //   },
  // });

  // //to update user and agent data
  // const handleProfileUpdate = (values: any) => {
  //   const API =
  //     userData?.role == 'users'
  //       ? handleUserUpdateProfile(values)
  //       : handleAgentUpdateProfile(values);

  //   API.then(res => {
  //     console.log('res in handleProfileUpdate', res);
  //     Toast.show({
  //       type: 'success',
  //       text1: res?.user?.message,
  //     });
  //   }).catch(error => {
  //     console.log('error in handleProfileUpdate:', error?.response?.data);
  //     Toast.show({
  //       type: 'error',
  //       text1: error?.response?.data?.message,
  //     });
  //   });
  // };

  const handleLogout = async () => {
    dispatch(clearAuthState());
    await AsyncStorage.setItem('token', '');
  };

  //to get  user and agent data
  const getAgentDetails = () => {
    setIsLoading(true);
    const API =
      userData?.role == 'users'
        ? handleUserDetails(userData?.Id)
        : handleAgentDetails(userData?.Id);

    API.then(res => {
      setIsLoading(false);
      console.log('res ingetAgentDetails ', res);
      if (res?.success === true) {
        setUserDetails(res?.data);
      }
    }).catch(error => {
      setIsLoading(false);
      console.log('error in handleAgentDetails', error?.response?.data);
    });
  };

  useEffect(() => {
    getAgentDetails();
  }, []);

  if (isLoading) {
    return <LoadingAndErrorComponent />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.parent}>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View style={styles.row}>
            <CustomBack onPress={() => navigation.goBack()} />
            <View style={styles.header}>
              <MagicText style={styles.headerText}>Your Profile</MagicText>
            </View>
          </View>
          <WhiteCardView cardStyle={styles.cardStyle}>
            <View style={styles.formView}>
              <View style={styles.roundView}>
                {userDetails?.image_url ? (
                  <FastImage
                    source={{uri: userDetails?.image_url}}
                    style={{width: '100%', height: '100%', borderRadius: 100}}
                  />
                ) : (
                  <ProfileIcon />
                )}
              </View>
              <MagicText style={{fontSize: 18}}>{userDetails?.name}</MagicText>
            </View>
            <HR />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProfileDetailScreen', {data: userDetails})
              }>
              <View style={[styles.row, {marginLeft: 12}]}>
                <MagicText style={{fontSize: 14}}>Edit Profile</MagicText>
                <RightArrowIcon />
              </View>
            </TouchableOpacity>
          </WhiteCardView>

          <WhiteCardView cardStyle={styles.cardStyle}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SavedScreen')}>
              <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <View style={styles.row}>
                  <MagicText style={{marginRight: 12, fontSize: 16}}>
                    Bookmarks
                  </MagicText>
                  <BookmarkIcon color={COLORS.BLACK} />
                </View>
                <RightArrowIcon />
              </View>
            </TouchableOpacity>
          </WhiteCardView>

          <WhiteCardView cardStyle={styles.cardStyle}>
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
          </WhiteCardView>

          <WhiteCardView cardStyle={styles.cardStyle}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <MagicText style={{fontSize: 16}}>Join us</MagicText>
              <RightArrowIcon />
            </View>
          </WhiteCardView>
          <WhiteCardView cardStyle={styles.cardStyle}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <MagicText style={{fontSize: 16}}>Contact us</MagicText>
              <RightArrowIcon />
            </View>
          </WhiteCardView>
          <WhiteCardView cardStyle={styles.cardStyle}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <MagicText style={{fontSize: 16}}>Terms And Conditions</MagicText>
              <RightArrowIcon />
            </View>
          </WhiteCardView>

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              marginBottom: 24,
              // alignItems: 'flex-end',
            }}>
            <TouchableOpacity onPress={() => handleLogout()}>
              <MagicText
                style={{fontSize: 18, color: COLORS.RED, fontWeight: '800'}}>
                Log Out
              </MagicText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default ProfileScreen;

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
  cardStyle: {
    marginTop: 20,
    paddingVertical: 22,
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
    // alignItems: 'center',
    // marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 20,
    marginLeft: 12,
  },
  roundView: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_SMOKE,
    alignItems: 'center',
    marginRight: 18,
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
    // marginHorizontal: 24,
  },
  getHelpText: {fontSize: 16, color: COLORS.GREEN, marginBottom: 2},
  sellbuyText: {fontSize: 12, color: COLORS.RED},
  savedText: {fontSize: 14},
  agentText: {fontSize: 16, fontWeight: '700', color: COLORS.GREEN},
  logout: {fontSize: 16, fontWeight: '700', color: COLORS.RED},
  contactText: {fontSize: 14, fontWeight: '700', marginBottom: 8},
  contactValueText: {fontSize: 14, fontWeight: '600'},
});
