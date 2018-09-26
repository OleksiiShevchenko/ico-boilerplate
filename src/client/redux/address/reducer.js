
import { combineReducers } from 'redux';
import * as actions from './actions';


export default combineReducers({

  loading (state = false, action) {
    switch (action.type) {
      case actions.GET_ADDRESS_REQUEST:
        return true;
      case actions.GET_ADDRESS_SUCCESS:
      case actions.GET_ADDRESS_FAILURE:
        return false;
      default:
        return state;
    }
  },

  address (state = null, action) {
    switch (action.type) {
      case actions.GET_ADDRESS_SUCCESS:
        return action.data;
      default:
        return state;
    }
  },

  derivationIndex (state = null, action) {
    switch (action.type) {
      case actions.GET_INDEX_SUCCESS:
        return action.data;
      default:
        return state;
    }
  },

  addressList (state = [], action) {
    switch (action.type) {
      case actions.LIST_ADDRESSES_SUCCESS:
        return action.data;
      default:
        return state;
    }
  },

});
