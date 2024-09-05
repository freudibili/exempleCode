export const FETCH_ORDER_QUERY = `query FetchSingleOrder($orderId: ID!) {
   order(id: $orderId) {
     _id
     status
     price
     requestorUser{
       _id
       imageUrl
       name
       }
   creatorUser{
      _id
    imageUrl
    name}
     trocItem{
         _id
         title
      imagesUrl
      price
      createdAt
      address{
         formattedAddress
     }
         categoryType{_id}
      trocType{_id}
      }
     negociatePrice
     negociateTrocItems {
              _id
         title
      imagesUrl
      price
      categoryType{_id}
      trocType{_id}
     }
 }
 }`;
