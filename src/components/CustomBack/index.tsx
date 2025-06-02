import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BackArrowIcon} from '../../assets/icons';
import {COLORS} from '../../assets/colors';
type CustomBackType = {
  onPress: () => void;
};
const CustomBack = ({onPress = () => {}}: CustomBackType) => {
  return (
    <View>
      <TouchableOpacity onPress={() => onPress()}>
        <View style={styles.roundView}>
          <BackArrowIcon />
        </View>
      </TouchableOpacity>
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
