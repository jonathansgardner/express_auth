import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { useAuthContext } from '../contexts/AuthContext';
import Input from '../components/Input';

const ForgotPassword = props => {

  const { initialEmail } = props.location.state;

  const { errorMessage, forgotPassword, clearErrorMessage } = useAuthContext();

  const [ emailSent, setEmailSent ] = useState( '' );

  const { formData, updateField } = useForm({
    email: initialEmail
  });

  const handleSubmit = useCallback( async e => {
    e.preventDefault()
    const response = await forgotPassword( formData );
    if ( response === true ) {
      setEmailSent( true );
    }
  }, [ forgotPassword, formData ]);

  return (
    <div className="forgotPassword">
      <div className="authForm">
        <h2>Reset Password</h2>
        { emailSent
          ? <>
              <p>An email has been sent to <strong>{ formData.email }</strong> with further insructions.</p>
              <form onSubmit={ handleSubmit }>
                <button>Resend</button>
              </form>
            </>
          : <form
              onSubmit={ handleSubmit }
              autoComplete="off"
            >
              <Input
                label="Email"
                name="email"
                value={ formData.email }
                onChange={ updateField }
                required
                validation={ /^[A-Za-z0-9](?:[A-Za-z0-9]|(?<!\.)[`~!#$%^&*_=+{}|'./?-]){0,62}[A-Za-z0-9]@(([a-zA-Z\-0-9]{0,63}\.)+[a-zA-Z]{2,63})$/ }
                validationMessage="Please enter a valid email!"
                spellCheck={ false }
              />
              { errorMessage ? <p className="authError">{ errorMessage }</p> : null }
              <button>Send Reset Link</button>
            </form>
        }
      </div>
      <Link
        to="/login"
        className="authLink"
        onClick={ clearErrorMessage }
      >
        &larr; back to login
      </Link>
    </div>
  );
};

export default ForgotPassword;
