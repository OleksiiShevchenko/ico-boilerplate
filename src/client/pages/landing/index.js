import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import selector from './selector';
import actions from './actions';

import Landing from './landing';

export default withRouter(
  connect(
    selector,
    actions,
  )(Landing),
);
