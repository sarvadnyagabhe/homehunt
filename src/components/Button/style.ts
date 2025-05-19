import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';

const ButtonStyle = StyleSheet.create({
  buttonContentStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: COLORS.RED,
  },
  disabledStyle: {
    backgroundColor: COLORS.GRAY,
  },
  outlineContainerStyle: {
    borderColor: COLORS.RED,
    borderRadius: 4,
    padding: 9,
    borderWidth: 1,
  },
  labelStyle: {
    color: COLORS.BLACK,
    fontSize: 16,
  },

  TextButtonStyle: {
    alignSelf: 'center',
  },

  TextButton: {
    color: COLORS.BLACK,
    fontSize: 16,
    lineHeight: 20,
  },
  IconButtonStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.RED,
    flex: 1,
    alignSelf: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconStyle: {
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
  primaryContainerStyle: {
    backgroundColor: COLORS.RED,
  },

  primaryLabelStyle: {
    color: COLORS.WHITE,
    fontSize: 16,
  },
  buttonIconContainer: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ButtonStyle;
