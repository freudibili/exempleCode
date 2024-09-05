import React from 'react';
import ProgressiveImage from '../../../../components/Images/ProgressiveImage/ProgressiveImage';
import {StyleSheet, View} from 'react-native';
import designSystem from '../../../../utils/designSystem';
import {IMAGE_TYPE, imageDataType} from '../../../../../types/imageType';
import {IconButton} from 'react-native-paper';

interface Props {
  resourceData: imageDataType;
  onDelete: () => void;
}
const TrocItemImagePickerSelected = ({resourceData, onDelete}: Props) => {
  if (!resourceData?.uri) {
    return null;
  }

  return (
    <View style={styles.imageContainer}>
      <ProgressiveImage
        width={'100%'}
        height={'100%'}
        borderRadius={10}
        uri={resourceData.uri}
        imageType={IMAGE_TYPE.TROC_ITEM}
      />
      <IconButton
        style={styles.closeButton}
        size={15}
        icon={'close'}
        onPress={onDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 100,
    width: 100,
    backgroundColor: designSystem.theme.colors.surface,
  },
  closeButton: {
    height: 20,
    width: 20,
    backgroundColor: designSystem.theme.colors.surface,
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default TrocItemImagePickerSelected;
