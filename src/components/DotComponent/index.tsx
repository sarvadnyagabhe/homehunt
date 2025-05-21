import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';

type DotComponentType = {
  currentIndex?: any;
  index?: any;
  style?: StyleProp<ViewStyle>;
  activeColor?: string;
  InActiveColor?: string;
};
const DotComponent = ({
  currentIndex,
  index,
  style,
  activeColor,
  InActiveColor,
}: DotComponentType) => {
  return (
    <View style={{width: 14, marginRight: 6}}>
      <View
        key={index}
        style={[
          style,
          {
            backgroundColor:
              currentIndex == index ? activeColor : InActiveColor,
          },
          styles.dotStyle,
        ]}
      />
    </View>
  );
};

export default DotComponent;

const styles = StyleSheet.create({
  dotStyle: {
    marginRight: 12,
    width: 16,
    height: 4,
    borderRadius: 8,
  },
});
