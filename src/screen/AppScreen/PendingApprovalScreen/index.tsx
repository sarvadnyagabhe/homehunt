import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {PendingApprovalScreenProps} from '../../../types/appTypes';
import {COLORS} from '../../../assets/colors';
import MagicText from '../../../components/MagicText';
import {HouseAppIcon} from '../../../assets/icons';
import {useAppDispatch} from '../../../store';
import {clearAuthState} from '../../../store/slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PendingApprovalScreen = ({}: PendingApprovalScreenProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Are you sure want to exit app?', '', [
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
        {text: 'Wait'},
      ]);
      return true;
    };
    const backhandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backhandler.remove();
    };
  }, []);

  const handleLogout = async () => {
    dispatch(clearAuthState());
    await AsyncStorage.setItem('token', '');
  };

  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.container}>
        <HouseAppIcon />
        <MagicText style={styles.titleText}>Request in Process</MagicText>

        <MagicText style={styles.subText}>
          Your application is currently under review. Please wait until an admin
          accepts your request.
        </MagicText>

        <ActivityIndicator size={'large'} />

        <MagicText style={styles.subText}>
          You will be notified when your request is approved.
        </MagicText>

        <TouchableOpacity onPress={handleLogout}>
          <MagicText style={styles.logoutText}>Log Out</MagicText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE_SMOKE,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLORS.WHITE,
    width: '100%',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  titleText: {
    fontSize: 20,
    lineHeight: 30,
    color: COLORS.BLACK,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subText: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.BLACK,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 30,
  },
  logoutText: {
    fontSize: 18,
    color: COLORS.RED,
    fontWeight: '800',
  },
});

export default PendingApprovalScreen;
