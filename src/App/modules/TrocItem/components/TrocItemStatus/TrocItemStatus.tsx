import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {TROC_ITEM_STATUS} from '../../types/TrocItemsType';
import i18n from '../../../../utils/i18n';

interface Props {
  status?: TROC_ITEM_STATUS;
}

const TrocItemStatus = ({status}: Props) => {
  if (status !== TROC_ITEM_STATUS.COMPLETED) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Chip disabled={true}>{i18n.t('TROC_ITEM_ACTION_ITEM_COMPLETED')}</Chip>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
  },
});

export default TrocItemStatus;
