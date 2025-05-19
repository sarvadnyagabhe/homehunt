import {StyleSheet, Text, View, TextProps} from 'react-native';
import React from 'react';
import {getFont} from './utils';

type MagicTextType = {
  family?:
    | 'OPENSANS_REGULAR'
    | 'OPENSANS_BOLD'
    | 'OPENSANS_MEDIUM'
    | 'OPENSANS_SEMIBOLD';

  isRequired?: boolean;
} & TextProps;
const MagicText = ({
  family = 'OPENSANS_REGULAR',
  style,
  isRequired,
  ...props
}: MagicTextType) => {
  let newStyle = getFont(family);
  return (
    <View style={{}}>
      <Text style={[newStyle, style]} {...props}>
        {props.children}
      </Text>
    </View>
  );
};

export default MagicText;

const styles = StyleSheet.create({});
