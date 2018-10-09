import { combineReducers } from 'redux';

import address from './address/reducer';
import keys from './keys/reducer';
import popups from './popups/reducer';
import coins from './coins/reducer';
import transactions from './transactions/reducer';

export default combineReducers({
  address,
  keys,
  popups,
  coins,
  transactions
});
