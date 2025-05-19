import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import MagicText from '../MagicText';
import {SearchIcon} from '../../assets/icons';
import {COLORS} from '../../assets/colors';
type SearchContainerType = {
  style?: StyleProp<ViewStyle>;
  searchText: string;
};
const SearchContainer = ({style, searchText}: SearchContainerType) => {
  return (
    <View style={[styles.parent, style]}>
      <View style={styles.row}>
        <View style={styles.searchView}>
          <SearchIcon />
        </View>
        <MagicText style={styles.searchText}>{searchText}</MagicText>
      </View>
    </View>
  );
};

export default SearchContainer;

const styles = StyleSheet.create({
  parent: {marginTop: 20},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchView: {paddingRight: 10},
  searchText: {fontSize: 16, color: COLORS.TEXT_GRAY},
});
