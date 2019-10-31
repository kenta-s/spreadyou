import {
  RECEIVE_PRODUCTS,
  // RECEIVE_PRODUCT,
} from "../actionTypes";

const initialState = {
  items: []
}

const products = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS: {
      const items = action.payload
      return {
        ...state,
        items
      };
    }
    // case RECEIVE_PRODUCT: {
    //   const product = action.payload
    //   const products = state.items.map(item => {
    //     if(item.id === product.id){
    //       return product
    //     }else{
    //       return item
    //     }
    //   })
    //   const hasItem = state.items.find(item => item.id === product.id)
    //   if(!hasItem){
    //     products.push(product)
    //   }
    //   return {
    //     ...state,
    //     items: products,
    //   };
    // }
    default:
      return state;
  }
}

export default products;
