import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LocationIcon} from '../../../assets/icons';
import {IMAGE} from '../../../assets/images';
import {COLORS} from '../../../assets/colors';
import MagicText from '../../../components/MagicText';
import PropertyCard from '../../../components/PropertyCard';
import {HomeScreenProps} from '../../../types/appTypes';
import {useAppDispatch, useAppSelector} from '../../../store';
import {getAllAgentList} from '../../../services/HomeService';
import SearchContainer from '../../../components/SearchContainer';
import LoadingAndErrorComponent from '../../../components/LoadingAndErrorComponent';
import CustomBack from '../../../components/CustomBack';
import {
  handleAddBookmark,
  handleSliderData,
} from '../../../services/PropertyServices';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearAuthState} from '../../../store/slice/authSlice';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import CustomSlider from '../../../components/CustomSlider';

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {id, name, area_name, city_name} = useAppSelector(
    state => state.location.location,
  );
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  console.log('area_name,city_name', city_name, '>', area_name, '>', name);

  const token = useAppSelector(state => state.auth.token);

  // const data = [
  //   {
  //     id: 1,
  //     agentName: 'Shri Sai Shyam Properties',
  //     rating: '16',
  //     address: 'Office No L-17 A, Ground Floor, Block L, Saket, Delhi - 110017',
  //     review: '2.4',
  //     media: [
  //       {id: 1, type: 'image', image: IMAGE.CARD_IMAGE},
  //       {id: 2, type: 'image', image: IMAGE.CARD_IMAGE2},
  //     ],
  //     details:
  //       'We are dedicated property dealer with over 10 years of experience in the Delhi real estate market. Specializing in luxury residential properties, Raj has successfully facilitated numerous high-end transactions, assisting clients in finding their dream homes',
  //   },
  //   {
  //     id: 2,
  //     agentName: 'Laxman Properties',
  //     rating: '10',
  //     address: 'Office No L-17 A, Ground Floor, Block L, Saket, Delhi - 110017',
  //     review: '5.4',
  //     media: [
  //       {id: 1, type: 'image', image: IMAGE.CARD_IMAGE2},
  //       {id: 2, type: 'image', image: IMAGE.CARD_IMAGE},
  //     ],
  //     details:
  //       'We are dedicated property dealer with over 10 years of experience in the Delhi real estate market. Specializing in luxury residential properties, Raj has successfully facilitated numerous high-end transactions, assisting clients in finding their dream homes',
  //   },
  //   {
  //     id: 3,
  //     agentName: 'Lokesh Properties',
  //     rating: '11',
  //     address: 'Office No L-17 A, Ground Floor, Block L, Saket, Delhi - 110017',
  //     review: '4.4',
  //     media: [
  //       {id: 1, type: 'image', image: IMAGE.CARD_IMAGE2},
  //       {id: 2, type: 'image', image: IMAGE.CARD_IMAGE},
  //     ],
  //     details:
  //       'We are dedicated property dealer with over 10 years of experience in the Delhi real estate market. Specializing in luxury residential properties, Raj has successfully facilitated numerous high-end transactions, assisting clients in finding their dream homes',
  //   },
  // ];
  const [agentList, setAgentList] = useState<any>([]);
  const [sliderData, setSliderData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAgentList = () => {
    setIsLoading(true);
    getAllAgentList(Number(id))
      .then(res => {
        console.log('res in getAgentList==>', res);
        setAgentList(res);
        setIsLoading(false);
      })
      .catch(async error => {
        await AsyncStorage.clear();
        dispatch(clearAuthState());
        console.log('error in getAgentList', error);
        setIsLoading(false);
      });
  };

  const getSliderData = () => {
    handleSliderData()
      .then(res => {
        console.log('res in getSliderData ', res);
        setSliderData(res?.data);
      })
      .catch(error => {
        console.log('error in getSliderData', error?.response);
      });
  };
  useEffect(() => {
    getAgentList();
    getSliderData();
  }, [isFocused]);

  const addNewBookmark = (agent_id: number) => {
    const payload = {
      agent_id: agent_id,
    };
    console.log(payload);

    handleAddBookmark(payload)
      .then(res => {
        console.log('res in addNewBookmark ', res);
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        getAgentList();
      })
      .catch(error => {
        console.log('error in addNewBookmark', error?.response);
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.message,
        });
      });
  };

  if (isLoading) {
    return <LoadingAndErrorComponent />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.WHITE}}>
      <ScrollView>
        <View style={styles.parent}>
          <View
            style={[
              styles.row,
              {marginBottom: 12, justifyContent: 'space-between'},
            ]}>
            <CustomBack onPress={() => navigation.goBack()} />
            <MagicText style={styles.locationCrumb}>
              {/* {city_name && area_name
                  ? `${city_name} > ${area_name} > ${name}`
                  : ` ${name}`} */}
              House App
            </MagicText>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProfileScreen');
              }}>
              <View style={styles.profileViewStyle}>
                <Image
                  source={IMAGE.PROFILE_IMAGE}
                  style={styles.profileImgStyle}
                />
              </View>
            </TouchableOpacity>
          </View>
          <SearchContainer
            value={
              city_name && area_name
                ? `${city_name} > ${area_name} > ${name}`
                : ` ${name}`
            }
            style={{
              flex: 1,
              marginBottom: 18,
              marginTop: 12,
            }}
          />

          <CustomSlider
            sliderData={[
              {type: 'image', image: IMAGE.CARD_IMAGE},
              {type: 'image', image: IMAGE.CARD_IMAGE},
            ]}
          />
          {/* <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProfileScreen');
            }}>
            <View style={styles.profileViewStyle}>
              <Image
                source={IMAGE.PROFILE_IMAGE}
                style={styles.profileImgStyle}
              />
            </View>
          </TouchableOpacity>
        </View> */}
          {agentList?.length > 0 ? (
            <View style={styles.flatlistView}>
              <FlatList
                data={agentList}
                nestedScrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.8}
                      onPress={() => {
                        navigation.navigate('ProprtyDetailScreen', {
                          data: item,
                        });
                      }}>
                      <PropertyCard
                        item={item}
                        onBookmarkPress={() => addNewBookmark(item?.agent_id)}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : (
            <LoadingAndErrorComponent errorMessage="No list found" />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: COLORS.WHITE,
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileViewStyle: {width: 40, height: 40},
  profileImgStyle: {width: '100%', height: '100%', borderRadius: 30},
  searchBarStyle: {
    flex: 1,
    backgroundColor: COLORS.WHITE_SMOKE,
    height: 44,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 12,
  },
  searchText: {fontSize: 12, marginLeft: 10},
  flatlistView: {marginBottom: 30, marginTop: 12},
  locationCrumb: {fontSize: 16, marginLeft: 12, fontWeight: '600'},
});
