import React, {memo, useCallback, useState} from 'react';
import {imageDataType} from '../../../types/imageType';
import ImagePickerModal from '../../screens/modals/ImagePickerModal';
import {Text} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import designSystem from '../../utils/designSystem';
import Icon from 'react-native-vector-icons/Feather';
import i18n from '../../utils/i18n';

interface Props {
  getDataCallback: (value: imageDataType) => void;
}

const ImagePickerButton = ({getDataCallback}: Props) => {
  const [visibleAddModal, setVisibleAddModal] = useState(false);

  const showAddModal = () => setVisibleAddModal(true);
  const hideAddModal = () => setVisibleAddModal(false);

  const handleImage = useCallback(
    async (data: imageDataType) => {
      getDataCallback(data);
      hideAddModal();
    },
    [getDataCallback],
  );

  return (
    <>
      <ImagePickerModal
        visible={visibleAddModal}
        selectImageCallback={handleImage}
        hideModalCallback={hideAddModal}
      />
      <TouchableOpacity onPress={showAddModal} style={styles.container}>
        <View style={styles.icon}>
          <Icon
            size={22}
            name={'camera'}
            color={designSystem.theme.colors.onSurface}
          />
        </View>
        <Text variant={'labelLarge'} style={styles.text}>
          {i18n.t('TROC_ITEM_CREATE_FORM_ADD_PHOTO_BUTTON')}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: designSystem.theme.colors.surfaceDisabled,
  },
  icon: {
    marginBottom: 5,
  },
  text: {
    color: designSystem.theme.colors.onSurfaceDisabled,
    textAlign: 'center',
  },
});
export default memo(ImagePickerButton);
