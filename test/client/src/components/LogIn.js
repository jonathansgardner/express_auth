import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import useValidation from '../hooks/useValidation';
import { Context as AuthContext } from '../contexts/AuthContext';
import Input from '../components/Input';

const LogIn = () => {
  const { errorMessage, login, clearErrorMessage } = useContext( AuthContext );

  const [ validate, setValidate ] = useState( false );

  const { formData, updateField } = useForm({
    email: '',
    password: ''
  });

  const { validationData, updateValidationData } = useValidation({
    email: true,
    password: true
  });

  const handleSubmit = e => {
    e.preventDefault();
    const isValid = Object.values( validationData ).every( value => value );
    if ( isValid ) {
      login( formData );
    }
  };

  return (
    <div className="login">
      <div className="authForm">
        <h2>Log In</h2>
        <form
          onSubmit={ handleSubmit }
          autoComplete="off"
        >
          <Input
            label="Email"
            name="email"
            value={ formData.email }
            onChange={ updateField }
            required
            validate={ validate }
            validationCallback={ updateValidationData }
            validation={ /^[A-Za-z0-9](?:[A-Za-z0-9]|(?<!\.)[`~!#$%^&*_=+{}|'./?-]){0,62}[A-Za-z0-9]@(([a-zA-Z\-0-9]{0,63}\.)+[a-zA-Z]{2,63})$/ }
            validationMessage="Please enter a valid email!"
            spellCheck={ false }
            focusHandler={ clearErrorMessage }
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={ formData.password }
            onChange={ updateField }
            required
            validate={ validate }
            validationCallback={ updateValidationData }
            focusHandler={ clearErrorMessage }
          />
          <Link
            to={{
              pathname: '/forgotPassword',
              state: {
                initialEmail: formData.email
              }
            }}
            className="authLink"
          >
            Forgot your password?
          </Link>
          { errorMessage ? <p className="authError">{ errorMessage }</p> : null }
          <button onClick={ () => setValidate( true ) }>Log In</button>
        </form>
      </div>
      <Link
        to="/signup"
        className="authLink"
        onClick={ clearErrorMessage }
      >
        Create a new account
      </Link>
    </div>
  );
};

export default LogIn;
