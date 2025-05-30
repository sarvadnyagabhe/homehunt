import {
  FlatList,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MagicText from '../../../components/MagicText';
import SearchContainer from '../../../components/SearchContainer';
import CustomBack from '../../../components/CustomBack';
import {COLORS} from '../../../assets/colors';
import {CurrentLocationIcon, LocationIcon} from '../../../assets/icons';
import HR from '../../../components/HR';
import {getCurrentLocation, getLocationPermission} from '../../../utils';
import {AreaSelectionScreenProps} from '../../../types/appTypes';
import {getAllAreasList} from '../../../services/locationSelectionServices';

const AreaSelectionScreen = ({navigation, route}: AreaSelectionScreenProps) => {
  const city = route?.params?.item;

  const [locationCoords, setLocationCoords] = useState<any>();
  const [areaList, setAreaList] = useState<any>([]);

  const handleLocation = async () => {
    const hasPermission = await getLocationPermission();

    if (hasPermission) {
      const location = getCurrentLocation();
      setLocationCoords(location);
    }
  };

  const getAreaList = () => {
    getAllAreasList(city.id)
      .then(res => {
        setAreaList(res?.data);
      })
      .catch(error => {
        console.log('error in getting all areas', error);
      });
  };

  useEffect(() => {
    getAreaList();
  }, []);

  return (
    <View style={styles.parent}>
      <CustomBack />
      <MagicText style={styles.mainText}>
        Select your location in {city?.name}
      </MagicText>
      <SearchContainer
        style={styles.searchStyle}
        searchText="Search for area, street name, locality..."
      />
      <View style={styles.row}>
        <View style={styles.currentLocationView}>
          <CurrentLocationIcon />
        </View>
        <TouchableOpacity onPress={() => handleLocation()}>
          <MagicText style={styles.currentLocationText}>
            Choose Current Location
          </MagicText>
        </TouchableOpacity>
      </View>
      <HR style={styles.hrView} />

      <View>
        <FlatList
          data={areaList}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('LocalitiesScreen', {
                    item,
                    city,
                  })
                }>
                <View style={styles.row} key={index}>
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
  );
};

export default AreaSelectionScreen;

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
});
