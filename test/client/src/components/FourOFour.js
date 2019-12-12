import React from 'react';
import { Link } from 'react-router-dom';

const FourOFour = props => {
  return (
    <div className="fourOFour">
      <h1>404 Not Found</h1>
      <Link
        to="/"
        className="authLink"
      >
        Home
      </Link>
    </div>
  );
};

export default FourOFour;
