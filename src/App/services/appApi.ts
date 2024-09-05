import {postGraphql} from '../../models/client';
import {CONTACT_US_QUERY} from '../graphql/appQueries';

export const sendContactUS = async (variables: {
  senderEmail: string;
  message: string;
  type: string;
}) => {
  try {
    const response = await postGraphql(CONTACT_US_QUERY, variables);
    return response;
  } catch (err) {
    throw err;
  }
};
