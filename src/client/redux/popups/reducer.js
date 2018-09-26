import { combineReducers } from 'redux';
import * as actions from './actions';


export default combineReducers({

  mnemonicPopup (state = false, action) {
    switch (action.type) {
      case actions.TOGGLE_MNEMONIC:
        return action.data;
      default:
        return state;
    }
  }

});
