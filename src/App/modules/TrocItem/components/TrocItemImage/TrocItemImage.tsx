import React from 'react';
import {IMAGE_TYPE} from '../../../../../types/imageType';
import ProgressiveImage from '../../../../components/Images/ProgressiveImage/ProgressiveImage';
import EmptyTrocItemImage from './EmptyTrocItemImage';
import {TROC_ITEM_STATUS} from '../../types/TrocItemsType';

interface Props {
  uri?: string;
  width: number | string;
  height: number;
  trocTypeId: string;
  status?: TROC_ITEM_STATUS;
  categoryTypeId: string;
  borderRadius?: number;
}
const TrocItemImage = ({
  uri,
  width,
  height,
  trocTypeId,
  categoryTypeId,
  borderRadius,
}: Props) => {
  if (!uri) {
    return (
      <EmptyTrocItemImage
        trocTypeId={trocTypeId}
        categoryTypeId={categoryTypeId}
        width={width}
        height={height}
        borderRadius={borderRadius || 0}
      />
    );
  }

  return (
    <ProgressiveImage
      key={uri}
      uri={uri}
      width={width}
      height={height}
      imageType={IMAGE_TYPE.TROC_ITEM}
      borderRadius={borderRadius}
    />
  );
};

export default TrocItemImage;
