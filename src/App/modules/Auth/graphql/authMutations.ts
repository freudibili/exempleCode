export const CREATE_USER_MUTATION = `mutation createUser ($userInput: UserInputData) {
    createUser (userInput: $userInput) {
                accessToken
        refreshToken
        userId
    }
}`;

export const GET_NEW_ACCESS_TOKEN_MUTATION = `mutation getNewAccessToken ($refreshToken: String!)  {
    getNewAccessToken (refreshToken: $refreshToken){
        accessToken
    }
}`;

export const SEND_OTP_EMAIL_MUTATION = `mutation sendResetPasswordCode ($email: String!) {
    sendResetPasswordCode (email: $email) {
        email
        code
    }
}`;

export const RESET_PASSWORD_MUTATION = `mutation changePassword ($email: String!,$code:Int!, $newPassword:String!) {
    changePassword (email: $email, code:$code, newPassword:$newPassword) {
    _id
    }
}`;

export const DELETE_USER_MUTATION = `mutation deleteUser  {
    deleteUser 
}`;
