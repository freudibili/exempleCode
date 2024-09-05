import React from 'react';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  TROC_ITEM_CONDITION,
  TROC_ITEM_PICKING,
  TROC_ITEM_QUALITY,
} from '../../../../modules/TrocItem/types/TrocItemsType';

interface CategoryIconProps {
  categoryId: string;
  color: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({categoryId, color}) => {
  switch (categoryId) {
    case '632b6604c1c4a03ba5aed61b':
      return <IconMaterialCommunity name={'bicycle'} size={22} color={color} />;
    case '632b66541ac788f191411b01':
      return <IconFontAwesome5 name={'book-open'} size={16} color={color} />;
    case '63344125382a78a71dc0c381':
      return (
        <IconMaterialCommunity
          name={'guitar-acoustic'}
          size={22}
          color={color}
        />
      );
    case '637aabcd686f53e7e7c2855e':
      return <IconFontAwesome5 name={'couch'} size={20} color={color} />;
    case '63b30239e230a7019503aadd':
      return <IconFontAwesome5 name={'shopping-bag'} size={20} color={color} />;
    case '63b302b3e230a7019503aade':
      return <IconFontAwesome5 name={'mobile-alt'} size={20} color={color} />;
    case '63baf117430f095048b78d7d':
      return (
        <IconMaterialCommunity name={'baby-bottle'} size={20} color={color} />
      );
    case '63baf15a430f095048b78d7e':
      return <IconMaterialCommunity name={'flower'} size={20} color={color} />;
    case '63baf323430f095048b78d7f':
      return <IconFontAwesome5 name={'hammer'} size={20} color={color} />;
    case '6521e1b1a7c61ee5a631f196':
      return <IconFontAwesome name={'diamond'} size={20} color={color} />;
    case '6521e1c4a7c61ee5a631f197':
      return <IconFontAwesome5 name={'carrot'} size={20} color={color} />;
    case '6521e1d1a7c61ee5a631f198':
      return <IconFontAwesome5 name={'chess'} size={20} color={color} />;
    case '6521e1e5a7c61ee5a631f199':
      return (
        <IconMaterialCommunity name={'postage-stamp'} size={20} color={color} />
      );
    case '6521e1f4a7c61ee5a631f19a':
      return <IconFontAwesome5 name={'bicycle'} size={20} color={color} />;
    case '6521e22ba7c61ee5a631f19b':
      return <IconFontAwesome5 name={'coffee'} size={18} color={color} />;

    case '6522ce9ca7c61ee5a631f19c':
      return (
        <IconFontAwesome5 name={'air-freshener'} size={20} color={color} />
      );

    case TROC_ITEM_QUALITY.NOT_GOOD:
      return <IconFontAwesome name={'star-o'} size={22} color={color} />;
    case TROC_ITEM_QUALITY.MEDIUM:
      return (
        <IconFontAwesome name={'star-half-empty'} size={22} color={color} />
      );
    case TROC_ITEM_QUALITY.GOOD:
      return <IconFontAwesome name={'star'} size={22} color={color} />;

    case TROC_ITEM_CONDITION.NEW:
      return <IconFontAwesome5 name={'tags'} size={20} color={color} />;
    case TROC_ITEM_CONDITION.USED_LIKE_NEW:
      return (
        <IconFontAwesome5 name={'hourglass-start'} size={20} color={color} />
      );
    case TROC_ITEM_CONDITION.USED_FAIR:
      return (
        <IconFontAwesome5 name={'hourglass-half'} size={20} color={color} />
      );
    case TROC_ITEM_CONDITION.USED_GOOD:
      return (
        <IconFontAwesome5 name={'hourglass-end'} size={20} color={color} />
      );
    case TROC_ITEM_PICKING.FLEXIBLE:
      return <IconFontAwesome5 name={'globe-africa'} size={18} color={color} />;
    case TROC_ITEM_PICKING.ON_SITE:
      return <IconFontAwesome5 name={'door-open'} size={18} color={color} />;

    default:
      return <IconFontAwesome5 name={'comment'} size={20} color={color} />;
  }
};

export default CategoryIcon;
