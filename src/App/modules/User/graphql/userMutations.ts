export const UPDATE_USER_MUTATION = `
mutation updateUser ($userInformationInput: UserInformationInputData) {
    updateUser (userInformationInput: $userInformationInput) {
        _id
        name
        email
        wallet
        status
        imageUrl
        baseline
    }
}
`;
