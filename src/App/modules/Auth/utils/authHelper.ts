import {postGraphql} from '../../../../models/client';
import {dispatch, selector} from '../../../../utils/storeHelper';

import {
  refreshTokenRequestFailure,
  refreshTokenRequestSuccess,
} from '../models/authActions';
import {getUserRefreshToken} from '../models/authSelectors';
import {getNewAccessToken} from '../services/authApi';

export const authenticatedPostGraphql = async (
  query: string,
  variables?: any,
) => {
  try {
    let response = await postGraphql(query, variables);
    return response;
  } catch (err: any) {
    if (err.status === 401) {
      const tokenRefreshed = await refreshTokenHandler();
      if (tokenRefreshed) {
        const response = await postGraphql(query, variables);
        return response;
      }
    } else {
      throw err;
    }
  }
};

export const refreshTokenHandler = async (): Promise<boolean> => {
  try {
    const refreshToken = selector(getUserRefreshToken) as unknown as string;
    const {data} = await getNewAccessToken(refreshToken);
    const {accessToken} = data?.getNewAccessToken;

    if (accessToken) {
      dispatch(refreshTokenRequestSuccess(accessToken));
      return true;
    }
    return false;
  } catch {
    dispatch(refreshTokenRequestFailure());
    return false;
  }
};
