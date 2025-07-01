import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomBack from '../CustomBack';
import {IMAGE} from '../../assets/images';
import {useAppSelector} from '../../store';
import {BASE_URL} from '../../constant/urls';
import {COLORS} from '../../assets/colors';
import MagicText from '../MagicText';

interface ScreenHeaderProps {
  showBackBtn?: boolean;
  onBackPress?: () => void;
  onPressProfile?: () => void;
  onLoginPress?: () => void;
  onHomePress?: () => void;
}

const ScreenHeader = ({
  showBackBtn = false,
  onBackPress = () => {},
  onPressProfile = () => {},
  onLoginPress = () => {},
  onHomePress = () => {},
}: ScreenHeaderProps) => {
  const {token, userData} = useAppSelector(state => state.auth);

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
    if (userData?.image) {
      const url = `${BASE_URL}public/${userData?.image}`;
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

  return (
    <View style={styles.parent}>
      {showBackBtn ? (
        <CustomBack onPress={onBackPress} />
      ) : (
        <View style={{width: 40}} />
      )}

      <TouchableOpacity style={styles.logoSection} onPress={onHomePress}>
        <Image source={IMAGE.HouseAppLogo} style={styles.image} />
      </TouchableOpacity>

      {token ? (
        <TouchableOpacity onPress={() => onPressProfile()}>
          {getProfileImage()}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => onLoginPress()}>
          <MagicText style={styles.btnText}>Login</MagicText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 10,
  },
  profileViewStyle: {
    width: 30,
    height: 30,
  },
  profileImgStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    resizeMode: 'cover',
  },
  image: {
    width: 100,
    height: 40,
    resizeMode: 'cover',
  },
  btnText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: COLORS.APP_RED,
  },
  logoSection: {
    flex: 1,
    alignItems: 'center',
  },
  profileView: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_SMOKE,
  },
  userNameText: {
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
});

export default ScreenHeader;
