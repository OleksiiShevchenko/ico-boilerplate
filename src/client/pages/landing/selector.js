import { createStructuredSelector, createSelector } from 'reselect';

import {
  address,
  loading
} from '../../redux/address/selectors';


export default createStructuredSelector({
  address,
  loading,
});
