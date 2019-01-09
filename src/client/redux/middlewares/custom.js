import * as keysActions from '../keys/actions';
import * as addressActions from '../address/actions';
import * as coinActions from '../coins/actions';
import * as txActions from '../transactions/actions';
import * as popupsActions from '../popups/actions';
import { satoshiToCoins } from '../../../utils';

export default function coinMiddleware() {
  return store => next => action => {
    next(action);

    if (
      action &&
      action.type === `${coinActions.prefix}/SELECT` ||
      action.type === `${txActions.prefix}/TRANSFER_SUCCESS`
    ) {
      const { coins: { coin } } = store.getState();
      store.dispatch(addressActions.getIndex(coin));
      store.dispatch(addressActions.listAddresses(coin));
      store.dispatch(txActions.getBalance(coin));
    }

    if (
      action &&
      (action.type === `${coinActions.prefix}/SELECT` ||
      action.type === `${keysActions.prefix}/GENERATE_KEYS_SUCCESS` ||
      action.type === `${keysActions.prefix}/IMPORT_KEYS_SUCCESS` ||
      action.type === `${keysActions.prefix}/DELETE_KEY_SUCCESS`)
    ) {
      const { coins: { coin } } = store.getState();
      store.dispatch(keysActions.getKeys(coin));
    }

    if (
      action &&
      action.type === `${keysActions.prefix}/GENERATE_KEYS_SUCCESS`
    ) {
      store.dispatch(popupsActions.toggleMnemonicPopup(true));
    }

    if (
      action &&
      action.type === `${txActions.prefix}/CREATE_TX_SUCCESS`
    ) {
      const href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(action.data, null, 2));
      const anchor = document.createElement('a');
      anchor.setAttribute("href", href);
      anchor.setAttribute("download", "transaction.json");
      anchor.click();
    }

    if (
      action &&
      action.type === `${txActions.prefix}/GET_BALANCE_SUCCESS`
    ) {
      const { coins: { coin }, transactions: { balance } } = store.getState();
      if (coin === 'BTC') store.dispatch(txActions.handleInput(satoshiToCoins(balance).toString(), 'amount', true));
    }


  };
}
