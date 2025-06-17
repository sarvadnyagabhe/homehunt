import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProprtyDetailScreenProps} from '../../../types/appTypes';
import CustomSlider from '../../../components/CustomSlider';
import CustomBack from '../../../components/CustomBack';
import {COLORS} from '../../../assets/colors';
import {
  BookmarkIcon,
  CallIcon,
  FillCallIcon,
  GoogleLocationIcon,
  ShareIcon,
  WhatAppIcon,
} from '../../../assets/icons';
import MagicText from '../../../components/MagicText';
import RatingCard from '../../../components/RatingCard';
import {IMAGE} from '../../../assets/images';
import StarRating from 'react-native-star-rating-widget';
import HR from '../../../components/HR';
import ReviewCard from '../../../components/ReviewCard';
import {
  getReviewsList,
  handleAddBookmark,
  handleGetAgentBookmark,
} from '../../../services/PropertyServices';
import {
  getAgentDetailsById,
  handleInteraction,
} from '../../../services/HomeService';
import LoadingAndErrorComponent from '../../../components/LoadingAndErrorComponent';
import FastImage from 'react-native-fast-image';
import Share from 'react-native-share';
import SearchContainer from '../../../components/SearchContainer';
import {useAppSelector} from '../../../store';
import Toast from 'react-native-toast-message';
const ProprtyDetailScreen = ({navigation, route}: ProprtyDetailScreenProps) => {
  const agent = route?.params?.data;
  const width = Dimensions.get('window').width - 36;

  const {userData} = useAppSelector(state => state.auth);
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
  const [agentDetails, setAgentDetails] = useState<any>([]);
  const [reviewData, setReviewData] = useState<any>([]);
  const [starCount, setStarCount] = useState<any>(0);
  const [reviewCount, setReviewCount] = useState<any>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const styles = getStyle(width);

  const getAgentDetails = () => {
    setIsLoading(true);

    getAgentDetailsById(agent.agent_id)
      .then(res => {
        console.log('res in getagent details', res);
        setAgentDetails(res?.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error in getAgentDetails', error);
        setIsLoading(false);
      });
  };

  const onStarRatingPress = (rating: any) => {
    setStarCount(rating);
  };

  const handleReviewsdata = () => {
    const params = {
      agent_id: agent?.agent_id,
    };

    getReviewsList(params)
      .then(res => {
        console.log('res in handleReviewsdata', res);
        setReviewData(res?.data);
      })
      .catch(error => {
        console.log('error in handleReviewsdata', error?.response?.data);
      });
  };
  useEffect(() => {
    handleReviewsdata();
    getAgentDetails();
  }, []);

  if (isLoading) {
    return <LoadingAndErrorComponent />;
  }
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

  const handleUserInteraction = (appName: string) => {
    const payload = {
      agentId: agent?.agent_id,
      click_type: appName,
      clicked_from: 'mobile',
    };
    handleInteraction(payload)
      .then(res => {
        console.log('res in handleUserInteraction', res);
      })
      .catch(error => console.log('error in handleUserInteraction', error));
  };

  const addNewBookmark = () => {
    const payload = {
      agent_id: agent?.agent_id,
    };
    console.log(payload);

    handleAddBookmark(payload)
      .then(res => {
        console.log('res in addNewBookmark ', res);
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
      })
      .catch(error => {
        console.log('error in addNewBookmark', error?.response);
        Toast.show({
          type: 'error',
          text1: error?.response?.message,
        });
      });
  };
  console.log('agentDetails', agentDetails);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.WHITE}}>
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
            <CustomBack onPress={() => navigation.goBack()} />
            <View style={styles.row}>
              <TouchableOpacity onPress={() => addNewBookmark()}>
                <View style={styles.bookmarkIconView}>
                  <BookmarkIcon
                    color={
                      agentDetails?.isBookmarked ? COLORS.APP_RED : COLORS.WHITE
                    }
                  />
                </View>
              </TouchableOpacity>
              <View style={{marginLeft: 14, marginRight: 14}}>
                <TouchableOpacity onPress={() => handleShare()}>
                  <ShareIcon />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileScreen')}>
                <View style={styles.profileViewStyle}>
                  <Image
                    source={IMAGE.PROFILE_IMAGE}
                    style={styles.profileImgStyle}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {/* <CustomSlider
            sliderData={{uri: agentDetails?.image_url}}
            isHome={true}
          /> */}
            <FastImage
              source={{uri: agentDetails?.image_url}}
              style={styles.imageStyle}
            />
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
                  {agentDetails?.name}
                </MagicText>
              </View>
              <RatingCard rating={agentDetails?.rating} />
            </View>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              {/* <MagicText style={styles.ratingText}>
                {agentDetails?.rating} Ratings
              </MagicText> */}
            </View>
            <View style={[styles.row, {marginTop: 12}]}>
              <GoogleLocationIcon />
              <MagicText style={styles.addressText}>
                {agentDetails?.address}
              </MagicText>
              <MagicText style={styles.addressText}>
                {agentDetails?.city}
              </MagicText>
            </View>
            <MagicText style={styles.detailText}>
              {agentDetails?.details}
            </MagicText>

            <View style={[styles.row, {marginTop: 20}]}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${agentDetails?.phone}`).catch(err =>
                    console.error('Error opening dialer:', err),
                  );
                  handleUserInteraction('call');
                }}
                style={styles.locAndCallView}>
                <FillCallIcon />
                <MagicText
                  style={{marginTop: 8, fontWeight: '700', fontSize: 14}}>
                  Call
                </MagicText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    `whatsapp://send?phone=${agentDetails?.whatsapp_number}`,
                  )
                    .catch(() => {
                      Alert.alert(
                        'Error',
                        'Make sure WhatsApp is installed on your device',
                      );
                    })
                    .then(() => {
                      handleUserInteraction('whatsapp');
                    });
                }}
                style={styles.locAndCallView}>
                {/* <WhatAppIcon /> */}
                <Image
                  source={IMAGE.WHATAPP_IMAGE}
                  style={{width: '25%', height: '50%'}}
                />
                <MagicText
                  style={{marginTop: 4, fontWeight: '700', fontSize: 14}}>
                  WhatsApp
                </MagicText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.locAndCallView}
                onPress={() => handleUserInteraction('location')}>
                <GoogleLocationIcon />
                <MagicText
                  style={{marginTop: 8, fontWeight: '700', fontSize: 14}}>
                  Location
                </MagicText>
              </TouchableOpacity>
            </View>
            <View style={styles.reviewView}>
              <MagicText style={styles.reviewText}>Start Your Review</MagicText>
              <StarRating
                onChange={rating => {
                  onStarRatingPress(rating);
                  navigation.navigate('AddReviewScreen', {
                    item: rating,
                    agentId: agent?.agent_id,
                  });
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
            <View style={{flex: 1}}>
              <View style={styles.totalReviewView}>
                <MagicText style={{fontSize: 16, fontWeight: '700'}}>
                  Review & Ratings
                </MagicText>
                <View style={[styles.row, styles.reviewView]}>
                  <MagicText style={{fontSize: 32, fontWeight: '700'}}>
                    {reviewData?.avergeReview
                      ? Math.round(reviewData?.avergeReview)
                      : 0}
                  </MagicText>
                  <View style={{marginLeft: 12}}>
                    <StarRating
                      onChange={() => {}}
                      enableHalfStar={true}
                      rating={
                        reviewData?.avergeReview ? reviewData?.avergeReview : 0
                      }
                      maxStars={5}
                      starSize={18}
                      emptyColor={COLORS.GRAY}
                      starStyle={{width: 8, marginLeft: 0, marginRight: 10}}
                      style={{
                        marginBottom: 2,
                      }}
                    />
                    <MagicText style={{fontSize: 13}}>
                      ({reviewData?.length})
                    </MagicText>
                  </View>
                </View>
              </View>
              <FlatList
                data={reviewData?.slice(0, reviewCount)}
                nestedScrollEnabled={false}
                renderItem={({item, index}) => {
                  console.log(reviewData);

                  return <ReviewCard key={index} item={item} />;
                }}
              />
              {reviewData?.length > reviewCount && (
                <View style={styles.viewAllView}>
                  <TouchableOpacity
                    onPress={() => setReviewCount(reviewData?.length)}>
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
    </SafeAreaView>
  );
};

export default ProprtyDetailScreen;
const getStyle = (width: number) => {
  return StyleSheet.create({
    parent: {
      flex: 1,
      backgroundColor: COLORS.WHITE,
      paddingTop: 12,
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
      // width: '40%',
      flex: 1,
      height: 60,
      borderRadius: 12,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.WHITE_SMOKE,
      marginRight: 4,
      marginLeft: 4,
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
    imageStyle: {
      width: width,
      height: 220,
      borderTopRightRadius: 22,
      borderTopLeftRadius: 22,
    },
    profileViewStyle: {width: 40, height: 40},
    profileImgStyle: {width: '100%', height: '100%', borderRadius: 30},
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
