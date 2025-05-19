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
    <View style={{width: 10, marginRight: 2, marginLeft: 2}}>
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
    width: 8,
    height: 8,
    borderRadius: 8,
  },
});
