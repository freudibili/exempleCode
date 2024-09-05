import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {NAVIGATION} from '../../../../../../types/navigationTypes';
import {navigate} from '../../../../../../utils/navigationHelper';
import {TROC_ITEM_ACTIONS} from '../../../../types/TrocItemsType';
import i18n from '../../../../../../utils/i18n';

const TrocItemActionNegociateButton = () => {
  const openActionsModal = () => {
    navigate({
      screen: NAVIGATION.TROC_ITEM_ACTIONS_MODAL,
      params: {actionType: TROC_ITEM_ACTIONS.NEGOCIATE},
    });
  };

  return (
    <View style={styles.container}>
      <Button onPress={openActionsModal} mode={'contained'}>
        {i18n.t('TROC_ITEM_NEGOCIATE_BUTTON')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 20,
  },
});

export default memo(TrocItemActionNegociateButton);
