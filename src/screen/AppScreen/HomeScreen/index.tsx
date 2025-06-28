import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CurrentLocationIcon, SearchIcon} from '../../../assets/icons';
import {COLORS} from '../../../assets/colors';
import MagicText from '../../../components/MagicText';
import PropertyCard from '../../../components/PropertyCard';
import {HomeScreenProps} from '../../../types/appTypes';
import {useAppDispatch, useAppSelector} from '../../../store';
import {getAllAgentList} from '../../../services/HomeService';
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

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {location} = useAppSelector(state => state.location);
  const {id, city_id} = location;
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const inputRef = useRef<any>(null);

  const [agentList, setAgentList] = useState<any>([]);
  const [sliderData, setSliderData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [searchList, setSearchList] = useState<any>([]);

  const getAgentList = useCallback((locationId: number) => {
    setIsLoading(true);
    getAllAgentList(locationId)
      .then(res => {
        setAgentList(res?.data);
        setIsLoading(false);
      })
      .catch(async error => {
        console.log('error in getAgentList', error);
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
      getAgentList(id ?? 0);
      getSliderData(city_id ?? 0);
    }
  }, [getAgentList, getSliderData, id, isFocused, city_id]);

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
        getAgentList(id ?? 0);
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
        getAgentList(id ?? 0);
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
        onBackPress={() => navigation.goBack()}
        onPressProfile={() => {
          navigation.navigate('ProfileScreen');
        }}
        onLoginPress={() => {
          navigation.navigate('AuthStack', {
            screen: 'LoginScreen',
          });
        }}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.parent}>
          <CustomSlider
            sliderData={[...sliderData]}
            containerStyle={styles.slider}
          />
          <SearchContainer
            placeholder="Search for area, streetname, locality"
            onChangeText={handleTextChange}
            value={searchText}
            rightIcon={<SearchIcon />}
          />

          <MagicText style={styles.locationCrumb}>
            {getBreadcrumText(location)}
          </MagicText>

          {searchList?.length > 0 && (
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
          )}

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
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE_SMOKE,
  },
  parent: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContainer: {
    flex: 1,
  },
  flatlistView: {
    marginBottom: 30,
    marginTop: 12,
  },
  locationCrumb: {
    marginBottom: 18,
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
    borderColor: COLORS.WHITE,
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
});
