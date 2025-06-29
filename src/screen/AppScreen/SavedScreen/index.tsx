import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import MagicText from '../../../components/MagicText';
import CustomBack from '../../../components/CustomBack';
import {COLORS} from '../../../assets/colors';
import PropertyCard from '../../../components/PropertyCard';
import {SavedScreenProps} from '../../../types/appTypes';
import {
  handleDeleteAgentBookmark,
  handleGetAgentBookmark,
} from '../../../services/PropertyServices';
import Toast from 'react-native-toast-message';

const SavedScreen = ({navigation}: SavedScreenProps) => {
  const [bookmarkList, setBookmarkList] = useState<any>([]);

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

        <View style={{flex: 1, marginTop: 15}}>
          {bookmarkList.length > 0 ? (
            <FlatList
              data={bookmarkList}
              renderItem={({item}) => {
                return (
                  <PropertyCard
                    item={item}
                    onBookmarkPress={() => deleteBookmarkList(item?.agent_id)}
                    onPress={() =>
                      navigation.navigate('ProprtyDetailScreen', {
                        data: item,
                      })
                    }
                  />
                );
              }}
            />
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <MagicText style={{fontSize: 16, lineHeight: 24}}>
                Your saved agents will be shown here.
              </MagicText>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    padding: 15,
    backgroundColor: COLORS.WHITE_SMOKE,
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
