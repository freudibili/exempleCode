import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import CreateTrocItemForm from '../forms/CreateTrocItemForm';
import {TrocItemCreationFormType} from '../../types/TrocItemsType';
import {useAppDispatch} from '../../../../../hooks/reduxHook';
import {createTrocItemRequest} from '../../models/trocItemActions';
import TrocItemTypeHeader from '../TrocItemTypeIcons/TrocItemTypeHeader';
import CloseButton from '../../../../components/Buttons/CloseButton/CloseButton';

interface Props {
  trocTypeId?: string;
  categoryTypeId?: string;
}

const TrocItemCreateContent = ({trocTypeId, categoryTypeId}: Props) => {
  const dispatch = useAppDispatch();

  const createItem = useCallback(
    async (createdItem: TrocItemCreationFormType) => {
      const TrocTypedItem = {
        ...createdItem,
        trocTypeId: trocTypeId ?? createdItem.trocTypeId,
        categoryTypeId: categoryTypeId ?? createdItem.categoryTypeId,
      };
      dispatch(createTrocItemRequest(TrocTypedItem));
    },
    [categoryTypeId, dispatch, trocTypeId],
  );

  const GetHeader = useCallback(() => {
    if (trocTypeId && categoryTypeId) {
      return (
        <TrocItemTypeHeader
          trocTypeId={trocTypeId}
          categoryTypeId={categoryTypeId}
        />
      );
    }
    return null;
  }, [categoryTypeId, trocTypeId]);

  return (
    <View style={styles.container}>
      <GetHeader />
      <CreateTrocItemForm
        getFormDataCallback={createItem}
        initTrocTypeId={trocTypeId}
        initCategoryTypeId={categoryTypeId}
      />
      <CloseButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default TrocItemCreateContent;
