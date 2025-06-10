import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MagicText from '../../../components/MagicText';
import CustomBack from '../../../components/CustomBack';
import {COLORS} from '../../../assets/colors';
import PropertyCard from '../../../components/PropertyCard';
import {IMAGE} from '../../../assets/images';
import {SavedScreenProps} from '../../../types/appTypes';
import {
  handleDeleteAgentBookmark,
  handleGetAgentBookmark,
} from '../../../services/PropertyServices';
import Toast from 'react-native-toast-message';

const SavedScreen = ({navigation}: SavedScreenProps) => {
  const [bookmarkList, setBookmarkList] = useState<any>([]);
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

  const getBookmarkList = () => {
    handleGetAgentBookmark()
      .then(res => {
        console.log('res in getBookmark', res);
        const updatedData = res?.data?.map((item: any) => {
          return {
            ...item,
            name: item?.agent_name,
            isBookmarked: true,
          };
        });
        setBookmarkList(updatedData);
      })
      .catch(error => console.log('error in getbookmaark', error));
  };

  const deleteBookmarkList = (agent_id: number) => {
    const payload = {
      agent_id: agent_id,
    };
    handleDeleteAgentBookmark(payload)
      .then(res => {
        console.log('res in deleteBookmarkList', res);

        const filteredData = bookmarkList?.filter(
          (ele: any) => ele?.agent_id !== agent_id,
        );
        Toast.show({type: 'success', text1: res?.message});
        setBookmarkList(filteredData);
      })
      .catch(error => console.log('error in deleteBookmarkList', error));
  };

  useEffect(() => {
    getBookmarkList();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.parent}>
        <View style={styles.row}>
          <CustomBack onPress={() => navigation.goBack()} />
          <View style={styles.header}>
            <MagicText style={styles.headerText}>Saved Agents</MagicText>
          </View>
        </View>

        <View>
          <FlatList
            data={bookmarkList}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProprtyDetailScreen', {data: data[0]})
                  }>
                  <PropertyCard
                    item={item}
                    onBookmarkPress={() => deleteBookmarkList(item?.agent_id)}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
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
