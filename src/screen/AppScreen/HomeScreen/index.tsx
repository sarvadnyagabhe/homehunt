import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CurrentLocationIcon} from '../../../assets/icons';
import {COLORS} from '../../../assets/colors';
import MagicText from '../../../components/MagicText';
import PropertyCard from '../../../components/PropertyCard';
import {HomeScreenProps} from '../../../types/appTypes';
import {useAppDispatch, useAppSelector} from '../../../store';
import {getPublicAgentList} from '../../../services/HomeService';
import SearchContainer from '../../../components/SearchContainer';
import LoadingAndErrorComponent from '../../../components/LoadingAndErrorComponent';
import {
  handleAddBookmark,
  handleSliderData,
} from '../../../services/PropertyServices';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import CustomSlider from '../../../components/CustomSlider';
import {searchLocalities} from '../../../services/locationSelectionServices';
import {setLocation} from '../../../store/slice/locationSlice';
import ScreenHeader from '../../../components/ScreenHeader';
import {BASE_URL} from '../../../constant/urls';
import {getBreadcrumText} from '../../../utils';
import {AgentUserType} from '../../../types';
import LoginModal from '../../../components/LoginModal';

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {location} = useAppSelector(state => state.location);
  const {token} = useAppSelector(state => state.auth);
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const inputRef = useRef<any>(null);

  const [agentList, setAgentList] = useState<AgentUserType[]>([]);
  const [sliderData, setSliderData] = useState<{id: string; image: string}[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [searchList, setSearchList] = useState<any>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const getAgentList = useCallback((locationId: number) => {
    setIsLoading(true);
    getPublicAgentList(locationId)
      .then(res => {
        const list = (res?.data ?? []).filter(
          (item: any) => item.agency_name && item.name,
        );
        setAgentList(list);
        setIsLoading(false);
      })
      .catch(async error => {
        console.log('error in getPublicAgentList', error);
        setIsLoading(false);
      });
  }, []);

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
    if (isFocused) {
      getAgentList(location?.id ?? 0);
      getSliderData(location?.city_id ?? 0);
    }
  }, [getAgentList, getSliderData, location?.id, isFocused, location?.city_id]);

  const addNewBookmark = (agent_id: number) => {
    const payload = {
      agent_id: agent_id,
    };

    handleAddBookmark(payload)
      .then(res => {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        getAgentList(location?.id ?? 0);
      })
      .catch(error => {
        console.log('error in addNewBookmark', error?.response);
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.message,
        });
      });
  };

  const getSearchLocalitiesList = (searchString: string) => {
    const payload = {
      name: searchString,
    };
    searchLocalities(payload)
      .then(res => {
        if (res) {
          const data = res?.data?.map((item: any) => {
            return {
              ...item,
              name: item?.locality_name,
            };
          });
          setSearchList(data);
        }
      })
      .catch(error => console.log('error in getSearchLocalitiesList', error));
  };

  const handleTextChange = (text: string) => {
    setSearchText(text);
    if (inputRef.current) {
      clearTimeout(inputRef.current);
    }

    inputRef.current = setTimeout(() => {
      if (text.length >= 0) {
        getSearchLocalitiesList(text);
      } else {
        getAgentList(location?.id ?? 0);
      }
    }, 300);
  };

  if (isLoading) {
    return <LoadingAndErrorComponent />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        showBackBtn
        onBackPress={() => navigation.navigate('CitySelectionScreen')}
        onPressProfile={() => {
          navigation.navigate('ProfileScreen');
        }}
        onLoginPress={() => {
          navigation.navigate('AuthStack', {
            screen: 'LoginScreen',
          });
        }}
        onHomePress={() => navigation.navigate('HomeScreen')}
      />
      <ScrollView style={styles.scrollContainer} nestedScrollEnabled>
        <View style={styles.parent}>
          <SearchContainer
            placeholder="Search for area, streetname, locality"
            onChangeText={handleTextChange}
            value={searchText}
          />
          <MagicText style={styles.locationCrumb}>
            {getBreadcrumText(location)}
          </MagicText>

          <CustomSlider
            sliderData={[...sliderData]}
            containerStyle={styles.slider}
            imageStyle={styles.sliderImage}
          />

          {searchList?.length > 0 ? (
            <View style={styles.searchView}>
              <ScrollView nestedScrollEnabled={true}>
                {searchList?.map((item: any) => {
                  return (
                    <View style={styles.searchItem}>
                      <TouchableOpacity
                        onPress={async () => {
                          getAgentList(item?.id);
                          setSearchList([]);
                          setSearchText('');
                          dispatch(setLocation(item));
                          await AsyncStorage.setItem(
                            'location',
                            JSON.stringify(item),
                          );
                        }}
                        style={styles.searchRow}>
                        <CurrentLocationIcon />
                        <MagicText style={styles.searchText}>
                          {item?.locality_name}
                        </MagicText>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          ) : null}

          {agentList?.length > 0 ? (
            <View style={styles.flatlistView}>
              <FlatList
                data={agentList}
                nestedScrollEnabled={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                  return (
                    <PropertyCard
                      item={item}
                      onBookmarkPress={() => addNewBookmark(item?.agent_id)}
                      onPress={() => {
                        if (token) {
                          navigation.navigate('ProprtyDetailScreen', {
                            agent_id: item.agent_id,
                          });
                        } else {
                          setShowLoginModal(true);
                        }
                      }}
                      containerStyle={{marginBottom: 15}}
                    />
                  );
                }}
              />
            </View>
          ) : (
            <LoadingAndErrorComponent errorMessage="No list found" />
          )}
        </View>
      </ScrollView>
      <LoginModal
        isVisible={showLoginModal}
        closeModal={() => {
          setShowLoginModal(false);
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  parent: {
    flex: 1,
    padding: 15,
  },
  scrollContainer: {
    flex: 1,
  },
  flatlistView: {
    marginBottom: 30,
    marginTop: 12,
    backgroundColor: COLORS.WHITE,
  },
  locationCrumb: {
    // marginBottom: 18,
    marginTop: 8,
    marginLeft: 12,
    color: COLORS.TEXT_GRAY,
  },
  slider: {
    marginBottom: 15,
  },
  searchView: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: COLORS.WHITE_SMOKE,
    maxHeight: 200,
  },
  searchItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 0.8,
    borderColor: COLORS.WHITE_SMOKE,
    borderRadius: 4,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    fontSize: 16,
    marginLeft: 12,
  },
  sliderImage: {
    borderRadius: 12,
    height: 150,
  },
});
