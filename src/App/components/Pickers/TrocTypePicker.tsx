import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {TROC_ITEM_TROC_TYPE} from '../../modules/TrocItem/types/TrocItemsType';
import TitleForm from '../Texts/TitleForm/TitleForm';
import SegmentedController from './SegmentedController/SegmentedController';
import ValidationFormError from '../ValidationFormError/ValidationFormError';
import i18n from '../../utils/i18n';

interface Props {
  getDataCallback: (trocTypeId: string) => void;
  enableNoSelection?: boolean;
  initValue?: string | null;
  error?: string;
}

const TrocTypePicker = memo(
  ({getDataCallback, initValue, enableNoSelection, error}: Props) => {
    const items = [
      {
        value: TROC_ITEM_TROC_TYPE.OFFER_ID,
        label: i18n.t('TROC_TYPE_OFFER_TITLE'),
      },
      {
        value: TROC_ITEM_TROC_TYPE.SEARCH_ID,
        label: i18n.t('TROC_TYPE_SEARCH_TITLE'),
      },
    ];

    return (
      <View>
        <TitleForm title={i18n.t('TROC_ITEM_CREATE_FORM_TROC_TYPE_TITLE')} />
        <SegmentedController
          items={items}
          getDataCallback={getDataCallback}
          initValue={initValue}
          enableNoSelection={enableNoSelection}
        />
        {Boolean(error) && (
          <View style={styles.errorContainer}>
            <ValidationFormError error={error} />
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  errorContainer: {
    marginTop: 5,
  },
});

export default TrocTypePicker;
