import {
  RECEIVE_TWEETS,
} from "../actionTypes";

const initialState = {
  items: []
}

const tweets = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TWEETS: {
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

export default tweets;
