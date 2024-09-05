import {authenticatedPostGraphql} from '../../Auth/utils/authHelper';
import {UPDATE_USER_MUTATION} from '../graphql/userMutations';
import {
  FETCH_USER_INFORMATION_QUERY,
  FETCH_USER_ORDERS_QUERY,
  FETCH_USER_TROC_ITEMS_QUERY,
} from '../graphql/userQueries';
import {UserInformationOutputData} from '../types/UserType';

export const getUser = async (id?: string) => {
  try {
    const variables = {
      id,
    };
    const response = await authenticatedPostGraphql(
      FETCH_USER_INFORMATION_QUERY,
      variables,
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const getUserTrocItems = async (id?: string) => {
  try {
    const variables = {
      id,
    };

    const response = await authenticatedPostGraphql(
      FETCH_USER_TROC_ITEMS_QUERY,
      variables,
    );

    return response;
  } catch (err) {
    throw err;
  }
};

export const getUserOrders = async () => {
  try {
    const response = await authenticatedPostGraphql(FETCH_USER_ORDERS_QUERY);
    return response;
  } catch (err) {
    throw err;
  }
};

export const sendUpdateUserInformations = async (
  user: UserInformationOutputData,
) => {
  try {
    const variables = {
      userInformationInput: {
        name: user.name,
        imageUrl: user.imageUrl,
        baseline: user.baseline,
      },
    };
    const response = await authenticatedPostGraphql(
      UPDATE_USER_MUTATION,
      variables,
    );

    return response;
  } catch (err) {
    throw err;
  }
};
