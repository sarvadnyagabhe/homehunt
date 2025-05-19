import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BackArrowIcon} from '../../assets/icons';
import {COLORS} from '../../assets/colors';

const CustomBack = () => {
  return (
    <View>
      <View style={styles.roundView}>
        <BackArrowIcon />
      </View>
    </View>
  );
};

export default CustomBack;

const styles = StyleSheet.create({
  roundView: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE_SMOKE,
  },
});
