import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ProprtyDetailScreenProps} from '../../../types/appTypes';

import {COLORS} from '../../../assets/colors';
import {
  BookmarkIcon,
  FillCallIcon,
  GoogleLocationIcon,
  LocationIcon,
  ShareIcon,
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
  handleSliderData,
} from '../../../services/PropertyServices';
import {
  getAgentDetailsById,
  handleInteraction,
} from '../../../services/HomeService';
import LoadingAndErrorComponent from '../../../components/LoadingAndErrorComponent';

import Share from 'react-native-share';
import Toast from 'react-native-toast-message';
import CustomSlider from '../../../components/CustomSlider';
import {useAppSelector} from '../../../store';
import {BASE_URL} from '../../../constant/urls';
import {AgentUserType} from '../../../types';
import ScreenHeader from '../../../components/ScreenHeader';

const ProprtyDetailScreen = ({navigation, route}: ProprtyDetailScreenProps) => {
  const {agent_id} = route.params;
  const {token} = useAppSelector(state => state.auth);
  const {location} = useAppSelector(state => state.location);

  const [agentDetails, setAgentDetails] = useState<AgentUserType | null>(null);
  const [reviewData, setReviewData] = useState<any>([]);
  const [starCount, setStarCount] = useState<any>(0);
  const [reviewCount, setReviewCount] = useState<any>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sliderData, setSliderData] = useState<{id: string; image: string}[]>(
    [],
  );

  const getAgentDetails = useCallback((agentId: number) => {
    setIsLoading(true);

    getAgentDetailsById(agentId)
      .then(res => {
        setAgentDetails(res?.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error in getAgentDetails', error);
        setIsLoading(false);
      });
  }, []);

  const onStarRatingPress = (rating: any) => {
    setStarCount(rating);
  };

  const handleReviewsdata = useCallback((agentId: number) => {
    const params = {
      agent_id: agentId,
    };

    getReviewsList(params)
      .then(res => {
        setReviewData(res?.data);
      })
      .catch(error => {
        console.log('error in handleReviewsdata', error?.response?.data);
      });
  }, []);

  useEffect(() => {
    if (agent_id) {
      handleReviewsdata(agent_id);
      getAgentDetails(agent_id);
    }
  }, [getAgentDetails, handleReviewsdata, agent_id]);

  const getSliderData = useCallback((cityId: number) => {
    handleSliderData(cityId)
      .then(res => {
        const data = res ?? [];
        const list = data.map((item: any) => ({
          id: item.id,
          image: `${BASE_URL}public${item.image_url}`,
        }));

        setSliderData(list);
      })
      .catch(error => {
        console.log('error in getSliderData', error?.response);
      });
  }, []);

  useEffect(() => {
    if (location?.city_id) {
      getSliderData(location.city_id);
    }
  }, [location?.city_id, getSliderData]);

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
      agentId: agent_id,
      click_type: appName,
      clicked_from: 'mobile',
    };
    handleInteraction(payload)
      .then(() => {
        // console.log('res in handleUserInteraction', res);
      })
      .catch(error => console.log('error in handleUserInteraction', error));
  };

  const addNewBookmark = () => {
    const payload = {
      agent_id: agent_id,
    };

    handleAddBookmark(payload)
      .then(res => {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error?.response?.message,
        });
      });
  };

  const whatsappHandler = () => {
    Linking.openURL(`whatsapp://send?phone=${agentDetails?.whatsapp_number}`)
      .catch(() => {
        Alert.alert('Error', 'Make sure WhatsApp is installed on your device');
      })
      .then(() => {
        handleUserInteraction('whatsapp');
      });
  };

  const callHandler = () => {
    Linking.openURL(`tel:${agentDetails?.phone}`).catch(err =>
      console.error('Error opening dialer:', err),
    );
    handleUserInteraction('call');
  };

  return (
    <SafeAreaView style={styles.parent}>
      <ScreenHeader
        showBackBtn
        onBackPress={() => navigation.goBack()}
        onPressProfile={() => navigation.navigate('ProfileScreen')}
        onHomePress={() => navigation.navigate('HomeScreen')}
      />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled>
        <CustomSlider
          sliderData={[
            ...sliderData,
            {image: agentDetails?.image_url ?? '', id: '999'},
          ]}
          imageContainer={{height: 200}}
        />
        <View style={styles.innerContainer}>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <View style={{flex: 1}}>
              <MagicText style={styles.titleText}>
                {agentDetails?.agency_name}
              </MagicText>
            </View>
            <View style={styles.row}>
              {/* <TouchableOpacity onPress={() => addNewBookmark()}>
                <View style={styles.bookmarkIconView}>
                  <BookmarkIcon color={COLORS.WHITE} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleShare()}
                style={styles.shareIconContainer}>
                <ShareIcon />
              </TouchableOpacity> */}
              <RatingCard rating={agentDetails?.rating} />
            </View>
          </View>
          <View style={[styles.row, {marginVertical: 5}]}>
            <LocationIcon />
            <MagicText style={styles.subText}>10 KM Away</MagicText>
          </View>
          {agentDetails?.office_address ? (
            <View style={styles.row}>
              <LocationIcon />
              <MagicText style={styles.subText}>
                {agentDetails?.office_address}
              </MagicText>
            </View>
          ) : null}

          {agentDetails?.description ? (
            <View>
              <MagicText style={styles.label}>About</MagicText>
              <MagicText style={styles.subText}>
                {agentDetails?.description}
              </MagicText>
            </View>
          ) : null}

          <View style={styles.actionRows}>
            <TouchableOpacity onPress={callHandler} style={styles.card}>
              <Image source={IMAGE.FILL_CALL_IMAGE} style={styles.icon} />
              <MagicText style={styles.subText}>Call</MagicText>
            </TouchableOpacity>

            <TouchableOpacity onPress={whatsappHandler} style={styles.card}>
              <Image source={IMAGE.WHATAPP_IMAGE} style={styles.icon} />
              <MagicText style={styles.subText}>WhatsApp</MagicText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => handleUserInteraction('location')}>
              <Image source={IMAGE.GoogleMapIcon} style={styles.icon} />
              <MagicText style={styles.subText}>Location</MagicText>
            </TouchableOpacity>
          </View>

          <HR />

          <View>
            <MagicText style={[styles.label, {marginTop: 0}]}>
              Start Your Review
            </MagicText>
            <StarRating
              onChange={rating => {
                onStarRatingPress(rating);
                navigation.navigate('AddReviewScreen', {
                  item: rating,
                  agentId: agent_id,
                });
              }}
              enableHalfStar={true}
              rating={starCount}
              maxStars={5}
              starSize={36}
              emptyColor={COLORS.GRAY}
              starStyle={styles.starIcon}
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
              keyExtractor={(item, index) => index.toString()}
              nestedScrollEnabled
              renderItem={({item, index}) => {
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    lineHeight: 28,
    color: COLORS.BLACK,
    fontWeight: 'bold',
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
  shareIconContainer: {
    backgroundColor: COLORS.SHADOW_COLOR,
    borderRadius: 20,
    padding: 4,
  },
  subText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.BLACK,
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.BLACK,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  card: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.WHITE,
    elevation: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  actionRows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 10,
  },
  starIcon: {
    width: 22,
    marginLeft: 0,
    marginRight: 16,
  },
  totalReviewView: {
    marginBottom: 12,
  },
  viewAllView: {
    height: 50,
    borderRadius: 24,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE_SMOKE,
    marginBottom: 18,
  },
  viewAllText: {
    fontSize: 14,
  },
});

export default ProprtyDetailScreen;
