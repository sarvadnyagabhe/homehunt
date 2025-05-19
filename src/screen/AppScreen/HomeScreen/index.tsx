import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  AppIcon,
  ForwardArrowIcon,
  LocationIcon,
  NotificationIcon,
} from '../../../assets/icons';
import {IMAGE} from '../../../assets/images';
import {COLORS} from '../../../assets/colors';
import MagicText from '../../../components/MagicText';
import PropertyCard from '../../../components/PropertyCard';

const HomeScreen = () => {
  return (
    <View style={styles.parent}>
      <View style={styles.row}>
        <NotificationIcon />
        <AppIcon />
        <Image source={IMAGE.PROFILE_IMAGE} style={styles.profileImgStyle} />
      </View>

      <View style={styles.searchBarStyle}>
        <View style={styles.row}>
          <LocationIcon />
          <MagicText>Saket, New Delhi</MagicText>
          <ForwardArrowIcon />
        </View>
      </View>

      <View>
        <PropertyCard />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  parent: {flex: 1, paddingHorizontal: 14, backgroundColor: COLORS.WHITE},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImgStyle: {width: 50, height: 50, borderRadius: 30},
  searchBarStyle: {
    backgroundColor: COLORS.WHITE_SMOKE,
    height: 44,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 12,
  },
});
