export const FETCH_USER_INFORMATION_QUERY = `query FetchUserInformation($id: ID) {
    user(id: $id) {
      _id
      name
      email
      wallet
      status
      imageUrl
      baseline
      blacklist{ 
        _id
}
  }
}`;

export const FETCH_USER_TROC_ITEMS_QUERY = `query FetchUserTrocItems($id: ID) {
    userTrocItems (id: $id) {
         _id
  title
  imagesUrl
  price
  status
  createdAt
    categoryType {
        _id
    }
trocType{
        _id
    }
    orders {
        _id
        status
       creatorUser {
                _id
         
            }
            requestorUser {
                  _id
                name
                imageUrl
            }
    }
    }
}
`;

export const FETCH_USER_ORDERS_QUERY = `query FetchUserOrders {
    userOrders {
        _id
        status
        price
        negociatePrice
        createdAt
        negociateTrocItems {_id}
        creatorUser {
            _id
            name
            imageUrl
        }
        requestorUser {
              _id
            name
            imageUrl
        }
       trocItem {
         _id
  title
  imagesUrl
    categoryType {
        _id
    }
trocType{
        _id
    }
    }
    }
}`;
