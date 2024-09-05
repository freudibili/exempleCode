import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Divider, Text} from 'react-native-paper';
import {NAVIGATION} from '../../../../../types/navigationTypes';
import {navigate} from '../../../../../utils/navigationHelper';
import {CardTrocItemType} from '../../../types/TrocItemsType';
import TrocItemPickerCardItems from '../TrocItemPickerCardItems/TrocItemPickerCardItems';
import Icon from 'react-native-vector-icons/Feather';
import designSystem from '../../../../../utils/designSystem';
import MyModal from '../../../../../components/MyModal/MyModal';
import i18n from '../../../../../utils/i18n';

interface Props {
  selectItemCallback: (trocItem: CardTrocItemType) => void;
  hideModalCallback: () => void;
  visible: boolean;
}
const AddTrocItemModal = ({
  hideModalCallback,
  selectItemCallback,
  visible,
}: Props) => {
  const handleSelectItem = useCallback(
    (trocItem: CardTrocItemType) => {
      selectItemCallback(trocItem);
      hideModalCallback();
    },
    [hideModalCallback, selectItemCallback],
  );

  const goToCreateProduct = useCallback(() => {
    const params = {
      trocTypeId: undefined,
      categoryTypeId: undefined,
    };
    navigate({screen: NAVIGATION.TROC_ITEM_CREATE_PRODUCT_SCREEN, params});
  }, []);

  return (
    <MyModal visible={visible} onClose={hideModalCallback}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} variant={'titleMedium'}>
              {i18n.t('TROC_ITEM_NEGOCIATE_ADD_TROC_ITEM_TITLE')}
            </Text>
          </View>
          <Button
            icon={() => (
              <Icon
                name="edit"
                size={18}
                color={designSystem.theme.colors.surface}
              />
            )}
            style={styles.button}
            onPress={goToCreateProduct}
            mode={'contained'}>
            {i18n.t('TROC_ITEM_NEGOCIATE_ADD_TROC_ITEM_BUTTON')}
          </Button>

          <Divider style={styles.divider} />
        </View>
        <View style={styles.bottomContainer}>
          <TrocItemPickerCardItems selectItemCallback={handleSelectItem} />
        </View>
      </View>
    </MyModal>
  );
};

const styles = StyleSheet.create({
  container: {maxHeight: '100%'},
  topContainer: {
    height: '20%',
  },
  bottomContainer: {
    height: '80%',
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    color: designSystem.theme.colors.onSurfaceDisabled,
  },
  button: {marginBottom: 10},
  divider: {margin: 10},
});
export default memo(AddTrocItemModal);
