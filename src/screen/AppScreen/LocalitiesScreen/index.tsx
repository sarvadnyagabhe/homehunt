import {
  FlatList,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {getCurrentLocation, getLocationPermission} from '../../../utils';
import CustomBack from '../../../components/CustomBack';
import MagicText from '../../../components/MagicText';
import SearchContainer from '../../../components/SearchContainer';
import {CurrentLocationIcon, LocationIcon} from '../../../assets/icons';
import HR from '../../../components/HR';
import {COLORS} from '../../../assets/colors';
import {useDispatch} from 'react-redux';
import {setToken} from '../../../store/slice/authSlice';
import {LocalitiesScreenProps} from '../../../types/appTypes';
import {
  getAllLocalitiesList,
  searchLocalities,
} from '../../../services/locationSelectionServices';
import {setLocation} from '../../../store/slice/locationSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocalitiesScreen = ({navigation, route}: LocalitiesScreenProps) => {
  const [localitiesList, setLocalitiesList] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>('');

  const dispatch = useDispatch();
  const area = route?.params?.item;
  const city = route?.params?.city;

  const handleLocation = async () => {
    const hasPermission = await getLocationPermission();

    if (hasPermission) {
      const location = getCurrentLocation();
      console.log('location', location);
    }
  };

  const getLocalitiesList = () => {
    let payload = {
      cityId: city?.id,
      areaId: undefined,
    };
    if (city == 'Delhi') {
      payload = {
        ...payload,
        areaId: area?.id,
      };
    }
    getAllLocalitiesList(payload)
      .then(res => {
        setLocalitiesList(res?.data);
        console.log('res in localitiesList', res?.data);
      })
      .catch(error => {
        console.log('error in getting all areas', error);
      });
  };

  const getSearchLocalitiesList = (searchText: string) => {
    const payload = {
      name: searchText,
    };
    searchLocalities(payload)
      .then(res => {
        console.log('res in getSearchLocalitiesList:', res);
        if (res) {
          const data = res?.data?.map((item: any) => {
            return {
              ...item,
              name: item?.locality_name,
            };
          });
          setLocalitiesList(data);
        }
      })
      .catch(error => console.log('error in getSearchLocalitiesList', error));
  };

  // useEffect(() => {
  //   if (searchText?.length > 0) {
  //     getSearchLocalitiesList(searchText);
  //   } else {
  //     getLocalitiesList();
  //   }
  // }, [searchText]);

  useEffect(() => {
    getLocalitiesList();
  }, []);

  const handleOnPress = async (item: any) => {
    if (item?.city_name && item?.area_name) {
      dispatch(setLocation(item));
      await AsyncStorage.setItem('location', JSON.stringify(item));
      navigation.navigate('HomeScreen');
    } else {
      dispatch(
        setLocation({
          ...item,
          city_name: city?.name,
          area_name: area?.name,
        }),
      );

      await AsyncStorage.setItem('location', JSON.stringify(item));
      navigation.navigate('HomeScreen');
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.parent}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CustomBack onPress={() => navigation.goBack()} />
          <MagicText
            style={
              styles.locationCrumb
            }>{`${city?.name} > ${area?.name}`}</MagicText>
        </View>
        <MagicText style={styles.mainText}>
          Top localities in {area?.name}
        </MagicText>
        <SearchContainer
          placeholder="Search for area, street name, locality..."
          style={styles.searchStyle}
          onChangeText={name => setSearchText(name)}
        />
        {/* <View style={styles.row}>
          <View style={styles.currentLocationView}>
            <CurrentLocationIcon />
          </View>
          <TouchableOpacity onPress={() => handleLocation()}>
            <MagicText style={styles.currentLocationText}>
              Choose Current Location
            </MagicText>
          </TouchableOpacity>
        </View> */}
        <HR style={styles.hrView} />

        <View>
          <FlatList
            data={localitiesList}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={async () => {
                    handleOnPress(item);
                  }}>
                  <View style={styles.row}>
                    <View style={styles.locationIconView}>
                      <LocationIcon />
                    </View>
                    <MagicText style={styles.locationText}>
                      {item?.name}
                    </MagicText>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LocalitiesScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 24,
    backgroundColor: COLORS.WHITE,
  },
  mainText: {
    fontSize: 24,
    marginTop: 22,
    marginBottom: 12,
  },
  searchStyle: {marginHorizontal: 8, marginBottom: 16},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  currentLocationView: {
    marginRight: 14,
  },
  locationIconView: {
    marginRight: 14,
  },
  currentLocationText: {fontSize: 14, color: COLORS.TEXT_GRAY},
  locationText: {fontSize: 14},
  hrView: {marginTop: 24},
  locationCrumb: {fontSize: 16, marginLeft: 12, fontWeight: '600'},
});
