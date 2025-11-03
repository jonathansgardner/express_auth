import React, { useCallback, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

const AuthForm = ({ formTitle, onSubmit, buttonText }) => {
  const { errorMessage, clearErrorMessage } = useAuthContext();

  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    onSubmit({ email, password });
  }, [ onSubmit ]);

  return (
    <div className="authForm">
      <h2>{ formTitle }</h2>
      <form
        onSubmit={ handleSubmit }
      >
        <label>Email</label>
        <input
          placeholder="Enter your email"
          value={ email }
          onChange={ e => setEmail( e.target.value ) }
          onFocus={ clearErrorMessage }
        />
        <label>Password</label>
        <input
          placeholder="Enter your password"
          value={ password }
          onChange={ e => setPassword( e.target.value ) }
          onFocus={ clearErrorMessage }
        />
        { errorMessage ? <p className="authError">{ errorMessage }</p> : null }
        <button disabled={ !email || !password }>{ buttonText }</button>
      </form>
    </div>
  );
};

export default AuthForm;
