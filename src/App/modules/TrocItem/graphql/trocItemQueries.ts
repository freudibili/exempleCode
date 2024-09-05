export const FETCH_TROC_ITEMS_QUERY = `
query FetchTrocItems($search: String,$trocTypeId: String,$categoryTypeId: String,$categoriesId: [String],$distance:Int,$coordinates:[Float],$page:Int) {
  trocItems(filter:{search:$search,trocTypeId:$trocTypeId,categoryTypeId:$categoryTypeId,categoriesId:$categoriesId, distance: $distance, coordinates:$coordinates},page:$page){
    trocItems {
      _id
      title
      price
       address {
        coordinates
    }
      imagesUrl
      createdAt
      categoryType{
        _id
      }
      trocType{
          _id
      }
      categories{
          _id
      }
    }
    totalTrocItems
    limitPerPage
  }
}
`;

export const FETCH_TROC_ITEM_QUERY = `
query FetchSingleTrocItem($trocItemId: ID!) {
  trocItem(id: $trocItemId) {
    _id
    title
    description
    imagesUrl
    address {
      formattedAddress
      coordinates
    }
    categoryType {
        _id
    }
    categories {
        _id
    }
    trocType {
        _id
    }
    price
    price
    quality
    condition
    negociateDescription
    picking
    creator {
      _id
      name
      baseline
      imageUrl
    }
    status
    createdAt
  }
}
`;

export const FETCH_TROC_ITEM_CATEGORIES_QUERY = `
query FetchCategories {
  categories {
      categories{
          _id 
          title
          en
          fr
      }
      totalCategories
  }
}
`;

export const FETCH_TROC_ITEM_CATEGORY_ITEM_QUERY = `
query FetchCategoryItems {
  categoryItems {
          _id 
          en
          fr
          category {
             _id 
          }
  }
}
`;

export const REPORT_TROC_ITEM_QUERY = `query reportTrocItem ($trocItemId: ID!) {
  reportTrocItem (id: $trocItemId)
}`;
