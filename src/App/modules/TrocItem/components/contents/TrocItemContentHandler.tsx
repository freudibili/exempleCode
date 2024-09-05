import React from 'react';
import {View} from 'react-native';
import {
  TROC_ITEM_TROC_TYPE,
  TROC_ITEM_CATEGORY_TYPE,
} from '../../types/TrocItemsType';
import TrocItemTypeCard from '../../components/TrocItemTypeCard/TrocItemTypeCard';
import designSystem from '../../../../utils/designSystem';

const TrocItemHandlerContent = () => {
  return (
    <View style={designSystem.styles.customStyle.contentContainer}>
      <TrocItemTypeCard
        trocTypeId={TROC_ITEM_TROC_TYPE.OFFER_ID}
        categoryTypeId={TROC_ITEM_CATEGORY_TYPE.PRODUCT_ID}
      />
      <TrocItemTypeCard
        trocTypeId={TROC_ITEM_TROC_TYPE.OFFER_ID}
        categoryTypeId={TROC_ITEM_CATEGORY_TYPE.SERVICE_ID}
      />
      <TrocItemTypeCard
        trocTypeId={TROC_ITEM_TROC_TYPE.SEARCH_ID}
        categoryTypeId={TROC_ITEM_CATEGORY_TYPE.PRODUCT_ID}
      />
      <TrocItemTypeCard
        trocTypeId={TROC_ITEM_TROC_TYPE.SEARCH_ID}
        categoryTypeId={TROC_ITEM_CATEGORY_TYPE.SERVICE_ID}
      />
    </View>
  );
};

export default TrocItemHandlerContent;
