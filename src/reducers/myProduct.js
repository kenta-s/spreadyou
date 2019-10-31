import {
  RECEIVE_MY_PRODUCT,
} from "../actionTypes";

const initialState = {
  id: null,
  summary: '',
  description: '',
  url: '',
  tweets: []
}

const myProduct = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_MY_PRODUCT: {
      const {id, summary, description, url, tweets} = action.payload
      return {
        ...state,
        id,
        summary,
        description,
        url,
        spreadAt,
      };
    }
    default:
      return state;
  }
}

export default myProduct;

