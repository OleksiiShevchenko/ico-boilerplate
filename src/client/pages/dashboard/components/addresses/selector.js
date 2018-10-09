import { createStructuredSelector } from 'reselect';

import {
  coin
} from '../../../../redux/coins/selectors';

import {
  derivationIndex,
  addressList,
  masterAddresses,
  loading
} from '../../../../redux/address/selectors';


export default createStructuredSelector({
  loading,
  coin,
  derivationIndex,
  addressList,
  masterAddresses
});
