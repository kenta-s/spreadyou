import {
  RECEIVE_SPREADEE,
  TWEETED_SPREADEE,
} from "../actionTypes";

const initialState = {
  id: null,
  summary: '',
  description: '',
  url: '',
  isSpread: false,
}

const spreadee = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SPREADEE: {
      const {id, summary, description, url, isSpread} = action.payload
      return {
        ...state,
        id,
        summary,
        description,
        url,
        isSpread,
      };
    }
    case TWEETED_SPREADEE: {
      return {
        ...state,
        isSpread: true,
      };
    }
    default:
      return state;
  }
}

export default spreadee;
