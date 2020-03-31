import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

const Logout = ({ logout }) => {
  return (
    <Fragment>
      <li ><a id="log_out" onClick={logout} href="/login" aria-expanded="true" className="navbar-right"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
    </Fragment>
  );
};

export default connect(null, { logout })(Logout);