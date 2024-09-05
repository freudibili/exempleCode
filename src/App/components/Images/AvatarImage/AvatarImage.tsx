import React, {useMemo} from 'react';
import {useAppSelector} from '../../../../hooks/reduxHook';
import {IMAGE_TYPE} from '../../../../types/imageType';
import {getUserImageUrl} from '../../../modules/User/models/user/userSelectors';
import ProgressiveImage from '../ProgressiveImage/ProgressiveImage';
import EmptyAvatar from './EmptyAvatar';

interface Props {
  size: number;
  imageUrl?: string;
  isUser?: boolean;
}
const AvatarImage = ({size, imageUrl, isUser}: Props) => {
  const userImageUrl = useAppSelector(getUserImageUrl);

  const uri = useMemo(
    () => imageUrl || (isUser ? userImageUrl : ''),
    [imageUrl, isUser, userImageUrl],
  );

  if (!uri || uri === 'null') {
    return <EmptyAvatar width={size} height={size} disabled={isUser} />;
  }

  return (
    <ProgressiveImage
      key={uri}
      uri={uri}
      width={size}
      height={size}
      imageType={IMAGE_TYPE.USER}
      borderRadius={8}
    />
  );
};

export default AvatarImage;
