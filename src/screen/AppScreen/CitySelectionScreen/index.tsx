import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
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
import {useAppDispatch} from '../../../store';
import {setLocation} from '../../../store/slice/locationSlice';

const CitySelectionScreen = ({navigation}: CitySelectionScreenProps) => {
  const [selectedCity, setSelectedCity] = useState<any>();
  const [locationsList, setLocationsList] = useState<any>([]);
  const dispatch = useAppDispatch();
  const getCityList = () => {
    getAllCityList()
      .then(res => {
        setLocationsList(res?.data);
        console.log('res===>', res);
      })
      .catch(error => {
        console.log('error in getting all cities', error);
      });
  };

  useEffect(() => {
    getCityList();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
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
                onSelect={(item: any) => {
                  setSelectedCity(item);
                  if (item?.name == 'Delhi') {
                    navigation.navigate('AreaSelectionScreen', {
                      item,
                    });
                  } else {
                    dispatch(setLocation(item));
                    navigation.navigate('HomeScreen', {
                      item,
                    });
                  }
                }}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
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
