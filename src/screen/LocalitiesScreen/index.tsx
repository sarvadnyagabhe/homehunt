import {
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {LocalitiesScreenProps} from '../../types/authTypes';
import {getCurrentLocation, getLocationPermission} from '../../utils';
import CustomBack from '../../components/CustomBack';
import MagicText from '../../components/MagicText';
import SearchContainer from '../../components/SearchContainer';
import {CurrentLocationIcon, LocationIcon} from '../../assets/icons';
import HR from '../../components/HR';
import {COLORS} from '../../assets/colors';
import {useDispatch} from 'react-redux';
import {setToken} from '../../store/slice/authSlice';

const data = {
  delhi: [
    {id: 1, name: 'Dwarka, New Delhi'},
    {id: 1, name: 'Laxmi Nagar, New Delhi'},
    {id: 1, name: 'Uttam Nagar, New Delhi'},
    {id: 1, name: 'Saket, New Delhi'},
  ],
};

const LocalitiesScreen = ({navigation, route}: LocalitiesScreenProps) => {
  const dispatch = useDispatch();
  const locationData = route?.params?.data;

  const handleLocation = async () => {
    const hasPermission = await getLocationPermission();
    console.log('hasPermission', hasPermission);
    if (hasPermission) {
      const location = getCurrentLocation();
      console.log('location', location);
    }
  };
  return (
    <View style={styles.parent}>
      <CustomBack />
      <MagicText style={styles.mainText}>
        Top localities in {locationData?.name}
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
        {data.delhi?.map(item => {
          return (
            <TouchableOpacity
              onPress={() => {
                //❗️TODO: remove this after login flow completed(added temporary)
                dispatch(setToken('token'));
              }}>
              <View style={styles.row}>
                <View style={styles.locationIconView}>
                  <LocationIcon />
                </View>
                <MagicText style={styles.locationText}>{item?.name}</MagicText>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
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
});
