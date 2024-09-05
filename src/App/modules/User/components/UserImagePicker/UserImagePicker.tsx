import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {imageDataType} from '../../../../../types/imageType';
import AvatarImage from '../../../../components/Images/AvatarImage/AvatarImage';
import designSystem from '../../../../utils/designSystem';
import UserImagePickerButton from './UserImagePickerButton/UserImagePickerButton';

interface Props {
  initValue?: string;
  getDataCallback: (value: imageDataType) => void;
}

const UserImagePicker = ({initValue, getDataCallback}: Props) => {
  const [resourceData, setResourceData] = useState<imageDataType>({
    name: '',
    type: '',
    uri: initValue ?? '',
  });

  useEffect(() => {
    getDataCallback(resourceData);
  }, [getDataCallback, resourceData]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.avatarContainer}>
          <AvatarImage size={120} imageUrl={resourceData.uri} isUser />
        </View>
        <UserImagePickerButton getDataCallback={setResourceData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    borderWidth: 5,
    borderColor: designSystem.theme.colors.secondaryContainer,
    borderRadius: 12,
  },
});

export default memo(UserImagePicker);
