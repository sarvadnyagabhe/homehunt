import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IMAGE} from '../../assets/images';
import MagicText from '../MagicText';
import RatingCard from '../RatingCard';
import {COLORS} from '../../assets/colors';
import {BookmarkIcon, GoogleLocationIcon} from '../../assets/icons';
import CustomSlider from '../CustomSlider';

const PropertyCard = () => {
  const width = Dimensions.get('screen').width - 28;
  const styles = getStyles(width);
  return (
    <View style={styles.parent}>
      <View style={{alignItems: 'center'}}>
        {/* <CustomSlider sliderData=[{i}]  /> */}

        <Image source={IMAGE.CARD_IMAGE} style={styles.imageStyle} />
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 15,
          }}>
          <View style={styles.bookmarkIconView}>
            <BookmarkIcon />
          </View>
        </View>
        <View style={styles.distanceAbosluteView}>
          <View>
            <MagicText style={styles.distanceText}>10 KM Away</MagicText>
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
            <MagicText style={styles.heading}>
              Shri Sai Shyam Properties Shri Sai Shyam Properties
            </MagicText>
          </View>
          <RatingCard rating={'2.4'} />
        </View>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <MagicText style={styles.ratingText}>16 Ratings</MagicText>
          {/* <MagicText style={styles.distanceText}>2.5 KM Away</MagicText> */}
        </View>
        <View style={[styles.row, {marginTop: 12}]}>
          <GoogleLocationIcon />
          <MagicText style={styles.addressText}>
            Office No L-17 A, Ground Floor, Block L, Saket, Delhi - 110017
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
    },
    addressText: {fontSize: 16, color: COLORS.TEXT_GRAY, marginLeft: 10},

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
    },
  });
};
