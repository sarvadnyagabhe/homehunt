import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {WorkLocationScreenProps} from '../../../types/authTypes';
import CustomBack from '../../../components/CustomBack';
import MagicText from '../../../components/MagicText';
import {COLORS} from '../../../assets/colors';
import {workLocationType} from '../../../types';
import SearchContainer from '../../../components/SearchContainer';
import {searchLocalities} from '../../../services/locationSelectionServices';

const WorkLocationScreen = ({navigation}: WorkLocationScreenProps) => {
  // const [workLocations, setWorkLocations] = useState<workLocationType[]>([]);
  const [workLocations, setWorkLocations] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');

  const inputRef = useRef<any>(null);

  // const renderRightIcon = () => {
  //     if (searchText) {
  //       return (
  //         <TouchableOpacity
  //           onPress={() => {
  //             setSearchText('');
  //             setFilteredList([]);
  //           }}>
  //           <Image source={IMAGE.CloseIcon} style={styles.closeIcon} />
  //         </TouchableOpacity>
  //       );
  //     }
  //     return null;
  //   };
  const getSearchLocalitiesList = (value: string) => {
    const payload = {
      name: value,
    };
    searchLocalities(payload)
      .then(res => {
        const data = res?.data ?? [];
        console.log('response ==>', data);
      })
      .catch(error => console.log('error in getSearchLocalitiesList', error));
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
        <SearchContainer
          placeholder={'Search for city, area, localities'}
          // style={styles.searchStyle}
          onChangeText={text => {
            setSearchText(text);
            if (inputRef.current) {
              clearTimeout(inputRef.current);
            }

            inputRef.current = setTimeout(() => {
              getSearchLocalitiesList(text);
            }, 300);
          }}
          searchValue={searchText}
          // rightIcon={renderRightIcon()}
        />
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
});

export default WorkLocationScreen;
