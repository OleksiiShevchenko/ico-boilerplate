import { combineReducers } from 'redux';
import * as actions from './actions';


export default combineReducers({

  coin (state = 'BTC', action) {
    switch (action.type) {
      case actions.SELECT:
        return action.data;
      default:
        return state;
    }
  }

});
