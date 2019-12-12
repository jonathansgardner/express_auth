import React, { useContext } from 'react';
import { Context as AuthContext } from '../contexts/AuthContext';

const LoggedIn = () => {
  const { logout } = useContext( AuthContext );

  return (
    <div className="loggedIn">
      <h1>You are logged in!</h1>
      <p className="authLink" onClick={ logout }>logout</p>
    </div>
  );
};

export default LoggedIn;
