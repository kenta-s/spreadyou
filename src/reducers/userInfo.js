import {
  RECEIVE_USER_INFO,
} from "../actionTypes";

const initialState = {
  id: null,
  name: '',
  image: '',
  spPoint: 0,
}

const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER_INFO: {
      const {id, name, image, spPoint} = action.payload
      return {
        ...state,
        id,
        name,
        image,
        spPoint,
      };
    }
    default:
      return state;
  }
}

export default userInfo;
