import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {LocationIcon} from '../../../assets/icons';
import {IMAGE} from '../../../assets/images';
import {COLORS} from '../../../assets/colors';
import MagicText from '../../../components/MagicText';
import PropertyCard from '../../../components/PropertyCard';
import {HomeScreenProps} from '../../../types/appTypes';

const HomeScreen = ({navigation}: HomeScreenProps) => {
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
    },
    {
      id: 2,
      agentName: 'Laxman Properties',
      rating: '10',
      address: 'Office No L-17 A, Ground Floor, Block L, Saket, Delhi - 110017',
      review: '5.4',
      media: [
        {id: 1, type: 'image', image: IMAGE.CARD_IMAGE2},
        {id: 2, type: 'image', image: IMAGE.CARD_IMAGE},
      ],
      details:
        'We are dedicated property dealer with over 10 years of experience in the Delhi real estate market. Specializing in luxury residential properties, Raj has successfully facilitated numerous high-end transactions, assisting clients in finding their dream homes',
    },
    {
      id: 3,
      agentName: 'Lokesh Properties',
      rating: '11',
      address: 'Office No L-17 A, Ground Floor, Block L, Saket, Delhi - 110017',
      review: '4.4',
      media: [
        {id: 1, type: 'image', image: IMAGE.CARD_IMAGE2},
        {id: 2, type: 'image', image: IMAGE.CARD_IMAGE},
      ],
      details:
        'We are dedicated property dealer with over 10 years of experience in the Delhi real estate market. Specializing in luxury residential properties, Raj has successfully facilitated numerous high-end transactions, assisting clients in finding their dream homes',
    },
  ];
  return (
    <View style={styles.parent}>
      <View style={styles.row}>
        <View style={styles.searchBarStyle}>
          <View style={[styles.row]}>
            <LocationIcon />
            <MagicText style={styles.searchText}>Saket, New Delhi</MagicText>
            {/* <ForwardArrowIcon /> */}
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <View style={styles.profileViewStyle}>
            <Image
              source={IMAGE.PROFILE_IMAGE}
              style={styles.profileImgStyle}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.flatlistView}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('ProprtyDetailScreen', {data: item})
                }>
                <PropertyCard item={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: COLORS.WHITE,
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileViewStyle: {width: 40, height: 40},
  profileImgStyle: {width: '100%', height: '100%', borderRadius: 30},
  searchBarStyle: {
    flex: 1,
    backgroundColor: COLORS.WHITE_SMOKE,
    height: 44,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 12,
  },
  searchText: {fontSize: 12, marginLeft: 10},
  flatlistView: {paddingVertical: 18, marginBottom: 22},
});
