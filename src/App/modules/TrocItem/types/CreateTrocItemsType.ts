export enum CREATE_TROC_ITEM_STEPS {
  INFOS_STEP = 'infosStep',
  QUALITY_STEP = 'qualityStep',
  EXCHANGE_STEP = 'exchangeStep',
  LOCATION_STEP = 'locationStep',
}

export interface CreateTrocItemContentProps {
  onValidate: () => void;
}

export interface CreateTrocItemContentMethods {
  handleNextFromParent: () => void;
}
