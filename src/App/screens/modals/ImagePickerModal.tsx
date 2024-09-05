import React from 'react';
import {imageDataType} from '../../../types/imageType';
import ImagePickerContent from '../../components/contents/ImagePickerContent';
import MyModal from '../../components/MyModal/MyModal';

interface Props {
  selectImageCallback: (data: imageDataType) => void;
  hideModalCallback: () => void;
  visible: boolean;
}

const ImagePickerModal = ({
  hideModalCallback,
  selectImageCallback,
  visible,
}: Props) => {
  const handleImageSelection = (data: imageDataType) => {
    selectImageCallback(data);
    hideModalCallback();
  };

  return (
    <MyModal visible={visible} onClose={hideModalCallback}>
      <ImagePickerContent getUriCallback={handleImageSelection} />
    </MyModal>
  );
};

export default ImagePickerModal;
