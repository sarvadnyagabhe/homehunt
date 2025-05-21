import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';

const TextFieldStyle = StyleSheet.create({
  inputContainer: {
    borderColor: COLORS.GRAY,
    borderRadius: 8,
    backgroundColor: COLORS.WHITE_SMOKE,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  inputStyle: {
    flex: 1,
    padding: 0,
  },
  errStyle: {
    color: COLORS.RED,
    marginTop: 8,
    fontSize: 12,
  },
});

export default TextFieldStyle;
