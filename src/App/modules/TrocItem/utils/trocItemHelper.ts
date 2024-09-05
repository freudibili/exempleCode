import {itemColorTheme} from '../../../utils/colorHelper';
import i18n from '../../../utils/i18n';
import {
  TROC_ITEM_CATEGORY_TYPE,
  TROC_ITEM_CONDITION,
  TROC_ITEM_PICKING,
  TROC_ITEM_QUALITY,
  TROC_ITEM_TROC_TYPE,
} from '../types/TrocItemsType';

export const getItemTypeTitle = (itemTypeId: string) => {
  switch (itemTypeId) {
    case TROC_ITEM_TROC_TYPE.OFFER_ID: {
      return i18n.t('TROC_TYPE_OFFER_TITLE');
    }
    case TROC_ITEM_TROC_TYPE.SEARCH_ID: {
      return i18n.t('TROC_TYPE_SEARCH_TITLE');
    }
    case TROC_ITEM_CATEGORY_TYPE.PRODUCT_ID: {
      return i18n.t('CATEGORY_TYPE_PRODUCT_TITLE');
    }
    case TROC_ITEM_CATEGORY_TYPE.SERVICE_ID: {
      return i18n.t('CATEGORY_TYPE_SERVICE_TITLE');
    }
    default:
      return '';
  }
};

export const getItemTypeStyle = (
  trocTypeId: string,
  categoryTypeId: string,
) => {
  if (trocTypeId === TROC_ITEM_TROC_TYPE.OFFER_ID) {
    if (categoryTypeId === TROC_ITEM_CATEGORY_TYPE.PRODUCT_ID) {
      return {
        icon: 'sign-language',
        color: itemColorTheme.offerProduct,
        backgroundColor: itemColorTheme.offerProductContainer,
        title:
          i18n.t('TROC_TYPE_OFFER_TITLE') +
          i18n.t('ITEM_TYPE_ARTICLE') +
          i18n.t('CATEGORY_TYPE_PRODUCT_TITLE') +
          '.',
        titleCreation: i18n.t('ITEM_TYPE_OFFER_PRODUCT_CREATION_TITLE'),
        text: i18n.t('ITEM_TYPE_OFFER_PRODUCT_DESCRIPTION'),
      };
    } else {
      return {
        icon: 'user-graduate',
        color: itemColorTheme.offerService,
        backgroundColor: itemColorTheme.offerServiceContainer,
        title:
          i18n.t('TROC_TYPE_OFFER_TITLE') +
          i18n.t('ITEM_TYPE_ARTICLE') +
          i18n.t('CATEGORY_TYPE_SERVICE_TITLE') +
          '.',
        titleCreation: i18n.t('ITEM_TYPE_OFFER_SERVICE_CREATION_TITLE'),
        text: i18n.t('ITEM_TYPE_OFFER_SERVICE_DESCRIPTION'),
      };
    }
  } else {
    if (categoryTypeId === TROC_ITEM_CATEGORY_TYPE.PRODUCT_ID) {
      return {
        icon: 'shopping-bag',
        color: itemColorTheme.searchProduct,
        backgroundColor: itemColorTheme.searchProductContainer,
        title:
          i18n.t('TROC_TYPE_SEARCH_TITLE') +
          i18n.t('ITEM_TYPE_ARTICLE') +
          i18n.t('CATEGORY_TYPE_PRODUCT_TITLE') +
          '.',
        titleCreation: i18n.t('ITEM_TYPE_SEARCH_PRODUCT_CREATION_TITLE'),
        text: i18n.t('ITEM_TYPE_SEARCH_PRODUCT_DESCRIPTION'),
      };
    } else {
      return {
        icon: 'wrench',
        color: itemColorTheme.searchService,
        backgroundColor: itemColorTheme.searchServiceContainer,
        title:
          i18n.t('TROC_TYPE_SEARCH_TITLE') +
          i18n.t('ITEM_TYPE_ARTICLE') +
          i18n.t('CATEGORY_TYPE_SERVICE_TITLE') +
          '.',
        titleCreation: i18n.t('ITEM_TYPE_SEARCH_SERVICE_CREATION_TITLE'),
        text: i18n.t('ITEM_TYPE_SEARCH_SERVICE_DESCRIPTION'),
      };
    }
  }
};

export const getItemQuality = (quality: TROC_ITEM_QUALITY) => {
  switch (quality) {
    case TROC_ITEM_QUALITY.GOOD: {
      return i18n.t('QUALITY_GOOD_TITLE');
    }
    case TROC_ITEM_QUALITY.MEDIUM: {
      return i18n.t('QUALITY_MEDIUM_TITLE');
    }
    case TROC_ITEM_QUALITY.NOT_GOOD: {
      return i18n.t('QUALITY_NOT_GOOD_TITLE');
    }

    default:
      return '';
  }
};

export const getItemCondition = (condition: TROC_ITEM_CONDITION) => {
  switch (condition) {
    case TROC_ITEM_CONDITION.NEW: {
      return i18n.t('CONDITION_NEW_TITLE');
    }
    case TROC_ITEM_CONDITION.USED_LIKE_NEW: {
      return i18n.t('CONDITION_USED_LIKE_NEW_TITLE');
    }
    case TROC_ITEM_CONDITION.USED_GOOD: {
      return i18n.t('CONDITION_USED_GOOD_TITLE');
    }
    case TROC_ITEM_CONDITION.USED_FAIR: {
      return i18n.t('CONDITION_USED_FAIR_TITLE');
    }
    default:
      return '';
  }
};

const getItemPicking = (quality: TROC_ITEM_PICKING) => {
  switch (quality) {
    case TROC_ITEM_PICKING.FLEXIBLE: {
      return i18n.t('PICKING_FLEXIBLE_TITLE');
    }
    case TROC_ITEM_PICKING.ON_SITE: {
      return i18n.t('PICKING_ON_SITE_TITLE');
    }
    default:
      return '';
  }
};

export const getConditionItems = Object.keys(TROC_ITEM_CONDITION).map(key => ({
  value: TROC_ITEM_CONDITION[key as keyof typeof TROC_ITEM_CONDITION],
  label: getItemCondition(
    TROC_ITEM_CONDITION[key as keyof typeof TROC_ITEM_CONDITION],
  ),
}));

export const getQualityItems = Object.keys(TROC_ITEM_QUALITY).map(key => ({
  value: TROC_ITEM_QUALITY[key as keyof typeof TROC_ITEM_QUALITY],
  label: getItemQuality(
    TROC_ITEM_QUALITY[key as keyof typeof TROC_ITEM_QUALITY],
  ),
}));

export const getPickingItems = Object.keys(TROC_ITEM_PICKING).map(key => ({
  value: TROC_ITEM_PICKING[key as keyof typeof TROC_ITEM_PICKING],
  label: getItemPicking(
    TROC_ITEM_PICKING[key as keyof typeof TROC_ITEM_PICKING],
  ),
}));
