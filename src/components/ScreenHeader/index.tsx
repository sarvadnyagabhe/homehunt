import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomBack from '../CustomBack';
import {HouseAppIcon} from '../../assets/icons';
import {IMAGE} from '../../assets/images';
import {useAppSelector} from '../../store';
import {BASE_URL} from '../../constant/urls';

interface ScreenHeaderProps {
  showBackBtn?: boolean;
  onBackPress?: () => void;
  onPressProfile: () => void;
  onLoginPress: () => void;
}

const ScreenHeader = ({
  showBackBtn = false,
  onBackPress = () => {},
  onPressProfile = () => {},
  onLoginPress = () => {},
}: ScreenHeaderProps) => {
  const [profileImageUrl, setProfielImageUrl] = useState('');
  const {token, userData} = useAppSelector(state => state.auth);

  useEffect(() => {
    if (token && userData?.id) {
      if (userData.role === 'agent') {
        if (userData?.images?.length > 0) {
          const url = `${BASE_URL}public/${userData.images[0]}`;
          setProfielImageUrl(url);
        } else {
          setProfielImageUrl('');
        }
      } else {
        //
      }
    } else {
      setProfielImageUrl('');
    }
  }, [token, userData]);

  return (
    <View style={styles.parent}>
      {showBackBtn ? (
        <CustomBack onPress={onBackPress} />
      ) : (
        <View style={{width: 40}} />
      )}

      <HouseAppIcon />
      <TouchableOpacity
        onPress={() => (token ? onPressProfile() : onLoginPress())}>
        <View style={styles.profileViewStyle}>
          <Image
            source={
              profileImageUrl ? {uri: profileImageUrl} : IMAGE.AccountCircle
            }
            style={styles.profileImgStyle}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
});

export default ScreenHeader;
