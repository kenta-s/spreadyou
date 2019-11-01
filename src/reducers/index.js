import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import { reducer as flashReducer } from 'redux-flash'
import { reduxTokenAuthReducer } from 'redux-token-auth'
import loading from './loading'
import spreadee from './spreadee'
import myProducts from './myProducts'
import myProduct from './myProduct'
import tweets from './tweets'

export default (history) => combineReducers({
  reduxTokenAuth: reduxTokenAuthReducer,
  router: connectRouter(history),
  flash: flashReducer,
  loading,
  spreadee,
  myProducts,
  myProduct,
  tweets,
});
