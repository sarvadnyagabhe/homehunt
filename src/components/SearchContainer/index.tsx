import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StyleProp,
  TextStyle,
  TextInput,
  TextInputProps,
  Platform,
} from 'react-native';
import React, {ReactElement, ReactNode} from 'react';
import TextField from '../TextField';
import {COLORS} from '../../assets/colors';
import {LocationIcon} from '../../assets/icons';

type SearchContainerType = {
  rightIcon?: ReactNode | ReactElement;
  leftIcon?: ReactNode | ReactElement;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onRightIconPress?: () => void;
  onLeftIconPress?: () => void;
  rightIconDisabled?: boolean;
  editable?: boolean;
  searchValue?: string;
} & TextInputProps;
const SearchContainer = ({
  rightIcon,
  leftIcon,
  style,
  inputStyle,
  onRightIconPress = () => {},
  onLeftIconPress = () => {},
  rightIconDisabled,
  editable = true,
  searchValue,
  ...TextInputProps
}: SearchContainerType) => {
  return (
    <TextField
      editable={editable}
      style={[styles.searchContainer, style]}
      inputStyle={[
        {flex: 1},
        Platform.OS === 'ios' ? {paddingVertical: 2} : {paddingVertical: 0},
        inputStyle,
      ]}
      placeholderTextColor={COLORS.BLACK}
      leftIcon={<LocationIcon />}
      onRightIconPress={onRightIconPress}
      onLeftIconPress={onLeftIconPress}
      rightIconDisabled={rightIconDisabled}
      {...TextInputProps}
    />
  );
};

export default SearchContainer;

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: COLORS.WHITE_SMOKE,
    height: 54,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
    borderRadius: 10,
    marginRight: 12,
  },
});
