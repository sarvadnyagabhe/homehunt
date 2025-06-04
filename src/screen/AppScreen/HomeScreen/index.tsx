import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LocationIcon} from '../../../assets/icons';
import {IMAGE} from '../../../assets/images';
import {COLORS} from '../../../assets/colors';
import MagicText from '../../../components/MagicText';
import PropertyCard from '../../../components/PropertyCard';
import {HomeScreenProps} from '../../../types/appTypes';
import {useAppSelector} from '../../../store';
import {getAllAgentList} from '../../../services/HomeService';
import SearchContainer from '../../../components/SearchContainer';
import LoadingAndErrorComponent from '../../../components/LoadingAndErrorComponent';

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {id, name} = useAppSelector(state => state.location.location);
  const token = useAppSelector(state => state.auth.token);

  // const data = [
  //   {
  //     id: 1,
  //     agentName: 'Shri Sai Shyam Properties',
  //     rating: '16',
  //     address: 'Office No L-17 A, Ground Floor, Block L, Saket, Delhi - 110017',
  //     review: '2.4',
  //     media: [
  //       {id: 1, type: 'image', image: IMAGE.CARD_IMAGE},
  //       {id: 2, type: 'image', image: IMAGE.CARD_IMAGE2},
  //     ],
  //     details:
  //       'We are dedicated property dealer with over 10 years of experience in the Delhi real estate market. Specializing in luxury residential properties, Raj has successfully facilitated numerous high-end transactions, assisting clients in finding their dream homes',
  //   },
  //   {
  //     id: 2,
  //     agentName: 'Laxman Properties',
  //     rating: '10',
  //     address: 'Office No L-17 A, Ground Floor, Block L, Saket, Delhi - 110017',
  //     review: '5.4',
  //     media: [
  //       {id: 1, type: 'image', image: IMAGE.CARD_IMAGE2},
  //       {id: 2, type: 'image', image: IMAGE.CARD_IMAGE},
  //     ],
  //     details:
  //       'We are dedicated property dealer with over 10 years of experience in the Delhi real estate market. Specializing in luxury residential properties, Raj has successfully facilitated numerous high-end transactions, assisting clients in finding their dream homes',
  //   },
  //   {
  //     id: 3,
  //     agentName: 'Lokesh Properties',
  //     rating: '11',
  //     address: 'Office No L-17 A, Ground Floor, Block L, Saket, Delhi - 110017',
  //     review: '4.4',
  //     media: [
  //       {id: 1, type: 'image', image: IMAGE.CARD_IMAGE2},
  //       {id: 2, type: 'image', image: IMAGE.CARD_IMAGE},
  //     ],
  //     details:
  //       'We are dedicated property dealer with over 10 years of experience in the Delhi real estate market. Specializing in luxury residential properties, Raj has successfully facilitated numerous high-end transactions, assisting clients in finding their dream homes',
  //   },
  // ];
  const [agentList, setAgentList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAgentList = () => {
    setIsLoading(true);
    getAllAgentList(Number(id))
      .then(res => {
        console.log('res in getAgentList==>', res);
        setAgentList(res);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAgentList();
  }, []);

  if (isLoading) {
    return <LoadingAndErrorComponent />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.parent}>
        <View style={styles.row}>
          <SearchContainer value={name} style={{flex: 1}} />
          <TouchableOpacity
            onPress={() => {
              token
                ? navigation.navigate('ProfileScreen')
                : navigation.navigate('AuthRoutes', {screen: 'LoginScreen'});
            }}>
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
            data={agentList}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => {
                    token
                      ? navigation.navigate('ProprtyDetailScreen', {data: item})
                      : navigation.navigate('AuthRoutes', {
                          screen: 'LoginScreen',
                        });
                  }}>
                  <PropertyCard item={item} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
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
