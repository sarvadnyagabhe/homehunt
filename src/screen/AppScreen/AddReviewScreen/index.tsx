import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AddReviewScreenProps} from '../../../types/appTypes';
import MagicText from '../../../components/MagicText';
import StarRating from 'react-native-star-rating-widget';
import {COLORS} from '../../../assets/colors';
import CustomBack from '../../../components/CustomBack';
import CircleBgCard from '../../../components/CircleBgCard';
import Button from '../../../components/Button';
import TextField from '../../../components/TextField';
import {CameraIcon} from '../../../assets/icons';
import {AddNewReview} from '../../../services/PropertyServices';
import Toast from 'react-native-toast-message';

const AddReviewScreen = ({navigation, route}: AddReviewScreenProps) => {
  const data = [
    {label: 'Market Knowledge'},
    {label: 'Communication'},
    {label: 'Negotiation Skills'},
    {label: 'Professionlism'},
  ];
  //TODO: temporary added,remove later
  const agent_id = 21;

  const review = route?.params?.item;
  const [reviewCount, setReviewCount] = useState<any>(0);
  const [selectedReview, setSelectedReview] = useState<any>([]);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    setReviewCount(review);
  }, []);

  const handleReview = (item: any) => {
    let newList = [...selectedReview];
    const isExists = selectedReview?.includes(item?.label);

    if (isExists) {
      newList = newList.filter(ele => ele !== item?.label);
    } else {
      newList.unshift(item?.label);
    }
    setSelectedReview(newList);
  };

  const handleReviewSubmit = () => {
    const payload = {
      agent_id: agent_id,
      comment: comment,
      rating: reviewCount,
    };
    AddNewReview(payload)
      .then(res => {
        console.log('res in handleReviewSubmit ', res);
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        navigation.goBack();
      })
      .catch(error => {
        console.log('error in handleReviewSubmit: ', error);
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.message,
        });
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.parent}>
        <View style={styles.row}>
          <CustomBack onPress={() => navigation.goBack()} />
          <View style={styles.header}>
            <MagicText style={styles.headerText}>Goodwill Properties</MagicText>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <MagicText style={styles.description}>
            Reviews are public and include your info
          </MagicText>
          <StarRating
            onChange={rating => {
              setReviewCount(rating);
            }}
            enableHalfStar={true}
            rating={reviewCount}
            maxStars={5}
            starSize={45}
            emptyColor={COLORS.GRAY}
            starStyle={{
              width: 38,
              marginLeft: 0,
              marginRight: 16,
            }}
            style={{
              marginBottom: 6,
            }}
          />

          {/* <View style={[styles.row, {marginTop: 12}]}>
            {data?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => handleReview(item)}
                  style={styles.reviewCard}>
                  <CircleBgCard
                    key={index}
                    roundViewStyle={[
                      styles.roundViewStyle,
                      {
                        backgroundColor: selectedReview?.includes(item?.label)
                          ? COLORS.RATING_BGCOLOR
                          : COLORS.WHITE_SMOKE,
                      },
                    ]}>
                    <MagicText
                      style={[
                        styles.reviewText,
                        selectedReview?.includes(item?.label)
                          ? {color: COLORS.WHITE}
                          : {color: COLORS.BLACK},
                      ]}>
                      {item?.label}
                    </MagicText>
                  </CircleBgCard>
                </TouchableOpacity>
              );
            })}
          </View> */}
          <View style={{marginTop: 18}}>
            <TextField
              placeholder="Describe your experience(Optinal)"
              numberOfLines={4}
              multiline={true}
              style={styles.inputStyle}
              onChangeText={text => setComment(text)}
            />
            {/* <View style={{alignSelf: 'flex-start', marginTop: 18}}>
            <CircleBgCard roundViewStyle={styles.roundViewStyle}>
              <CameraIcon />
            </CircleBgCard>
          </View> */}
          </View>
          {/* <Button
          label="Next"
          style={styles.btnStyle}
          onPress={() => navigation.navigate('ReviewDetailsScreen')}
        /> */}
          <Button
            label="Submit"
            style={styles.btnStyle}
            onPress={() => handleReviewSubmit()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddReviewScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 10,
    paddingTop: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    marginLeft: -22,
    marginRight: 22,
  },
  headerText: {
    fontSize: 14,
  },
  description: {fontSize: 14, marginBottom: 12},
  reviewText: {fontSize: 14},
  btnStyle: {marginHorizontal: 30, marginTop: 20},
  reviewCard: {
    width: '50%',
    alignItems: 'center',
  },
  roundViewStyle: {
    marginBottom: 16,
    width: '90%',
    alignItems: 'center',
  },
  inputStyle: {height: 145, borderRadius: 16},
});
