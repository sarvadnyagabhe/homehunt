import React, {useCallback, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {WorkLocationScreenProps} from '../../../types/authTypes';
import CustomBack from '../../../components/CustomBack';
import MagicText from '../../../components/MagicText';
import {COLORS} from '../../../assets/colors';
import {
  AreaType,
  CityType,
  globalLocationSearch,
  locationType,
  workLocationType,
} from '../../../types';
import SearchContainer from '../../../components/SearchContainer';
import {
  getAllAreasList,
  getAllCityList,
  searchLocalities,
} from '../../../services/locationSelectionServices';
import {LocationIcon} from '../../../assets/icons';
import {getBreadcrumText} from '../../../utils';
import {useFocusEffect} from '@react-navigation/native';
import {IMAGE} from '../../../assets/images';
import Button from '../../../components/Button';
import axios from 'axios';
import {BASE_URL, ENDPOINT} from '../../../constant/urls';
import Toast from 'react-native-toast-message';
import {useAppDispatch} from '../../../store';
import {setToken} from '../../../store/slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tempLocation = {
  id: 0,
  city_name: '',
  area_name: '',
  locality_name: '',
};

const WorkLocationScreen = ({navigation, route}: WorkLocationScreenProps) => {
  const [cityList, setCityList] = useState<CityType[]>([]);
  const [areaList, setAreaList] = useState<AreaType[]>([]);
  const [workLocations, setWorkLocations] = useState<globalLocationSearch[]>([
    tempLocation,
  ]);
  const [searchText, setSearchText] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchList, setSearchList] = useState<globalLocationSearch[]>([]);

  const inputRef = useRef<any>(null);
  const {signupPayload, token} = route.params;
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      getAllCityList()
        .then(res => {
          setCityList(res?.data ?? []);
        })
        .catch(error => {
          console.log('error in getting all cities', error);
        });
      getAllAreasList(0)
        .then(res => {
          const data: AreaType[] = (res?.data ?? []).map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              city_id: item.city_id,
            };
          });
          setAreaList(data);
        })
        .catch(error => {
          console.log('error in getting all cities', error);
        });
    }, []),
  );

  const renderRightIcon = (item: globalLocationSearch, index: number) => {
    if (item.id) {
      return (
        <TouchableOpacity
          onPress={() => {
            const locations = [...workLocations];
            locations[index] = tempLocation;
            setWorkLocations(locations);
          }}>
          <Image source={IMAGE.CloseIcon} style={styles.closeIcon} />
        </TouchableOpacity>
      );
    }
    return null;
  };
  const getSearchLocalitiesList = (value: string) => {
    const payload = {
      name: value,
    };
    searchLocalities(payload)
      .then(res => {
        const data = res?.data ?? [];
        setSearchList(data);
      })
      .catch(error => console.log('error in getSearchLocalitiesList', error));
  };

  const handleLocationPress = (item: globalLocationSearch) => {
    setSearchList([]);
    setSearchText('');
    const locations = [...workLocations];
    locations[activeIndex] = item;
    setWorkLocations(locations);
  };

  const addLocation = () => {
    const locations = [...workLocations, tempLocation];
    setWorkLocations(locations);
  };

  const handleSignup = () => {
    const locations: workLocationType[] = workLocations.map(item => {
      const area = areaList.find(areaObj => areaObj.name === item.area_name);
      const city = cityList.find(cityObj => cityObj.name === item.city_name);
      return {
        location_id: item.id,
        area_id: area?.id ?? null,
        city_id: city?.id ?? null,
      };
    });

    axios
      .patch(`${BASE_URL}${ENDPOINT.update_agent_profile}`, signupPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        const payload = {location: locations};

        axios
          .post(`${BASE_URL}${ENDPOINT.work_location}`, payload, {
            headers: {Authorization: `Bearer ${token}`},
          })
          .then(async () => {
            dispatch(setToken(token));
            await AsyncStorage.setItem('token', token);
            Toast.show({
              type: 'success',
              text1: 'Account created successfully',
            });
            navigation.navigate('HomeScreenStack', {
              screen: 'PendingApprovalScreen',
            });
          });
      })
      .catch(error => {
        console.log('error in handleSignup:', error);
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.message,
        });
      });
  };

  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.row}>
        <CustomBack onPress={() => navigation.goBack()} />
        <View style={styles.signinView}>
          <MagicText style={styles.signinText}>Sign Up</MagicText>
        </View>
      </View>

      <View style={styles.container}>
        <MagicText style={styles.titleText}>
          Select Your Working Locations
        </MagicText>

        <ScrollView style={{flex: 1}} nestedScrollEnabled>
          {workLocations.map((item, index) => {
            return (
              <SearchContainer
                placeholder={'Search for city, area, localities'}
                style={styles.searchStyle}
                onChangeText={text => {
                  setSearchText(text);
                  setActiveIndex(index);
                  if (inputRef.current) {
                    clearTimeout(inputRef.current);
                  }

                  inputRef.current = setTimeout(() => {
                    getSearchLocalitiesList(text);
                  }, 300);
                }}
                searchValue={
                  item.id
                    ? getBreadcrumText(item as locationType).replaceAll(
                        ' > ',
                        ', ',
                      )
                    : searchText
                }
                rightIcon={renderRightIcon(item, index)}
              />
            );
          })}

          {searchList.length > 0 && (
            <View style={styles.searchView}>
              <ScrollView nestedScrollEnabled>
                {searchList.map(item => {
                  return (
                    <View style={styles.searchItem} key={item.id}>
                      <TouchableOpacity
                        onPress={() => handleLocationPress(item)}
                        style={styles.searchRow}>
                        <LocationIcon />
                        <MagicText style={styles.searchText}>
                          {getBreadcrumText(item as locationType)}
                        </MagicText>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </ScrollView>

        <View style={styles.buttonRow}>
          <Button
            label="Add Location"
            style={{flex: 1}}
            onPress={addLocation}
            labelStyle={styles.btnLabel}
          />
          <Button
            label="Sign Up"
            style={{flex: 1}}
            labelStyle={styles.btnLabel}
            onPress={handleSignup}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE_SMOKE,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  signinText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
  signinView: {
    flex: 1,
    marginRight: 40,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  titleText: {
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '700',
    marginBottom: 15,
  },
  searchView: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: COLORS.WHITE,
    maxHeight: 250,
  },
  searchItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
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
  closeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 20,
  },
  searchStyle: {
    marginBottom: 15,
  },
  btnLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WorkLocationScreen;
