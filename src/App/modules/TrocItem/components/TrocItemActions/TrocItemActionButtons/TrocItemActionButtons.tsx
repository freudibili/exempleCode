import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {TrocItemType} from '../../../types/TrocItemsType';
import TrocItemActionNegociateButton from './TrocItemActionNegociateButton/TrocItemActionNegociateButton';
import TrocItemActionOfferButton from './TrocItemActionOfferButton/TrocItemActionOfferButton';
import InfoButton from '../../../../../components/Buttons/InfoButton/infoButton';

type Props = {
  trocItem: TrocItemType;
};

const TrocItemActionButtons = ({trocItem}: Props) => {
  return (
    <View style={styles.container}>
      <TrocItemActionNegociateButton />
      <TrocItemActionOfferButton
        price={trocItem.price}
        trocType={trocItem.trocType._id}
      />
      <View style={styles.infoButtonContainer}>
        <InfoButton size={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoButtonContainer: {marginLeft: 20},
});

export default memo(TrocItemActionButtons);
