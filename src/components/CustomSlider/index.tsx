import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import {COLORS} from '../../assets/colors';
import DotComponent from '../DotComponent';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';

const CustomSlider = ({sliderData = []}: any) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollRef = useRef<FlatList>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const videoRefs = useRef<any>({});
  const screenWidth = Dimensions.get('screen').width - 16;

  // Pause video when scrolling away
  useEffect(() => {
    Object.keys(videoRefs.current).forEach(key => {
      const videoRef = videoRefs.current[parseInt(key)];
      if (parseInt(key) !== currentIndex && videoRef) {
        videoRef.seek(0);
        setIsVideoPlaying(false);
      }
    });
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderData.length > 1 && scrollRef.current) {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= sliderData.length) {
          nextIndex = 0;
        }

        scrollRef.current.scrollToOffset({
          offset: nextIndex * screenWidth,
          animated: true,
        });
        setCurrentIndex(nextIndex);
      }
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex, sliderData.length]);

  const onChange = (nativeEvent: any) => {
    const index = Math.round(nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(index);
  };

  const styles = getStyles(screenWidth);

  return (
    <View style={{marginBottom: 20}}>
      <FlatList
        data={sliderData}
        horizontal
        pagingEnabled
        ref={scrollRef}
        style={{}}
        scrollEventThrottle={16}
        snapToAlignment="center"
        snapToInterval={screenWidth}
        decelerationRate={Platform.OS === 'ios' ? 'fast' : 0.9} // Makes the snapping feel smoother
        showsHorizontalScrollIndicator={false}
        onScroll={({nativeEvent}) => onChange(nativeEvent)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <>
              <Pressable style={{}} key={index}>
                <View style={styles.mainViewStyle}>
                  {item.type === 'image' ? (
                    <FastImage
                      style={styles.outputBoxStyle}
                      source={item.image}
                      resizeMode="cover"
                    />
                  ) : (
                    <Video
                      source={item?.video}
                      style={styles.outputBoxStyle}
                      resizeMode="cover"
                      controls={true}
                      repeat
                    />
                  )}
                </View>
              </Pressable>
            </>
          );
        }}
      />
      <View style={styles.dotView}>
        {sliderData?.length > 1
          ? sliderData?.map((item: any, index: number) => {
              return (
                <DotComponent
                  key={index}
                  currentIndex={currentIndex}
                  index={index}
                  activeColor={COLORS.WHITE}
                  InActiveColor={COLORS.GRAY}
                />
              );
            })
          : null}
      </View>
    </View>
  );
};

export const getStyles = (screenWidth: number) => {
  return StyleSheet.create({
    dotView: {
      position: 'absolute',
      bottom: 14,
      flexDirection: 'row',
      alignSelf: 'center',
      backgroundColor: '#FFFFFF80',
      paddingVertical: 6,
      paddingHorizontal: 6,
      borderRadius: 16,
    },
    outputBoxStyle: {height: '100%', width: '100%', borderRadius: 10},
    mainViewStyle: {
      width: screenWidth,
      height: 165,
    },
    containerStyle: {
      alignItems: 'center',
      marginTop: 10,
      borderRadius: 5,
      backgroundColor: COLORS.GRAY,
    },
  });
};

export default CustomSlider;
