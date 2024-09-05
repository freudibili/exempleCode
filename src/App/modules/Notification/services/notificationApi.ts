import {authenticatedPostGraphql} from '../../Auth/utils/authHelper';
import {
  SET_NOTIFICATION_DEVICE_TOKEN_MUTATION,
  UPDATE_NOTIFICATION_STATUS_MUTATION,
} from '../graphql/notificationMutation';
import {FETCH_NOTIFICATIONS_QUERY} from '../graphql/notificationQueries';
import {NOTIFICATION_STATUS} from '../types/notificationType';

export const getNotifications = async () => {
  try {
    const response = await authenticatedPostGraphql(FETCH_NOTIFICATIONS_QUERY);

    return response;
  } catch (err) {
    throw err;
  }
};

export const sendUpdateNotificationStatus = async (variables: {
  id: string;
  status: NOTIFICATION_STATUS;
}) => {
  try {
    const response = await authenticatedPostGraphql(
      UPDATE_NOTIFICATION_STATUS_MUTATION,
      variables,
    );

    return response;
  } catch (err) {
    throw err;
  }
};

export const setNotificationDeviceToken = async (deviceToken: string) => {
  try {
    const variables = {
      deviceToken,
    };

    const response = await authenticatedPostGraphql(
      SET_NOTIFICATION_DEVICE_TOKEN_MUTATION,
      variables,
    );

    return response;
  } catch (err) {
    throw err;
  }
};
