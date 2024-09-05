import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {imageDataType} from '../../../../../types/imageType';
import ValidationFormError from '../../../../components/ValidationFormError/ValidationFormError';
import TrocItemImagesPickerSelected from './TrocItemImagesPickerSelected';

interface Props {
  initValue?: imageDataType[];
  error?: string;
  getDataCallback: (value: imageDataType[]) => void;
}

const TrocItemImagePicker = ({initValue, getDataCallback, error}: Props) => {
  const [resourcesDatas, setResourceDatas] = useState(() => {
    if (initValue && initValue.length > 0) {
      return initValue;
    }
    return [];
  });

  useEffect(() => {
    getDataCallback(resourcesDatas);
  }, [getDataCallback, resourcesDatas]);

  const handleDeleteImage = (index: number) => {
    setResourceDatas(prevData => prevData.filter((_, i) => i !== index));
  };

  const handleAddImage = (data: imageDataType) => {
    setResourceDatas(prevData => [...prevData, data]);
  };

  return (
    <View>
      <TrocItemImagesPickerSelected
        resourcesDatas={resourcesDatas}
        onDelete={handleDeleteImage}
        onAddImage={handleAddImage}
      />
      <View style={styles.errorContainer}>
        <ValidationFormError error={error} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    bottom: 10,
    right: 10,
    position: 'absolute',
  },
  errorContainer: {marginTop: 5},
});

export default TrocItemImagePicker;
