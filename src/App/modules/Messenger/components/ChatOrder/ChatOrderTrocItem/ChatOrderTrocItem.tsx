import React from 'react';
import ExploreCardItem from '../../../../Explore/components/ExploreCardItems/ExploreCardItem/ExploreCardItem';
import {
  CardTrocItemType,
  TrocItemInputData,
} from '../../../../TrocItem/types/TrocItemsType';

interface TrocItemProps {
  item?: TrocItemInputData;
}

const ChatOrderTrocItem = ({item}: TrocItemProps) => {
  if (item) {
    const formattedTrocItem: CardTrocItemType = {
      ...item,
      id: item._id,
      trocTypeId: item.trocType._id,
      categoryTypeId: item.categoryType._id,
    };

    return <ExploreCardItem trocItem={formattedTrocItem} />;
  }
  return null;
};

export default ChatOrderTrocItem;
