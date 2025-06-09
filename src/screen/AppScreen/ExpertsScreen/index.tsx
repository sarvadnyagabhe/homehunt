import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomBack from '../../../components/CustomBack';
import {COLORS} from '../../../assets/colors';
import MagicText from '../../../components/MagicText';
import TextField from '../../../components/TextField';
import {LocationIcon} from '../../../assets/icons';
import Button from '../../../components/Button';
import {ExpertsScreenProps} from '../../../types/appTypes';

const ExpertsScreen = ({navigation}: ExpertsScreenProps) => {
  const data = {
    youWantTo: [{label: 'Sell'}, {label: 'Buy'}, {label: 'Rent'}],
    propertyType: [{label: 'Residential'}, {label: 'Commercial'}],
    bhkType: [{label: '1 RK'}, {label: '2 BHK'}, {label: '3 BHK'}],
  };
  const [isPropertySelected, setIsPropertySelected] = useState<string>('');

  return (
    <View style={styles.parent}>
      <View style={styles.parent}>
        <CustomBack onPress={() => navigation.goBack()} />
        <View style={styles.mainView}>
          <MagicText style={styles.heading}>Get Experts Help</MagicText>
          <MagicText style={styles.description}>
            Let us know more details about your requirement, we will help you
            connect right person.
          </MagicText>
          <View style={{marginTop: 20}}>
            <MagicText style={styles.subheader}>You want to</MagicText>
            <View style={[styles.row]}>
              {data?.youWantTo?.map(item => {
                return (
                  <TouchableOpacity onPress={() => {}}>
                    <View style={styles.roundView}>
                      <MagicText style={styles.roundText}>
                        {item?.label}
                      </MagicText>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <MagicText style={styles.subheader}>Property Type</MagicText>
            <View style={[styles.row]}>
              {data?.propertyType?.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setIsPropertySelected(item?.label);
                    }}>
                    <View style={styles.roundView}>
                      <MagicText style={styles.roundText}>
                        {item?.label}
                      </MagicText>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          {isPropertySelected === 'Residential' && (
            <View style={{marginTop: 20}}>
              <MagicText style={styles.subheader}>BHK Type</MagicText>
              <View style={[styles.row]}>
                {data?.bhkType?.map(item => {
                  return (
                    <TouchableOpacity onPress={() => {}}>
                      <View style={styles.roundView}>
                        <MagicText style={styles.roundText}>
                          {item?.label}
                        </MagicText>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
          <View style={{marginTop: 20}}>
            <MagicText style={styles.subheader}>Locality</MagicText>
            <TextField
              placeholder="Select locality"
              leftIcon={<LocationIcon />}
            />
          </View>
          <View style={{marginTop: 20}}>
            <MagicText style={styles.subheader}>Your Requirements</MagicText>
            <TextField
              placeholder="Additional Details(Optinal)"
              numberOfLines={4}
              multiline={true}
              style={styles.inputStyle}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Button label="Submit" style={styles.btnStyle} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExpertsScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 10,
    paddingTop: 12,
  },
  mainView: {marginTop: 16},
  heading: {fontSize: 20},
  description: {fontSize: 12, lineHeight: 20, marginTop: 16},
  roundView: {
    backgroundColor: COLORS.WHITE_SMOKE,
    height: 46,
    // width: '20%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginRight: 14,
  },
  row: {flexDirection: 'row'},
  roundText: {color: COLORS.GRAY, fontWeight: '700'},
  subheader: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '700',
  },
  inputStyle: {height: 145},
  btnStyle: {paddingVertical: 14, marginHorizontal: 30},
});
