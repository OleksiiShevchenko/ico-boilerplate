import Addresses from './addresses';
import { connect } from 'react-redux';

import selector from './selector';
import actions from './actions';

export default connect(
  selector,
  actions,
)(Addresses);