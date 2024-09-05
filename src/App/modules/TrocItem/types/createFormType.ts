import {imageDataType} from '../../../../types/imageType';
import {AddressType} from '../../../types/locationType';
import {CREATE_TROC_ITEM_STEPS} from './CreateTrocItemsType';
import {
  TROC_ITEM_QUALITY,
  TROC_ITEM_CONDITION,
  TROC_ITEM_PICKING,
} from './TrocItemsType';

export interface CreateOfferProductFormInfoValues {
  title: string;
  imagesData: imageDataType[];
  categoriesId: string[];
}

export interface CreateOfferProductFormQualityValues {
  quality: TROC_ITEM_QUALITY;
  condition: TROC_ITEM_CONDITION;
  description: string;
}

export interface CreateOfferProductFormExchangeValues {
  price: number;
  negociateDescription: string;
}

export interface CreateOfferProductFormLocationValues {
  address: AddressType;
  picking: TROC_ITEM_PICKING;
}

export interface CreateOfferProductFormValues
  extends CreateOfferProductFormInfoValues,
    CreateOfferProductFormExchangeValues,
    CreateOfferProductFormQualityValues,
    CreateOfferProductFormLocationValues {
  steps: CREATE_TROC_ITEM_STEPS[];
  currentStepIndex: number;
}

export const createOfferProductInfoInitialValues: CreateOfferProductFormInfoValues =
  {
    title: '',
    imagesData: [],
    categoriesId: [],
  };

export const createOfferProductQualityInitialValues: CreateOfferProductFormQualityValues =
  {
    quality: TROC_ITEM_QUALITY.GOOD,
    condition: TROC_ITEM_CONDITION.NEW,
    description: '',
  };

export const createOfferProductExchangeInitialValues: CreateOfferProductFormExchangeValues =
  {
    price: 0,
    negociateDescription: '',
  };

export const createOfferProductLocationInitialValues: CreateOfferProductFormLocationValues =
  {
    address: {formattedAddress: '', coordinates: []},
    picking: TROC_ITEM_PICKING.ON_SITE,
  };

export const createOfferProductInitialValues: CreateOfferProductFormValues = {
  ...createOfferProductInfoInitialValues,
  ...createOfferProductQualityInitialValues,
  ...createOfferProductExchangeInitialValues,
  ...createOfferProductLocationInitialValues,
  steps: [
    CREATE_TROC_ITEM_STEPS.INFOS_STEP,
    CREATE_TROC_ITEM_STEPS.QUALITY_STEP,
    CREATE_TROC_ITEM_STEPS.EXCHANGE_STEP,
    CREATE_TROC_ITEM_STEPS.LOCATION_STEP,
  ],
  currentStepIndex: 0,
};
