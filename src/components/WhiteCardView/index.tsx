import React, {ReactNode} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {COLORS} from '../../assets/colors';

interface WhiteCardViewType {
  cardStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const WhiteCardView = ({cardStyle, ...props}: WhiteCardViewType) => {
  return <View style={[styles.cardParent, cardStyle]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  cardParent: {
    backgroundColor: COLORS.WHITE_SMOKE,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 12,
  },
});

export default WhiteCardView;
