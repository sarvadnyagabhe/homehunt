import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  View,
  Pressable,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {COLORS} from '../../assets/colors';
import DotComponent from '../DotComponent';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
type CustomSliderType = {
  sliderData: any;
  containerStyle?: StyleProp<ViewStyle>;
  isHome?: boolean;
};
const CustomSlider = ({
  sliderData = [],
  containerStyle,
  isHome = false,
}: CustomSliderType) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollRef = useRef<FlatList>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const videoRefs = useRef<any>({});
  const screenWidth = Dimensions.get('screen').width - (isHome ? 0 : 28);
  // const screenWidth = isHome ? width - 28 : width;
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
    <View>
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
            <Pressable>
              <View style={styles.mainViewStyle}>
                {
                  <FastImage
                    style={[styles.outputBoxStyle, containerStyle]}
                    source={item?.image}
                    resizeMode="cover"
                  />
                }
                {/* {item.type === 'image' ? (
                  <FastImage
                    style={[styles.outputBoxStyle, containerStyle]}
                    source={item?.image}
                    resizeMode="cover"
                  />
                ) : (
                  <Video
                    source={item?.video}
                    style={[styles.outputBoxStyle, containerStyle]}
                    resizeMode="cover"
                    controls={true}
                    repeat
                  />
                )} */}
              </View>
            </Pressable>
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
                  activeColor={COLORS.LIGHT_GREEN}
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
      bottom: 16,
      flexDirection: 'row',
      alignSelf: 'center',
    },
    mainViewStyle: {
      width: screenWidth,
      height: 220,
    },
    outputBoxStyle: {
      height: '100%',
      width: '100%',
      borderRadius: 10,
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
