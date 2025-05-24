import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomBack from '../../../components/CustomBack';
import MagicText from '../../../components/MagicText';
import {COLORS} from '../../../assets/colors';
import {
  BookmarkIcon,
  CallIcon,
  CameraIcon,
  EmailIcon,
  FormProfileIcon,
  ProfileIcon,
  VerifiedIcon,
} from '../../../assets/icons';
import TextField from '../../../components/TextField';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Button from '../../../components/Button';
import {ProfileScreennProps} from '../../../types/appTypes';
const ProfileScreen = ({navigation}: ProfileScreennProps) => {
  const isVerified = true;
  const handleValidation = yup.object().shape({
    name: yup.string().required('Name is required'),
    phone: yup.string().required('Phone is required'),
    email: yup.string().required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
    },
    validationSchema: handleValidation,
    onSubmit: (values: any) => {},
  });
  return (
    <View style={styles.parent}>
      <View style={styles.row}>
        <CustomBack />
        <View style={styles.header}>
          <MagicText style={styles.headerText}>Your Profile</MagicText>
        </View>
      </View>
      <View style={styles.formView}>
        <View style={styles.roundView}>
          <ProfileIcon />
          <View style={styles.absoluteView}>
            <CameraIcon />
          </View>
        </View>
      </View>

      <View style={{flex: 1, marginTop: 14}}>
        <TextField
          placeholder="Name"
          leftIcon={<FormProfileIcon />}
          style={styles.textFieldStyle}
          value={formik.values.name}
          onChangeText={name => formik.setFieldValue('name', name)}
        />
        {formik.errors.name && (
          <MagicText style={styles.errorLabel}>{formik.errors.name}</MagicText>
        )}

        <TextField
          placeholder="Phone"
          leftIcon={<CallIcon />}
          rightIcon={isVerified && <VerifiedIcon />}
          style={styles.textFieldStyle}
          value={formik.values.phone}
          onChangeText={phone => formik.setFieldValue('phone', phone)}
        />
        {formik.errors.phone && (
          <MagicText style={styles.errorLabel}>{formik.errors.phone}</MagicText>
        )}

        <TextField
          placeholder="Email"
          leftIcon={<EmailIcon />}
          style={styles.textFieldStyle}
          value={formik.values.email}
          onChangeText={email => formik.setFieldValue('email', email)}
        />
        {formik.errors.email && (
          <MagicText style={styles.errorLabel}>{formik.errors.email}</MagicText>
        )}
        <MagicText>Terms of service</MagicText>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('SavedScreen')}>
          <View style={[styles.row, {marginTop: 22}]}>
            <View style={styles.bookmarkRound}>
              <BookmarkIcon color={COLORS.BLACK} />
            </View>
            <MagicText style={styles.savedText}>Saved Agents</MagicText>
          </View>
        </TouchableOpacity>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ExpertsScreen')}
            activeOpacity={0.7}>
            <View style={styles.getHelpView}>
              <MagicText style={styles.getHelpText}>Get Expert Help</MagicText>
              <MagicText style={styles.sellbuyText}>
                Sell, Buy or Rent
              </MagicText>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.row,
            {
              flex: 1,
              justifyContent: 'space-between',
            },
          ]}>
          <MagicText style={styles.agentText}>Become Agent</MagicText>
          <MagicText style={styles.logout}>Log out</MagicText>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingTop: 12,
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    marginLeft: -22,
    marginRight: 22,
  },
  headerText: {
    fontSize: 14,
  },
  formView: {
    alignItems: 'center',
    marginTop: 28,
  },
  roundView: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_SMOKE,
    marginBottom: 18,
    alignItems: 'center',
  },
  bookmarkRound: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_SMOKE,
    alignItems: 'center',
    marginRight: 12,
  },
  absoluteView: {position: 'absolute', bottom: 26, right: -2},
  textFieldStyle: {marginBottom: 18},
  btnStyle: {marginTop: 18, paddingVertical: 16},
  errorLabel: {
    fontSize: 12,
    marginBottom: 12,
    marginTop: -10,
    marginLeft: 12,
    color: COLORS.RED,
  },
  getHelpView: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.GREEN,
    paddingVertical: 10,
    marginHorizontal: 24,
  },
  getHelpText: {fontSize: 16, color: COLORS.GREEN, marginBottom: 2},
  sellbuyText: {fontSize: 12, color: COLORS.RED},
  savedText: {fontSize: 14},
  agentText: {fontSize: 16, fontWeight: '700', color: COLORS.GREEN},
  logout: {fontSize: 16, fontWeight: '700', color: COLORS.RED},
});
