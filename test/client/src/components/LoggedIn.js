import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';

const LoggedIn = () => {
  const { logout } = useAuthContext();

  return (
    <div className="loggedIn">
      <h1>You are logged in!</h1>
      <p
        className="authLink"
        onClick={ logout }
      >
        logout
      </p>
    </div>
  );
};

export default LoggedIn;
