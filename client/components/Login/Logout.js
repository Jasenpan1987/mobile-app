import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutAct } from './actions';

const LogoutComponent = ({ logout }) => {
  return (
    <a onClick={() => { logout(); }}>
      log out
    </a>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAct())
  };
}

LogoutComponent.propTypes = {
  logout: PropTypes.func.isRequired
};


export const Logout = connect(null, mapDispatchToProps)(LogoutComponent);

