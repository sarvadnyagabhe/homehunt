import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SignupScreenProps} from '../../../types/authTypes';
import MagicText from '../../../components/MagicText';
import CustomBack from '../../../components/CustomBack';
import {COLORS} from '../../../assets/colors';
import {
  CallIcon,
  CameraIcon,
  EmailIcon,
  FormProfileIcon,
  OverviewIcon,
  ProfileIcon,
} from '../../../assets/icons';
import TextField from '../../../components/TextField';
import Button from '../../../components/Button';
import {FormikValues, useFormik} from 'formik';
import * as yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {BASE_URL, ENDPOINT} from '../../../constant/urls';
import axios from 'axios';

const SignupScreen = ({navigation, route}: SignupScreenProps) => {
  const {mobile_number, token} = route.params;

  const handleImagePicker = () => {
    launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 10,
      maxHeight: 250,
      maxWidth: 250,
    }).then(response => {
      formik.setFieldValue('images', [
        ...formik.values.images,
        ...(response.assets ?? []),
      ]);
    });
  };

  const handleProfile = () => {
    launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    }).then(response => {
      formik.setFieldValue('profile_image', response.assets?.[0] ?? null);
    });
  };

  const handleValidation = yup.object().shape({
    agency_name: yup.string().required('Agency name is required.'),
    agent_name: yup
      .string()
      .required('Agent Name is required')
      .matches(/^[a-zA-Z\s]+$/, 'Agent Name must contain only letters'),
    whatsapp_number: yup
      .string()
      .required('WhatsApp number is required')
      .matches(
        /^(\+91[\-\s]?)?[6-9]\d{9}$/,
        'Please enter valid whatsapp number.',
      ),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter valid email address.',
      )
      .notRequired(),
    overview: yup.string().max(200).notRequired(),
    images: yup
      .array()
      .of(yup.mixed().required('Image is required'))
      .min(1, 'At least one image is required'),
    profile_image: yup.mixed().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      agency_name: '',
      agent_name: '',
      whatsapp_number: '',
      email: '',
      overview: '',
      images: [],
      profile_image: null,
    },
    validationSchema: handleValidation,
    onSubmit: values => {
      handleSignup(values);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleSignup = (values: FormikValues) => {
    if (formik.isValid) {
      const formData = new FormData();
      formData.append('name', values.agent_name);
      formData.append('agency_name', values.agency_name);
      formData.append('whatsapp_number', values.whatsapp_number);
      formData.append('email', values.email);
      formData.append('description', values.overview);
      if (formik.values.images.length > 0) {
        formik.values.images.forEach((image: any, index: number) => {
          formData.append('image', {
            uri: image.uri,
            name: image.name || `image_${index}.jpg`,
            type: image.type || 'image/jpeg',
          });
        });
      }

      if (formik.values.profile_image) {
        const image: any = formik.values.profile_image ?? null;
        formData.append('image_url', {
          uri: image.uri,
          name: image.name || `image_${new Date().getTime()}.jpg`,
          type: image.type || 'image/jpeg',
        });
      }

      navigation.navigate('WorkLocationScreen', {
        signupPayload: formData,
        token,
      });

      axios
        .patch(`${BASE_URL}${ENDPOINT.update_agent_profile}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Account created successfully',
          });
          navigation.navigate('HomeScreenStack', {
            screen: 'HomeScreen',
          });
        })
        .catch(error => {
          console.log('error in handleSignup:', error);
          Toast.show({
            type: 'error',
            text1: error?.response?.data?.message,
          });
        });
    }
  };

  const renderImageContainer = () => {
    if (formik.values.images.length > 0) {
      return (
        <View style={styles.imageSection}>
          <FlatList
            data={formik.values.images}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            scrollEnabled
            renderItem={({item}: {item: any}) => {
              return (
                <View style={{marginRight: 10}}>
                  <Image source={{uri: item.uri}} style={styles.sliderImage} />
                </View>
              );
            }}
            showsHorizontalScrollIndicator={false}
          />
          <TouchableOpacity style={styles.addBtn} onPress={handleImagePicker}>
            <MagicText style={styles.selectBtn}>+ Add Image</MagicText>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <Pressable
        style={
          formik.values.images.length > 0
            ? styles.imageSection
            : styles.imageSelectionContainer
        }
        onPress={() => handleImagePicker()}>
        <View style={styles.noImageView}>
          <View>
            <MagicText style={styles.selectBtn}>Select Images</MagicText>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.parent}>
      <View style={styles.row}>
        <CustomBack onPress={() => navigation.goBack()} />
        <View style={styles.signinView}>
          <MagicText style={styles.signinText}>Sign Up</MagicText>
        </View>
      </View>

      <ScrollView style={styles.mainView} nestedScrollEnabled>
        <MagicText style={styles.heading}>Create your account</MagicText>
        <MagicText style={styles.informationText}>
          Fill your information to continue
        </MagicText>

        <TouchableOpacity style={styles.formView} onPress={handleProfile}>
          <View style={styles.roundView}>
            {formik.values.profile_image !== null ? (
              <Image
                source={{uri: (formik.values.profile_image as any)?.uri}}
                style={styles.profileImage}
              />
            ) : (
              <ProfileIcon width={80} height={80} />
            )}

            <View style={styles.absoluteView}>
              <CameraIcon />
            </View>
          </View>
        </TouchableOpacity>

        <View>
          <TextField
            placeholder="Agency Name"
            leftIcon={<FormProfileIcon />}
            style={[
              styles.textFieldStyle,
              formik.errors.agency_name ? {} : {marginBottom: 18},
            ]}
            value={formik.values.agency_name}
            onChangeText={name => formik.setFieldValue('agency_name', name)}
            isValid={formik.errors.agency_name ? false : true}
            errorMessage={formik.errors.agency_name}
            errorStyle={styles.errorLabel}
          />

          <TextField
            placeholder="Agent Name"
            leftIcon={<FormProfileIcon />}
            style={[
              styles.textFieldStyle,
              formik.errors.agent_name ? {} : {marginBottom: 18},
            ]}
            value={formik.values.agent_name}
            onChangeText={name => formik.setFieldValue('agent_name', name)}
            isValid={formik.errors.agent_name ? false : true}
            errorMessage={formik.errors.agent_name}
            errorStyle={styles.errorLabel}
          />

          <TextField
            placeholder="Phone"
            leftIcon={<CallIcon />}
            style={[styles.textFieldStyle, {marginBottom: 18}]}
            value={mobile_number ? mobile_number.toString() : ''}
            editable={false}
          />

          <TextField
            placeholder="Whatsapp Number"
            leftIcon={<CallIcon />}
            style={[
              styles.textFieldStyle,
              formik.errors.whatsapp_number ? {} : {marginBottom: 18},
            ]}
            value={formik.values.whatsapp_number}
            onChangeText={name => formik.setFieldValue('whatsapp_number', name)}
            isValid={formik.errors.whatsapp_number ? false : true}
            errorMessage={formik.errors.whatsapp_number}
            errorStyle={styles.errorLabel}
            maxLength={10}
          />

          <TextField
            placeholder="Email"
            leftIcon={<EmailIcon />}
            style={[
              styles.textFieldStyle,
              formik.errors.email ? {} : {marginBottom: 18},
            ]}
            value={formik.values.email}
            onChangeText={email => formik.setFieldValue('email', email)}
            isValid={formik.errors.email ? false : true}
            errorMessage={formik.errors.email}
            errorStyle={styles.errorLabel}
          />

          <TextField
            placeholder="About"
            leftIcon={<OverviewIcon />}
            style={[
              styles.textFieldStyle,
              formik.errors.overview ? {} : {marginBottom: 18},
            ]}
            value={formik.values.overview}
            onChangeText={overview =>
              formik.setFieldValue('overview', overview)
            }
            isValid={formik.errors.overview ? false : true}
            errorMessage={formik.errors.overview}
            errorStyle={styles.errorLabel}
            multiline
            maxLength={200}
          />

          <MagicText style={styles.label}>Listing Page Images</MagicText>
          {renderImageContainer()}

          <Button
            label="Continue"
            style={styles.btnStyle}
            labelStyle={styles.btnLabel}
            onPress={() => handleSignup(formik.values)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  signinText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
  signinView: {
    flex: 1,
    marginRight: 40,
    alignItems: 'center',
  },
  mainView: {
    marginVertical: 30,
    paddingHorizontal: 15,
    flex: 1,
  },
  heading: {
    fontSize: 22,
  },
  informationText: {
    fontSize: 12,
    color: COLORS.TEXT_GRAY,
    marginTop: 16,
  },
  roundView: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    marginBottom: 18,
    alignItems: 'center',
  },
  formView: {
    alignItems: 'center',
    marginTop: 28,
  },
  absoluteView: {
    position: 'absolute',
    bottom: 20,
    right: -2,
  },
  textFieldStyle: {
    // marginBottom: 18,
    fontSize: 16,
    color: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
  },
  btnStyle: {
    marginVertical: 18,
    paddingVertical: 12,
  },
  errorLabel: {
    fontSize: 12,
    marginBottom: 18,
    color: COLORS.RED,
    marginLeft: 10,
  },
  label: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  imageSelectionContainer: {
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    height: 150,
    marginTop: 10,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  imageSection: {
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    height: 220,
    marginTop: 10,
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 10,
  },
  selectBtn: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.RED,
  },
  noImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btnLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  sliderImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  addBtn: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderColor: COLORS.GRAY,
    alignSelf: 'center',
    padding: 4,
    borderRadius: 5,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
    resizeMode: 'cover',
  },
});
