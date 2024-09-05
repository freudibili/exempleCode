export const UPDATE_NOTIFICATION_STATUS_MUTATION = `mutation updateNotificationStatus ($id: ID!, $status: String!) {
    updateNotificationStatus (id: $id, status: $status) {
        _id
        status
    }
}`;

export const SET_NOTIFICATION_DEVICE_TOKEN_MUTATION = `mutation createNotificationDeviceToken ($deviceToken: String!) {
    createNotificationDeviceToken (deviceToken: $deviceToken) {
          _id
    }
}`;
