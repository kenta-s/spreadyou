import {
  RECEIVE_PRODUCT,
} from "../actionTypes";

const initialState = {
  id: null,
  summary: '',
  description: '',
  url: '',
  spreadAt: '',
}

const product = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCT: {
      const {id, summary, description, url, spreadAt} = action.payload
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

export default product;
