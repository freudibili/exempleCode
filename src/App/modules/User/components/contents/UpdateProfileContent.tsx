import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../../hooks/reduxHook';
import {imageDataType} from '../../../../../types/imageType';
import designSystem from '../../../../utils/designSystem';
import {updateUserInformationRequest} from '../../models/user/userActions';
import {getUser} from '../../models/user/userSelectors';
import {UserInformationUpdateFormType} from '../../types/UserType';
import UpdateProfileForm from '../forms/UpdateProfileForm';
import UserImagePicker from '../UserImagePicker/UserImagePicker';

const LoginContent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const [imageData, setImageData] = useState<imageDataType>();

  const handleUpdate = useCallback(
    (values: UserInformationUpdateFormType) => {
      const updatedUser = {
        name: values.name,
        baseline: values.baseline,
        imageData,
      };
      dispatch(updateUserInformationRequest(updatedUser));
    },
    [dispatch, imageData],
  );

  const {imageUrl} = user;

  return (
    <View style={designSystem.styles.customStyle.contentContainer}>
      <View style={styles.imageContainer}>
        <UserImagePicker getDataCallback={setImageData} initValue={imageUrl} />
      </View>
      <View style={styles.formContainer}>
        <UpdateProfileForm updateCallback={handleUpdate} user={user} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 3,
  },
});

export default LoginContent;
