export const ADD_ORDER_MUTATION = `
mutation createOrder ($orderInput: OrderInputData!) {
    createOrder (orderInput: $orderInput) {
        _id
        status
         requestorUser {
             _id
         }
          creatorUser {
             _id
         }
         trocItem {
             _id
         }
         negociatePrice
         negociateTrocItems{
             _id
         }
    }
}
`;

export const UPDATE_ORDER_STATUS_MUTATION = `
mutation updateOrderStatus ($id: ID!, $status: String!) {
    updateOrderStatus (id: $id, status: $status) {
        _id
        status
    }
}
`;

export const CANCEL_ORDER_MUTATION = `
mutation cancelOrder ($id: ID!) {
    cancelOrder (id: $id){
        _id
        status
         requestorUser {
             _id
         }
          creatorUser {
             _id
         }
         trocItem {
             _id
         }
         negociatePrice
         negociateTrocItems{
             _id
         }
    }
}
`;
