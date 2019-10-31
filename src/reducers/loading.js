import {
  LOADING_START,
  LOADING_FINISH,
} from "../actionTypes";

const initialState = {
  status: false,
} 

const loading = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START: {
      return {
        ...state,
        status: true,
      };
    }
    case LOADING_FINISH: {
      return {
        ...state,
        status: false,
      };
    }
    default:
      return state;
  }
}

export default loading;
