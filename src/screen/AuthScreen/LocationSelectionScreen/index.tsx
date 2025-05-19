import {
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {LocationSelectionScreenProps} from '../../../types/authTypes';
import MagicText from '../../../components/MagicText';
import SearchContainer from '../../../components/SearchContainer';
import CustomBack from '../../../components/CustomBack';
import {COLORS} from '../../../assets/colors';
import {CurrentLocationIcon, LocationIcon} from '../../../assets/icons';
import HR from '../../../components/HR';
import {getCurrentLocation, getLocationPermission} from '../../../utils';
const data = {
  delhi: [
    {id: 1, name: 'North Delhi'},
    {id: 1, name: 'East Delhi'},
    {id: 1, name: 'West Delhi'},
    {id: 1, name: 'South Delhi'},
  ],
  gurugram: [
    {id: 1, name: 'North gurugram'},
    {id: 1, name: 'East gurugram'},
    {id: 1, name: 'West gurugram'},
    {id: 1, name: 'South gurugram'},
  ],
};

const LocationSelectionScreen = ({
  navigation,
  route,
}: LocationSelectionScreenProps) => {
  const cityData = route?.params?.data;

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
        Select your location in {cityData?.name}
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('LocalitiesScreen', {data: data.delhi})
          }>
          <View style={styles.row}>
            <View style={styles.locationIconView}>
              <LocationIcon />
            </View>
            <MagicText style={styles.locationText}>North delhi</MagicText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationSelectionScreen;

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
