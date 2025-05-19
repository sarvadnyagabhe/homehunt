import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
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
import {CitySelectionScreenProps} from '../../../types/authTypes';
import CustomBack from '../../../components/CustomBack';

const CitySelectionScreen = ({navigation}: CitySelectionScreenProps) => {
  const cityData = [
    {id: 1, name: 'DELHI', icon: DelhiIcon},
    {id: 2, name: 'GURUGRAM', icon: GurugramIcon},
    {id: 3, name: 'NOIDA', icon: NoidaIcon},
    {id: 4, name: 'GREATER NOIDA', icon: GreaterNoidaIcon},
    {id: 5, name: 'GAZIABAD', icon: GhaziabadIcon},
  ];
  const [selectedCity, setSelectedCity] = useState<any>();
  return (
    <View style={styles.parent}>
      <CustomBack />
      <MagicText style={{fontSize: 24}}>Select your city</MagicText>
      <SearchContainer
        searchText={'Search for city'}
        style={styles.searchStyle}
      />
      <View style={styles.cityCardView}>
        {cityData?.map((item, index) => {
          return (
            <CitySelectionCard
              key={index}
              item={item}
              onSelect={item => {
                setSelectedCity(item);
                navigation.navigate('LocationSelectionScreen', {data: item});
              }}
            />
          );
        })}
      </View>
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
  },
});
