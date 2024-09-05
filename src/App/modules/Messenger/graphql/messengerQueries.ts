export const FETCH_MESSENGER_USER_CONVERSATIONS_QUERY = `
query FetchUserConversations {
    userConversations {
         _id
         otherUser{
             _id
             name
             imageUrl
         }
         order{
             _id
         }
         createdAt
         updatedAt
    }
}
`;

export const FETCH_MESSENGER_MESSAGES_QUERY = `
query FetchMessages($conversationId: ID!) {
    conversationMessages(conversationId: $conversationId) {
           _id
           sender{
               _id
               name
               imageUrl
                }
           conversationId
           text
           createdAt
           updatedAt
      }
  }
`;
