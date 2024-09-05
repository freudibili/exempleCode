export const ADD_TROC_ITEM_MUTATION = `
mutation createTrocItem ($trocItemInput: TrocItemInputData) {
  createTrocItem (trocItemInput: $trocItemInput) {
      _id
      description
      imageUrl
      price
      categories {
          _id
      }
      categoryType {
          _id
      }
      trocType {
          _id
      }
      creator {
          _id
          name
      }
      createdAt
      updatedAt
  }
}
`;

export const REMOVE_TROC_ITEM_MUTATION = `mutation deleteTrocItem ($trocItemId: ID!) {
    deleteTrocItem (id: $trocItemId)
}`;

export const UPDATE_TROC_ITEM_MUTATION = `mutation updateTrocItem ($id: ID!,$trocItemInput: TrocItemInputData) {
    updateTrocItem (id: $id,trocItemInput: $trocItemInput) {
         _id
        title
        description
        imageUrl
        imagesUrl
        price
        address {
            coordinates
            formattedAddress
        }
        categories {
            _id
        }
        categoryType {
            _id
        }
        trocType {
            _id
        }
        creator {
            _id
            name
        }
        createdAt
        updatedAt
    }
}`;

export const UPDATE_TROC_ITEM_STATUS_MUTATION = `mutation updateTrocItemStatus ($id: ID!, $status: String!) {
    updateTrocItemStatus (id: $id, status: $status) {
        _id
        status
    }
}`;
