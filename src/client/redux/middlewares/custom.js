import * as keysActions from '../keys/actions';
import * as coinActions from '../coins/actions';
import * as popupsActions from '../popups/actions';


export default function coinMiddleware() {
  return store => next => action => {
    next(action);
    if (
      action &&
      action.type === `${coinActions.prefix}/SELECT` ||
      action.type === `${keysActions.prefix}/GENERATE_KEYS_SUCCESS` ||
      action.type === `${keysActions.prefix}/IMPORT_KEYS_SUCCESS`
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
  };
}
