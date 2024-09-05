import React from 'react';
import TrocItemImagePickerSelected from './TrocItemImagePickerSelected';
import {imageDataType} from '../../../../../types/imageType';
import {FlatList, StyleSheet, View} from 'react-native';
import ImagePickerButton from '../../../../components/Pickers/ImagePickerButton';

interface Props {
  resourcesDatas: imageDataType[];
  onAddImage: (image: imageDataType) => void;
  onDelete: (index: number) => void;
}

const TrocItemImagesPickerSelected = ({
  resourcesDatas,
  onDelete,
  onAddImage,
}: Props) => {
  if (!resourcesDatas || resourcesDatas.length === 0) {
    return <ImagePickerButton getDataCallback={onAddImage} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.addButton}>
        <ImagePickerButton getDataCallback={onAddImage} />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={resourcesDatas}
        keyExtractor={(item, index) => item.uri || '' + index}
        renderItem={({item, index}) => (
          <TrocItemImagePickerSelected
            resourceData={item}
            onDelete={() => {
              onDelete(index);
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  addButton: {
    width: 100,
    marginRight: 20,
  },
  separator: {width: 20},
});

export default TrocItemImagesPickerSelected;
