import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MagicText from '../../../components/MagicText';
import CustomBack from '../../../components/CustomBack';
import {COLORS} from '../../../assets/colors';
import PropertyCard from '../../../components/PropertyCard';
import {IMAGE} from '../../../assets/images';
import {SavedScreenProps} from '../../../types/appTypes';

const SavedScreen = ({navigation}: SavedScreenProps) => {
  const data = [
    {
      id: 1,
      agentName: 'Shri Sai Shyam Properties',
      rating: '16',
      address: 'Office No L-17 A, Ground Floor, Block L, Saket, Delhi - 110017',
      review: '2.4',
      media: [
        {id: 1, type: 'image', image: IMAGE.CARD_IMAGE},
        {id: 2, type: 'image', image: IMAGE.CARD_IMAGE2},
      ],
      details:
        'We are dedicated property dealer with over 10 years of experience in the Delhi real estate market. Specializing in luxury residential properties, Raj has successfully facilitated numerous high-end transactions, assisting clients in finding their dream homes',
      isSaved: true,
    },
  ];
  return (
    <View style={styles.parent}>
      <View style={styles.row}>
        <CustomBack />
        <View style={styles.header}>
          <MagicText style={styles.headerText}>Saved Agents</MagicText>
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProprtyDetailScreen', {data: data[0]})
          }>
          <PropertyCard item={data[0]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 14,
    paddingTop: 12,
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
});
