import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MagicText from '../MagicText';
import RatingCard from '../RatingCard';
import {COLORS} from '../../assets/colors';
import {BookmarkIcon, GoogleLocationIcon, ShareIcon} from '../../assets/icons';
import CustomSlider from '../CustomSlider';
import FastImage from 'react-native-fast-image';
import Share from 'react-native-share';

type PropertyCardType = {
  item: any;
};
const PropertyCard = ({item}: PropertyCardType) => {
  const width = Dimensions.get('window').width - 36;
  const styles = getStyles(width);
  const handleShare = () => {
    const shareOptions = {
      title: 'Check this out!',
      // message: '',
      url: 'https://example.com',
      // social: Share.Social., // Optional, for specific platforms
    };

    Share.open(shareOptions)
      .then(res => console.log(res))
      .catch(err => err && console.log(err));
  };
  return (
    <View style={styles.parent}>
      <View style={{}}>
        {/* <CustomSlider
          sliderData={item?.media}
          containerStyle={styles.imageStyle}
        /> */}
        <FastImage source={{uri: item?.image_url}} style={styles.imageStyle} />
        <View style={styles.distanceAbosluteView}>
          <View>
            <MagicText style={styles.distanceText}>10 KM Away</MagicText>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}>
          <View style={styles.row}>
            <View style={styles.bookmarkIconView}>
              <BookmarkIcon
                color={item?.isSaved ? COLORS.LIGHT_GREEN : COLORS.WHITE}
              />
            </View>

            <TouchableOpacity onPress={() => handleShare()}>
              <ShareIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.mainView}>
        <View
          style={[
            styles.row,
            {justifyContent: 'space-between', marginBottom: 8},
          ]}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <MagicText style={styles.heading}>{item?.name}</MagicText>
          </View>
          <RatingCard rating={item?.rating} />
        </View>
        {/* <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <MagicText style={styles.ratingText}>
            {item?.rating} Ratings
          </MagicText>
        </View> */}
        <View style={[styles.row, {marginTop: 12}]}>
          <GoogleLocationIcon />
          <MagicText style={styles.addressText}>
            {item?.office_address}
          </MagicText>
        </View>
      </View>
    </View>
  );
};

export default PropertyCard;
const getStyles = (width: number) => {
  return StyleSheet.create({
    parent: {
      marginVertical: 14,
      elevation: 4,
      marginHorizontal: 4,
    },
    imageStyle: {
      width: width,
      height: 220,
      borderTopRightRadius: 22,
      borderTopLeftRadius: 22,
    },
    heading: {
      fontSize: 20,
      fontWeight: '800',
    },
    mainView: {
      backgroundColor: COLORS.WHITE_SMOKE,
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderBottomRightRadius: 22,
      borderBottomLeftRadius: 22,
      elevation: 4,
    },
    ratingText: {fontSize: 14, color: COLORS.TEXT_GRAY},
    distanceText: {fontSize: 14, marginLeft: 8},
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    addressText: {
      fontSize: 16,
      color: COLORS.TEXT_GRAY,
      marginLeft: 10,
      height: 40,
    },

    distanceAbosluteView: {
      position: 'absolute',
      backgroundColor: COLORS.WHITE_SMOKE,
      bottom: 12,
      left: 0,
      width: '28%',
      borderBottomColor: COLORS.WHITE_SMOKE,
      elevation: 4,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
      paddingVertical: 2,
    },

    bookmarkIconView: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 20,
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
  });
};
