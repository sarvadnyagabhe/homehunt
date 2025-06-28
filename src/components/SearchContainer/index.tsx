import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
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
  style,
  inputStyle,
  onRightIconPress = () => {},
  onLeftIconPress = () => {},
  rightIconDisabled,
  editable = true,
  searchValue = '',
  ...props
}: SearchContainerType) => {
  return (
    <TextField
      editable={editable}
      style={[styles.searchContainer, style]}
      inputStyle={[
        Platform.OS === 'ios' ? styles.iOSInputStyle : styles.androidInputStyle,
        inputStyle,
      ]}
      placeholderTextColor={COLORS.BLACK}
      leftIcon={<LocationIcon />}
      rightIcon={rightIcon}
      onRightIconPress={onRightIconPress}
      onLeftIconPress={onLeftIconPress}
      rightIconDisabled={rightIconDisabled}
      value={searchValue}
      {...props}
    />
  );
};

export default SearchContainer;

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: COLORS.WHITE,
    height: 54,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
    borderRadius: 10,
  },
  androidInputStyle: {
    flex: 1,
    paddingVertical: 0,
  },
  iOSInputStyle: {
    flex: 1,
    paddingVertical: 2,
  },
});
