import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MagicText from '../../../components/MagicText';
import SearchContainer from '../../../components/SearchContainer';
import CitySelectionCard from '../../../components/CitySelectionCard';
import {COLORS} from '../../../assets/colors';
import {
  DelhiIcon,
  GhaziabadIcon,
  GreaterNoidaIcon,
  GurugramIcon,
  NoidaIcon,
} from '../../../assets/icons';

import {getAllCityList} from '../../../services/locationSelectionServices';
import {CitySelectionScreenProps} from '../../../types/appTypes';

const CitySelectionScreen = ({navigation}: CitySelectionScreenProps) => {
  const [selectedCity, setSelectedCity] = useState<any>();
  const [locationsList, setLocationsList] = useState<any>([]);

  const getCityList = () => {
    getAllCityList()
      .then(res => {
        setLocationsList(res?.data);
      })
      .catch(error => {
        console.log('error in getting all cities', error);
      });
  };

  useEffect(() => {
    getCityList();
  }, []);

  return (
    <View style={styles.parent}>
      {/* <CustomBack /> */}
      <MagicText style={{fontSize: 24}}>Select your city</MagicText>
      <SearchContainer
        searchText={'Search for city'}
        style={styles.searchStyle}
      />
      <FlatList
        data={locationsList}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <CitySelectionCard
              key={index}
              item={item}
              onSelect={item => {
                setSelectedCity(item);
                navigation.navigate('AreaSelectionScreen', {
                  item,
                });
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default CitySelectionScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.WHITE,
    paddingTop: 18,
  },
  searchStyle: {
    marginTop: 22,
    marginBottom: 16,
  },
  cityCardView: {
    marginTop: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'red',
  },
});
