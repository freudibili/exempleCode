import {postGraphql} from '../../../../models/client';
import {authenticatedPostGraphql} from '../../Auth/utils/authHelper';
import {ExploreFilterOutputData} from '../../Explore/types/ExploreType';
import {
  ADD_TROC_ITEM_MUTATION,
  REMOVE_TROC_ITEM_MUTATION,
  UPDATE_TROC_ITEM_MUTATION,
  UPDATE_TROC_ITEM_STATUS_MUTATION,
} from '../graphql/trocItemMutations';
import {
  FETCH_TROC_ITEMS_QUERY,
  FETCH_TROC_ITEM_CATEGORIES_QUERY,
  FETCH_TROC_ITEM_CATEGORY_ITEM_QUERY,
  FETCH_TROC_ITEM_QUERY,
  REPORT_TROC_ITEM_QUERY,
} from '../graphql/trocItemQueries';
import {TROC_ITEM_STATUS, TrocItemOutputData} from '../types/TrocItemsType';

export const getTrocItems = async (
  variables: ExploreFilterOutputData & {page: number},
) => {
  try {
    const response = await authenticatedPostGraphql(
      FETCH_TROC_ITEMS_QUERY,
      variables,
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const getTrocItem = async (id: string) => {
  try {
    const variables = {
      trocItemId: id,
    };
    const response = await authenticatedPostGraphql(
      FETCH_TROC_ITEM_QUERY,
      variables,
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const getCategories = async () => {
  try {
    const response = await postGraphql(FETCH_TROC_ITEM_CATEGORIES_QUERY);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getCategoryItems = async () => {
  try {
    const response = await postGraphql(FETCH_TROC_ITEM_CATEGORY_ITEM_QUERY);
    return response;
  } catch (err) {
    throw err;
  }
};

export const addTrocItem = async (trocItem: TrocItemOutputData) => {
  try {
    const variables = {trocItemInput: trocItem};
    const response = await authenticatedPostGraphql(
      ADD_TROC_ITEM_MUTATION,
      variables,
    );

    return response;
  } catch (err) {
    throw err;
  }
};

export const removeTrocItem = async (id: string) => {
  try {
    const variables = {
      trocItemId: id,
    };
    const response = await authenticatedPostGraphql(
      REMOVE_TROC_ITEM_MUTATION,
      variables,
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const sendUpdateTrocItem = async (variables: {
  id: string;
  trocItemInput: TrocItemOutputData;
}) => {
  try {
    const response = await authenticatedPostGraphql(
      UPDATE_TROC_ITEM_MUTATION,
      variables,
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const sendUpdateTrocItemStatus = async (variables: {
  id: string;
  status: TROC_ITEM_STATUS;
}) => {
  try {
    const response = await postGraphql(
      UPDATE_TROC_ITEM_STATUS_MUTATION,
      variables,
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const signalTrocItem = async (id: string) => {
  try {
    const variables = {
      trocItemId: id,
    };

    const response = await postGraphql(REPORT_TROC_ITEM_QUERY, variables);
    return response;
  } catch (err) {
    throw err;
  }
};
