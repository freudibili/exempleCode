import {postGraphql} from '../../../../models/client';
import {
  UserCredentialsOutputData,
  UserResetPasswordOutputData,
} from '../../User/types/UserType';
import {
  CREATE_USER_MUTATION,
  DELETE_USER_MUTATION,
  GET_NEW_ACCESS_TOKEN_MUTATION,
  RESET_PASSWORD_MUTATION,
  SEND_OTP_EMAIL_MUTATION,
} from '../graphql/authMutations';
import {LOGIN_QUERY} from '../graphql/authQueries';

export const postLogin = async (userCredentials: UserCredentialsOutputData) => {
  try {
    const response = await postGraphql(LOGIN_QUERY, userCredentials);
    return response;
  } catch (err) {
    throw err;
  }
};

export const createUser = async (
  userCredentials: UserCredentialsOutputData,
) => {
  try {
    const variables = {
      userInput: {
        email: userCredentials.email,
        name: userCredentials.name,
        password: userCredentials.password,
      },
    };
    const response = await postGraphql(CREATE_USER_MUTATION, variables);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getNewAccessToken = async (refreshToken: string) => {
  try {
    const variables = {
      refreshToken,
    };
    const response = await postGraphql(
      GET_NEW_ACCESS_TOKEN_MUTATION,
      variables,
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const createOtpCode = async (email: string) => {
  try {
    const variables = {
      email,
    };
    const response = await postGraphql(SEND_OTP_EMAIL_MUTATION, variables);
    return response;
  } catch (err) {
    throw err;
  }
};

export const resetPasswordUser = async (
  variables: UserResetPasswordOutputData,
) => {
  try {
    const response = await postGraphql(RESET_PASSWORD_MUTATION, variables);
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async () => {
  try {
    const response = await postGraphql(DELETE_USER_MUTATION, {});
    return response;
  } catch (err) {
    throw err;
  }
};
