import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {imageDataType} from '../../../types/imageType';
import {pickImage} from '../../../utils/imageHelper';
import designSystem from '../../utils/designSystem';
import i18n from '../../utils/i18n';

interface Props {
  getUriCallback: (data: imageDataType) => void;
}

const ImagePickerContent = ({getUriCallback}: Props) => {
  const handleImage = useCallback(
    (imageData: imageDataType) => {
      if (imageData?.uri) {
        getUriCallback(imageData);
      }
    },
    [getUriCallback],
  );

  const openCamera = useCallback(async () => {
    const data = (await pickImage('camera')) as imageDataType;
    if (data && data.uri) {
      handleImage(data);
    }
  }, [handleImage]);
  const openLibrary = useCallback(async () => {
    const data = (await pickImage('library')) as imageDataType;
    if (data && data.uri) {
      handleImage(data);
    }
  }, [handleImage]);

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant={'titleLarge'}>
        {i18n.t('IMAGE_PICKER_TITLE')}
      </Text>
      <Button
        mode={'contained'}
        onPress={openCamera}
        icon="camera"
        style={styles.button}>
        {i18n.t('IMAGE_PICKER_OPEN_CAMERA_BUTTON')}
      </Button>
      <Button
        mode={'contained'}
        onPress={openLibrary}
        icon="image"
        style={styles.button}>
        {i18n.t('IMAGE_PICKER_OPEN_LIBRARY_BUTTON')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginVertical: 10},
  title: {
    color: designSystem.theme.colors.onSurfaceDisabled,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {marginTop: 10},
});

export default ImagePickerContent;
