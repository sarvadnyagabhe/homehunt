import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomBack from '../../../components/CustomBack';
import MagicText from '../../../components/MagicText';
import {COLORS} from '../../../assets/colors';
import {
  BookmarkIcon,
  LocationIcon,
  RightArrowIcon,
} from '../../../assets/icons';
import {ProfileScreennProps} from '../../../types/appTypes';
import {useAppDispatch, useAppSelector} from '../../../store';
import {clearAuthState, setUserData} from '../../../store/slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  handleAgentDetails,
  handleUserDetails,
} from '../../../services/authServices';
import LoadingAndErrorComponent from '../../../components/LoadingAndErrorComponent';
import WhiteCardView from '../../../components/WhiteCardView';
import {AgentUserType, UserType} from '../../../types';
import {IMAGE} from '../../../assets/images';
import {BASE_URL} from '../../../constant/urls';
import {prepareUserObj} from '../../../utils';

const UserMenuOptions = ['experthelp', 'bookmarks', 'accountSettings'];
const AgentMenuOptions = ['bookmarks', 'locations', 'accountSettings'];

const ProfileScreen = ({navigation}: ProfileScreennProps) => {
  const dispatch = useAppDispatch();
  const {token, userData} = useAppSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<
    AgentUserType | UserType | null
  >(null);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (token && userData?.id) {
      if (userData.role === 'agent') {
        setOptions(AgentMenuOptions);
      } else {
        setOptions(UserMenuOptions);
      }
    } else {
      setOptions([]);
    }
  }, [token, userData]);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      {text: 'Cancel'},
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          dispatch(clearAuthState());
          await AsyncStorage.clear();
          navigation.navigate('HomeScreen');
        },
      },
    ]);
  };

  //to get  user and agent data
  const getDetails = useCallback(
    (userId: number, role: string) => {
      setIsLoading(true);
      const API =
        role === 'agent' ? handleAgentDetails(userId) : handleUserDetails();

      API.then(async res => {
        setIsLoading(false);
        if (role === 'users') {
          const userObj = prepareUserObj(res);
          await AsyncStorage.setItem('userData', JSON.stringify(userObj));
          dispatch(setUserData(userObj));
          setUserDetails(userObj);
        } else {
          setUserDetails(res);
        }
        if (res?.success === true) {
        }
      }).catch(error => {
        setIsLoading(false);
        console.log('error in handleAgentDetails', error?.response?.data);
      });
    },
    [dispatch],
  );

  useEffect(() => {
    if (token && userData?.id) {
      getDetails(userData.id, userData.role);
    }
  }, [getDetails, token, userData?.id, userData?.role]);

  if (isLoading) {
    return <LoadingAndErrorComponent />;
  }

  const renderOption = (option: string) => {
    switch (option) {
      case 'experthelp':
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('ExpertsScreen')}
            activeOpacity={0.7}>
            <View style={styles.getHelpView}>
              <MagicText style={styles.getHelpText}>Get Expert Help</MagicText>
              <MagicText style={styles.sellbuyText}>
                BUY | SELL | RENT
              </MagicText>
            </View>
          </TouchableOpacity>
        );

      case 'bookmarks':
        return (
          <TouchableOpacity onPress={() => navigation.navigate('SavedScreen')}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View style={styles.row}>
                <BookmarkIcon color={COLORS.BLACK} />
                <MagicText style={{marginLeft: 12, fontSize: 16}}>
                  Bookmarks
                </MagicText>
              </View>
              <RightArrowIcon />
            </View>
          </TouchableOpacity>
        );

      case 'locations':
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('WorkingLocationsListScreen')}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View style={styles.row}>
                <LocationIcon />
                <MagicText style={{marginLeft: 12, fontSize: 16}}>
                  Working Locations
                </MagicText>
              </View>
              <RightArrowIcon />
            </View>
          </TouchableOpacity>
        );

      case 'accountSettings':
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('AccountSettings')}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View style={styles.row}>
                <Image source={IMAGE.SettingsIcon} style={styles.icon} />
                <MagicText style={{marginLeft: 12, fontSize: 16}}>
                  Account Settings
                </MagicText>
              </View>
              <RightArrowIcon />
            </View>
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  const getProfileImage = () => {
    if (userData?.role === 'agent') {
      return (
        <View style={styles.profileView}>
          <MagicText style={styles.userNameText}>
            {userData?.agency_name[0].toUpperCase()}
          </MagicText>
        </View>
      );
    }

    const data = userData?.profile ? userData.profile.split('/') : [];

    if (data?.[2] && data?.[2] !== 'undefined' && userData?.profile) {
      const url = `${BASE_URL}public/${userData.profile}`;
      return (
        <View style={styles.profileViewStyle}>
          <Image source={{uri: url}} style={styles.profileImgStyle} />
        </View>
      );
    }
    return (
      <View style={styles.profileView}>
        <MagicText style={styles.userNameText}>
          {userData?.name[0].toUpperCase()}
        </MagicText>
      </View>
    );
  };

  const renderUserInfo = () => {
    return (
      <WhiteCardView cardStyle={styles.cardStyle}>
        <View style={styles.formView}>
          <View>{getProfileImage()}</View>
          <View>
            <MagicText style={styles.userName}>{userDetails?.name}</MagicText>
            <TouchableOpacity
              onPress={() => {
                if (userDetails) {
                  navigation.navigate('ProfileDetailScreen', {
                    userDetails,
                  } as any);
                }
              }}>
              <View style={styles.profileRow}>
                <MagicText style={styles.editText}>Edit Profile</MagicText>
                <RightArrowIcon color={COLORS.WHITE} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </WhiteCardView>
    );
  };

  return (
    <SafeAreaView style={styles.parentView}>
      <View style={styles.headerRow}>
        <CustomBack onPress={() => navigation.goBack()} />
        <View style={styles.header}>
          <MagicText style={styles.headerText}>Your Profile</MagicText>
        </View>
        <View style={{width: 30}} />
      </View>

      <ScrollView contentContainerStyle={styles.parent}>
        {renderUserInfo()}
        {options.map(option => {
          return (
            <WhiteCardView cardStyle={styles.cardStyle} key={option}>
              {renderOption(option)}
            </WhiteCardView>
          );
        })}

        <WhiteCardView
          cardStyle={styles.cardStyle}
          onPress={() => handleLogout()}>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <View style={styles.row}>
              <Image source={IMAGE.LogoutIcon} style={styles.icon} />
              <MagicText style={styles.logoutText}>Logout</MagicText>
            </View>
            <RightArrowIcon />
          </View>
        </WhiteCardView>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: COLORS.WHITE_SMOKE,
  },
  parent: {
    flex: 1,
    paddingHorizontal: 15,
  },
  headerRow: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardStyle: {
    marginBottom: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
  },
  formView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
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
    borderColor: COLORS.APP_RED,
    paddingVertical: 10,
    // marginHorizontal: 24,
  },
  getHelpText: {
    fontSize: 20,
    color: COLORS.APP_RED,
    marginBottom: 4,
    fontWeight: '800',
  },
  sellbuyText: {fontSize: 14, color: COLORS.APP_RED},
  savedText: {fontSize: 14},
  agentText: {fontSize: 16, fontWeight: '700', color: COLORS.GREEN},
  logout: {fontSize: 16, fontWeight: '700', color: COLORS.RED},
  contactText: {fontSize: 14, fontWeight: '700', marginBottom: 8},
  contactValueText: {fontSize: 14, fontWeight: '600'},

  userName: {
    fontSize: 20,
    marginBottom: 6,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 2,
    alignSelf: 'baseline',
  },
  editText: {
    fontSize: 14,
    color: COLORS.WHITE,
  },
  icon: {
    width: 18,
    height: 18,
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.APP_RED,
  },
  profileView: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_SMOKE,
    marginRight: 15,
  },
  userNameText: {
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  profileViewStyle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_SMOKE,
    padding: 2,
    marginRight: 15,
  },
  profileImgStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    resizeMode: 'cover',
  },
});
