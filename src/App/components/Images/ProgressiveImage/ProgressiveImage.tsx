import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import uuid from 'react-native-uuid';
import FastImage from 'react-native-fast-image';
import {IMAGE_TYPE} from '../../../../types/imageType';
import {downloadImage} from '../../../services/filesApi';
import designSystem from '../../../utils/designSystem';

interface Props {
  uri: string;
  width: number | string;
  height: number | string;
  borderRadius?: number;
  imageType: IMAGE_TYPE;
}
const ProgressiveImage = ({
  uri,
  imageType,
  width,
  height,
  borderRadius,
}: Props) => {
  const [imageSource, setImageSource] = useState('');
  const [tryToRefresh, setTryToRefresh] = useState(true);
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  const opacityStyle = {opacity: opacityAnimation};

  const animateElement = useCallback(() => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [opacityAnimation]);

  const fetchImage = useCallback(async () => {
    const {imageUrl: downloadImageUrl} = await downloadImage({
      imageId: uri,
      imageType,
    });
    setImageSource(downloadImageUrl);
  }, [imageType, uri]);

  const initImage = useCallback(() => {
    if (imageSource?.length < 1) {
      fetchImage();
    } else if (!uuid.validate(uri)) {
      setImageSource(uri);
    }
  }, [fetchImage, imageSource?.length, uri]);

  useEffect(() => {
    initImage();
  }, [initImage, uri]);

  const handleImageLoadStart = useCallback(() => {}, []);

  const handleImageLoadError = useCallback(async () => {
    // detect and handle is coming from S3 and if yes download it

    if (uuid.validate(uri) && tryToRefresh) {
      fetchImage();
    }
    setTryToRefresh(false);
  }, [fetchImage, tryToRefresh, uri]);

  const handleImageLoadSuccess = useCallback(() => {
    animateElement();
    setTryToRefresh(true);
  }, [animateElement]);

  if (!imageSource) {
    return <View style={{width, height}} />;
  }

  return (
    <View>
      <View style={[styles.placeholder, {width, height, borderRadius}]} />
      <Animated.View style={opacityStyle}>
        <FastImage
          key={uri}
          style={{width, height, borderRadius}}
          source={{
            uri: imageSource,
            priority: FastImage.priority.normal,
          }}
          onLoadStart={handleImageLoadStart}
          onLoadEnd={handleImageLoadSuccess}
          onError={handleImageLoadError}
          resizeMode={FastImage.resizeMode.cover}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    position: 'absolute',
    backgroundColor: designSystem.theme.colors.surfaceDisabled,
    opacity: 0.4,
  },
});

export default ProgressiveImage;
