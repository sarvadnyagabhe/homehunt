import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {locationType} from '../types';

const getLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else if (result === PermissionsAndroid.RESULTS.DENIED) {
        return false;
      } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Required',
          'Location permission has been permanently denied. Please enable it from settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
      }
    } catch (error) {
      return false;
    }
  }
};

const getCurrentLocation = () => {
  return Geolocation.getCurrentPosition(
    position => {
      console.log(position);
      return position;
    },
    error => {
      console.error(error.code, error.message);
      throw error;
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    },
  );
};

const getFirstInitial = (name: string) => {
  if (!name) return 'NA';
  const firstName = name.trim().split(' ')[0];
  return firstName.charAt(0);
};

const getBreadcrumText = (location: locationType) => {
  const arr: string[] = [];

  if (location?.city_name) {
    arr.push(location.city_name);
  }

  if (location?.area_name) {
    arr.push(location.area_name);
  }

  if (location?.locality_name) {
    arr.push(location.locality_name);
  }

  return arr.join(' > ');
};

export {
  getCurrentLocation,
  getLocationPermission,
  getFirstInitial,
  getBreadcrumText,
};
