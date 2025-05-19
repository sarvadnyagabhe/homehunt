import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import MagicText from '../MagicText';
import {COLORS} from '../../assets/colors';
type CitySelectionCardType = {
  item: any;
  onSelect: (selectedCity: string) => void;
};
const CitySelectionCard = ({
  item,
  onSelect = () => {},
}: CitySelectionCardType) => {
  const width = Dimensions.get('screen').width / 2 - 30;
  const styles = getStyles(width);
  const Icon = item?.icon;
  return (
    <Pressable style={styles.parent} onPress={() => onSelect(item)}>
      <View style={styles.cardStyle}>
        <View style={styles.iconView}>
          <Icon />
        </View>
        <MagicText style={styles.cityName}>{item?.name}</MagicText>
      </View>
    </Pressable>
  );
};

export default CitySelectionCard;

const getStyles = (width: number) => {
  return StyleSheet.create({
    parent: {
      width: width,
      height: 160,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.WHITE_SMOKE,
      marginRight: 5,
      marginLeft: 5,
      marginBottom: 10,
    },
    iconView: {flex: 1, justifyContent: 'center'},
    cardStyle: {alignItems: 'center'},
    cityName: {fontSize: 14, marginBottom: 14, fontWeight: '800'},
  });
};
