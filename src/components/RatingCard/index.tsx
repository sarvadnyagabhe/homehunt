import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactElement, ReactNode} from 'react';
import MagicText from '../MagicText';
import {COLORS} from '../../assets/colors';
import {StarIcon} from '../../assets/icons';

type GreenComponentType = {
  componentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  label?: any;
  family?: any;
  icon?: ReactNode | ReactElement;
  rating?: string;
};
const RatingCard = ({
  componentStyle,
  labelStyle,
  label,
  family,
  icon,
  rating,
}: GreenComponentType) => {
  return (
    <View style={[styles.component, componentStyle]}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginHorizontal: 4,
        }}>
        <MagicText style={[styles.text, labelStyle]} family={family}>
          {rating}
        </MagicText>
        <StarIcon />
        {label && (
          <MagicText style={[styles.text, labelStyle]} family={family}>
            {label}
          </MagicText>
        )}
      </View>
    </View>
  );
};

export default RatingCard;

const styles = StyleSheet.create({
  component: {
    padding: 4,
    backgroundColor: COLORS.GREEN,
    borderRadius: 6,
    height: 28,
  },
  text: {
    fontSize: 14,
    color: COLORS.WHITE,
    marginRight: 4,
  },
});
