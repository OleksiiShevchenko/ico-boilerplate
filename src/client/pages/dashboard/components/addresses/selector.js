import { createStructuredSelector } from 'reselect';

import {
  coin
} from '../../../../redux/coins/selectors';

import {
  derivationIndex,
  addressList
} from '../../../../redux/address/selectors';


export default createStructuredSelector({
  coin,
  derivationIndex,
  addressList
});
