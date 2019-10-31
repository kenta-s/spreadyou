import {
  RECEIVE_MY_PRODUCTS,
} from "../actionTypes";

const initialState = {
  items: []
}

const myProducts = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_MY_PRODUCTS: {
      const items = action.payload
      return {
        ...state,
        items
      };
    }
    default:
      return state;
  }
}

export default myProducts;
