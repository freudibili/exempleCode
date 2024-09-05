export const FETCH_NOTIFICATIONS_QUERY = `query FetchUserNotifications {
   userNotifications {
        _id
        createdAt
        status
        type
        text
        conversation {
            _id
        }
   }
}`;
