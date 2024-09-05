import React from 'react';
import {StyleSheet, View} from 'react-native';

import designSystem from '../../../../utils/designSystem';
import {getHeight, getWidth} from '../../../../utils/responsiveHelper';
import ImageSlider from '../../../../components/Images/ImageSlider/ImageSlider';
import {TrocItemInputData} from '../../types/TrocItemsType';
import TrocItemImage from '../TrocItemImage/TrocItemImage';

type Props = {
  trocItem: TrocItemInputData;
};

const TrocItemImageHeader = ({trocItem}: Props) => {
  const width = getWidth - 40;
  const height = getHeight * 0.3;
  return (
    <View style={styles.container}>
      <ImageSlider
        imagesUrl={trocItem.imagesUrl}
        RenderItem={(item: string) => (
          <TrocItemImage
            uri={item}
            width={width}
            height={height}
            trocTypeId={trocItem.trocType._id}
            categoryTypeId={trocItem.categoryType._id}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: getHeight * 0.3,
    backgroundColor: designSystem.theme.colors.surface,
  },
});

export default TrocItemImageHeader;
