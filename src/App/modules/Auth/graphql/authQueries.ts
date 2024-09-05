export const LOGIN_QUERY = `query login ($email: String!, $password: String!) {
    login (email: $email, password: $password) {
        accessToken
        refreshToken
        userId
    }
}`;
