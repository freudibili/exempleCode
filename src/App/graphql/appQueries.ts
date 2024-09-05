export const CONTACT_US_QUERY = `query contactUs ($senderEmail: String!,$message: String!,$type: String!) {
    contactUs (senderEmail: $senderEmail,message:$message,type:$type )
}`;
