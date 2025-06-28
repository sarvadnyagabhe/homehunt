import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomBack from '../CustomBack';
import {HouseAppIcon} from '../../assets/icons';
import {IMAGE} from '../../assets/images';
import {useAppSelector} from '../../store';

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
  const {token} = useAppSelector(state => state.auth);
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
          <Image source={IMAGE.AccountCircle} style={styles.profileImgStyle} />
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
    resizeMode: 'contain',
  },
});

export default ScreenHeader;
