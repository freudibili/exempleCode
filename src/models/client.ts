import config from '../utils/config';
import {selector} from '../utils/storeHelper';
import {getUserAccessToken} from '../App/modules/Auth/models/authSelectors';
import {CustomError} from '../utils/errorHelper';

export const postGraphql = async (
  query: string,
  variables?: any,
): Promise<any> => {
  const accessToken = selector(getUserAccessToken);

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + accessToken);

  const graphql = JSON.stringify({
    query,
    variables,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow',
  };

  const url = config.API_URL + 'graphql';
  const result = await fetch(url, requestOptions);

  const response = await result.text().catch(err => {
    throw err;
  });

  const responseJson = JSON.parse(response);
  if (responseJson.errors) {
    const {message, status} = responseJson.errors[0];
    const error = new CustomError(status, message);
    throw error;
  }

  return responseJson;
};

export const getRest = async (url: string, body: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response;
};

export const postRestS3 = async (file: Blob, url: string) => {
  const response = await fetch(url, {
    method: 'PUT',
    body: file,
  });

  return response;
};
