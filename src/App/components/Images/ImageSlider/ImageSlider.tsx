import React, {useState, useRef} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text} from 'react-native-paper';

interface Props {
  imagesUrl: string[];
  RenderItem: (item: string) => JSX.Element | null;
}

const ImageSlider = ({imagesUrl, RenderItem}: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<any>>(null);

  const handleScroll = (event: {
    nativeEvent: {contentOffset: {x: any}; layoutMeasurement: {width: any}};
  }) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(contentOffset / viewSize);
    setActiveIndex(index);
  };

  const isGestureEnabled = imagesUrl.length > 1;
  const isDataEmpty = imagesUrl.length === 0;

  if (isDataEmpty) {
    return <View style={styles.container}>{RenderItem('')}</View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={imagesUrl}
        horizontal
        pagingEnabled={isGestureEnabled}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        renderItem={({item}) => {
          return <View>{RenderItem(item)}</View>;
        }}
        onMomentumScrollEnd={isGestureEnabled ? handleScroll : undefined}
        scrollEventThrottle={isGestureEnabled ? 16 : undefined}
        scrollEnabled={isGestureEnabled}
      />
      <View style={styles.paginationContainer}>
        <View style={styles.paginationSquare}>
          <Text style={styles.paginationText}>{`${activeIndex + 1} / ${
            imagesUrl.length
          }`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  paginationSquare: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    padding: 5,
  },
  paginationText: {
    color: '#fff',
  },
  activeText: {
    color: '#fff',
  },
});

export default ImageSlider;
