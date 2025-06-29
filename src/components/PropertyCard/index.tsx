import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import MagicText from '../MagicText';
import RatingCard from '../RatingCard';
import {COLORS} from '../../assets/colors';
import {BookmarkIcon, GoogleLocationIcon, ShareIcon} from '../../assets/icons';
import CustomSlider from '../CustomSlider';
import Share from 'react-native-share';
import {AgentUserType} from '../../types';
import {BASE_URL} from '../../constant/urls';

type PropertyCardType = {
  item: AgentUserType;
  onBookmarkPress?: () => void;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

const PropertyCard = ({
  item,
  onBookmarkPress = () => {},
  onPress = () => {},
  containerStyle = {},
}: PropertyCardType) => {
  const handleShare = () => {
    const shareOptions = {
      title: 'Check this out!',
      url: 'https://example.com',
    };

    Share.open(shareOptions)
      .then(res => console.log(res))
      .catch(err => err && console.log(err));
  };

  return (
    <Pressable style={[styles.parent, containerStyle]} onPress={onPress}>
      <View>
        <CustomSlider
          sliderData={item.image_urls.map((image, index) => ({
            id: index.toString(),
            image: `${BASE_URL}public/${image}`,
          }))}
          imageStyle={styles.imageContainerStyle}
          imageContainer={{height: 200}}
        />
        <View style={styles.distanceAbosluteView}>
          <MagicText style={styles.distanceText}>10 KM Away</MagicText>
        </View>
        {item.sponsorship_status ? (
          <View style={styles.sponsoredView}>
            <MagicText style={styles.sponsorText}>Sponsored</MagicText>
          </View>
        ) : null}

        <View style={styles.iconAbsoluteView}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => onBookmarkPress()}>
              <View style={styles.bookmarkIconView}>
                <BookmarkIcon color={COLORS.WHITE} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleShare()}
              style={styles.shareIconContainer}>
              <ShareIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.row}>
          <View style={{flex: 1}}>
            <MagicText style={styles.heading}>{item.agency_name}</MagicText>
          </View>
          <RatingCard rating={item?.rating ?? 0} />
        </View>
        {item?.office_address ? (
          <View
            style={[styles.row, {marginTop: 12, justifyContent: 'flex-start'}]}>
            <View>
              <GoogleLocationIcon />
            </View>
            <MagicText style={styles.addressText}>
              {item.office_address}
            </MagicText>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  parent: {
    elevation: 4,
    borderRadius: 12,
    backgroundColor: COLORS.WHITE,
  },
  imageContainerStyle: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  distanceAbosluteView: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    bottom: 12,
    backgroundColor: COLORS.WHITE_SMOKE,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  distanceText: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.BLACK,
  },
  sponsoredView: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    backgroundColor: COLORS.WHITE_SMOKE,
    padding: 6,
    borderRadius: 4,
  },
  sponsorText: {
    color: COLORS.APP_RED,
    fontWeight: '700',
  },
  bookmarkIconView: {
    backgroundColor: COLORS.SHADOW_COLOR,
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  iconAbsoluteView: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  shareIconContainer: {
    backgroundColor: COLORS.SHADOW_COLOR,
    borderRadius: 20,
    padding: 4,
  },
  bottomContainer: {
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.TEXT_GRAY,
    marginLeft: 10,
  },
});
export default PropertyCard;
