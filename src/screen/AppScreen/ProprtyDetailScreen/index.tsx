import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ProprtyDetailScreenProps} from '../../../types/appTypes';
import CustomSlider from '../../../components/CustomSlider';
import CustomBack from '../../../components/CustomBack';
import {COLORS} from '../../../assets/colors';
import {
  BookmarkIcon,
  CallIcon,
  GoogleLocationIcon,
  ShareIcon,
} from '../../../assets/icons';
import MagicText from '../../../components/MagicText';
import RatingCard from '../../../components/RatingCard';
import {IMAGE} from '../../../assets/images';
import StarRating from 'react-native-star-rating-widget';
import HR from '../../../components/HR';
import ReviewCard from '../../../components/ReviewCard';

const ProprtyDetailScreen = ({navigation, route}: ProprtyDetailScreenProps) => {
  const data = route?.params?.data;
  const reviewsData = {
    data: [
      {
        id: 1,
        profile: IMAGE.REVIEW_PROFILE_1,
        reviewerName: 'Kurt Mullins',
        reviewCount: '2',
        reviewImage: IMAGE.CARD_IMAGE,
        review:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        totalReviews: 2,
      },
      {
        id: 2,
        profile: IMAGE.REVIEW_PROFILE_2,
        reviewerName: 'Kay Swansons',
        reviewCount: '2',
        //   reviewImage: IMAGE.CARD_IMAGE,
        review:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        totalReviews: 3,
      },
      {
        id: 3,
        profile: IMAGE.REVIEW_PROFILE_1,
        reviewerName: 'Kurt Mullins',
        reviewCount: '2',
        reviewImage: IMAGE.CARD_IMAGE,
        review:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        totalReviews: 4,
      },
      {
        id: 4,
        profile: IMAGE.REVIEW_PROFILE_1,
        reviewerName: 'Kurt Mullins',
        reviewCount: '2',
        reviewImage: IMAGE.CARD_IMAGE,
        review:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        totalReviews: 2,
      },
      {
        id: 5,
        profile: IMAGE.REVIEW_PROFILE_2,
        reviewerName: 'Kay Swansons',
        reviewCount: '2',
        //   reviewImage: IMAGE.CARD_IMAGE,
        review:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        totalReviews: 3,
      },
      {
        id: 6,
        profile: IMAGE.REVIEW_PROFILE_1,
        reviewerName: 'Kurt Mullins',
        reviewCount: '2',
        reviewImage: IMAGE.CARD_IMAGE,
        review:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        totalReviews: 4,
      },
    ],
    avergeReview: 4.5,
  };

  const [reviewData, setReviewData] = useState<any>(reviewsData);

  const [starCount, setStarCount] = useState<any>(0);
  const [reviewCount, setReviewCount] = useState<any>(3);
  const onStarRatingPress = (rating: any) => {
    setStarCount(rating);
  };

  return (
    <ScrollView>
      <View style={styles.parent}>
        <View
          style={[
            styles.row,
            {
              paddingHorizontal: 14,
              marginBottom: 8,
              justifyContent: 'space-between',
            },
          ]}>
          <CustomBack />
          <View style={styles.row}>
            <BookmarkIcon color={COLORS.GREEN} />
            <View style={{marginLeft: 14}}>
              <ShareIcon />
            </View>
          </View>
        </View>
        <View>
          <CustomSlider sliderData={data?.media} isHome={true} />
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
              <MagicText style={styles.heading}>{data?.agentName}</MagicText>
            </View>
            <RatingCard rating={data?.review} />
          </View>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <MagicText style={styles.ratingText}>
              {data?.rating} Ratings
            </MagicText>
          </View>
          <View style={[styles.row, {marginTop: 12}]}>
            <GoogleLocationIcon />
            <MagicText style={styles.addressText}>{data?.address}</MagicText>
          </View>
          <MagicText style={styles.detailText}>{data?.details}</MagicText>

          <View
            style={[
              styles.row,
              {justifyContent: 'space-evenly', marginTop: 20},
            ]}>
            <View style={styles.locAndCallView}>
              <GoogleLocationIcon />
            </View>
            <View style={styles.locAndCallView}>
              <Image source={IMAGE.FILL_CALL_IMAGE} />
            </View>
          </View>
          <View style={styles.reviewView}>
            <MagicText style={styles.reviewText}>Start Your Review</MagicText>
            <StarRating
              onChange={rating => {
                onStarRatingPress(rating);
                navigation.navigate('AddReviewScreen', {item: rating});
              }}
              enableHalfStar={true}
              rating={starCount}
              maxStars={5}
              starSize={36}
              emptyColor={COLORS.GRAY}
              starStyle={{width: 22, marginLeft: 0, marginRight: 16}}
              style={{
                marginBottom: 6,
              }}
            />
          </View>
          <HR />
          <View>
            <View style={styles.totalReviewView}>
              <MagicText style={{fontSize: 14}}>Review & Ratings</MagicText>
              <View style={[styles.row, styles.reviewView]}>
                <MagicText style={{fontSize: 32, fontWeight: '700'}}>
                  {reviewData?.avergeReview}
                </MagicText>
                <View style={{marginLeft: 12}}>
                  <StarRating
                    onChange={() => {}}
                    enableHalfStar={true}
                    rating={reviewData?.avergeReview}
                    maxStars={5}
                    starSize={18}
                    emptyColor={COLORS.GRAY}
                    starStyle={{width: 8, marginLeft: 0, marginRight: 10}}
                    style={{
                      marginBottom: 2,
                    }}
                  />
                  <MagicText style={{fontSize: 13}}>
                    ({reviewData?.data?.length})
                  </MagicText>
                </View>
              </View>
            </View>
            <FlatList
              data={reviewData?.data?.slice(0, reviewCount)}
              nestedScrollEnabled={false}
              renderItem={({item, index}) => {
                return <ReviewCard key={index} item={item} />;
              }}
            />
            {reviewData?.data?.length > reviewCount && (
              <View style={styles.viewAllView}>
                <TouchableOpacity
                  onPress={() => setReviewCount(reviewData?.data?.length)}>
                  <MagicText style={styles.viewAllText}>
                    View all reviews
                  </MagicText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProprtyDetailScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainView: {paddingHorizontal: 14, marginTop: 18},
  heading: {
    fontSize: 20,
    fontWeight: '800',
  },
  ratingText: {fontSize: 14, color: COLORS.TEXT_GRAY},
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
  distanceText: {fontSize: 14, marginLeft: 8},
  detailText: {fontSize: 14, marginTop: 16, lineHeight: 20},
  locAndCallView: {
    width: '40%',
    height: 70,
    borderRadius: 12,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE_SMOKE,
  },
  reviewView: {marginTop: 16},
  reviewText: {fontSize: 16, fontWeight: '700', marginBottom: 6},
  totalReviewView: {marginBottom: 12},
  viewAllView: {
    height: 50,
    borderRadius: 24,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE_SMOKE,
    marginBottom: 18,
  },
  viewAllText: {fontSize: 14},
});
