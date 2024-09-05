import React, {memo, useCallback, useState} from 'react';
import {imageDataType} from '../../../../../../types/imageType';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {StyleSheet, View} from 'react-native';
import designSystem from '../../../../../utils/designSystem';
import ImagePickerModal from '../../../../../screens/modals/ImagePickerModal';

interface Props {
  getDataCallback: (value: imageDataType) => void;
}

const UserImagePickerButton = ({getDataCallback}: Props) => {
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
    <View style={styles.editButtonContainer}>
      <ImagePickerModal
        visible={visibleAddModal}
        selectImageCallback={handleImage}
        hideModalCallback={hideAddModal}
      />
      <IconButton
        style={styles.editButton}
        size={15}
        icon={() => (
          <Icon
            name={'camera'}
            size={15}
            color={designSystem.theme.colors.onBackground}
          />
        )}
        onPress={showAddModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  editButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: designSystem.theme.colors.background,
    borderRadius: 10,
  },
});
export default memo(UserImagePickerButton);
