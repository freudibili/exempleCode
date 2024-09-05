export const ADD_MESSENGER_CONVERSATION_MUTATION = `
mutation createConversation ($conversationInput: ConversationInputData!) {
    createConversation (conversationInput: $conversationInput) {
        _id
         otherUser{
             _id
             name
         }
         order{
             _id
         }
    }
}
`;

export const ADD_MESSENGER_MESSAGE_MUTATION = `mutation createMessage ($messageInput: MessageInputData!) {
    createMessage (messageInput: $messageInput) {
        _id
        sender {
            _id
        }
        receiver {
            _id
        }
        text
    }
}`;

export const BLOCK_USER_MUTATION = `mutation blockUser ($id: ID!) {
    blockUser (id: $id) {
        _id
    blacklist { 
           _id
         }
    }
}`;
