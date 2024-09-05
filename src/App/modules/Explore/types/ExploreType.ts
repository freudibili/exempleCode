import {AddressType} from '../../../types/locationType';

export type FilterType = {
  search?: string;
  distance?: number;
  trocTypeId?: string | null;
  categoryTypeId?: string | null;
  categoriesId?: string[];
};

export type ExploreFilterType = FilterType & {
  address?: AddressType;
};

export type ExploreFilterOutputData = FilterType & {coordinates?: number[]};
