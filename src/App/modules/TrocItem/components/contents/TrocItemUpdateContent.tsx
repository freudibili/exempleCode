import React, {useCallback, useEffect, useState} from 'react';
import UpdateTrocItemForm from '../forms/UpdateTrocItemForm';
import {TrocItemCreationFormType} from '../../types/TrocItemsType';
import {goBack} from '../../../../utils/navigationHelper';
import {useAppDispatch, useAppSelector} from '../../../../../hooks/reduxHook';
import {
  updateTrocItemRequest,
  fetchTrocItemRequest,
} from '../../models/trocItemActions';
import {getTrocItem, getTrocItemStatus} from '../../models/trocItemSelectors';
import StatusLoader from '../../../../components/StatusLoader/StatusLoader';
import {STATUS} from '../../../../types/storeTypes';
import CloseButton from '../../../../components/Buttons/CloseButton/CloseButton';
import {StyleSheet, View} from 'react-native';

interface Props {
  id: string;
}
const TrocItemUpdateContent = ({id}: Props) => {
  const dispatch = useAppDispatch();
  const trocItem = useAppSelector(getTrocItem);
  const status = useAppSelector(getTrocItemStatus);
  const [isSend, setIsSend] = useState(false);

  useEffect(() => {
    if (status === STATUS.SUCCESS && isSend) {
      goBack();
    }
  }, [isSend, status]);

  useEffect(() => {
    dispatch(fetchTrocItemRequest(id));
  }, [dispatch, id]);

  const updateItem = useCallback(
    async (updatedItem: TrocItemCreationFormType) => {
      dispatch(updateTrocItemRequest(id, updatedItem));
      setIsSend(true);
    },
    [dispatch, id],
  );

  return (
    <StatusLoader status={status}>
      <>
        <View style={styles.container}>
          <UpdateTrocItemForm
            getFormDataCallback={updateItem}
            trocItem={trocItem}
          />
        </View>
        <CloseButton />
      </>
    </StatusLoader>
  );
};

const styles = StyleSheet.create({container: {marginTop: 20}});

export default TrocItemUpdateContent;
