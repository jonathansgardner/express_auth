import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import useValidation from '../hooks/useValidation';
import { useAuthContext } from '../contexts/AuthContext';
import Input from '../components/Input';

const SignUp = () => {
  const { errorMessage, signup, clearErrorMessage } = useAuthContext();
  const [ confirmPassword, setConfirmPassword ] = useState( true );
  const [ validate, setValidate ] = useState( false );

  const { formData, updateField } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: ''
  });

  const { validationData, updateValidationData } = useValidation({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    confirm: true
  });

  const handleButtonClick = useCallback(() => setValidate( true ), []);

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    const isValid = Object.values( validationData ).every( value => value );
    if ( isValid ) {
      signup( formData );
    }
  }, [ formData, signup, validationData ]);

  const checkConfirmPassword = useCallback(() => {
    if ( formData.password.length && formData.confirm.length && formData.password !== formData.confirm ) {
      setConfirmPassword( false );
      return false;
    } else {
      setConfirmPassword( true );
      return true;
    }
  }, [ formData.confirm, formData.password ]);

  return (
    <div className="signup">
      <div className="authForm">
        <h2>Sign Up</h2>
        <form
          onSubmit={ handleSubmit }
          autoComplete="off"
        >
          <Input
            label="First Name"
            name="firstName"
            value={ formData.firstName }
            onChange={ updateField }
            required
            validate={ validate }
            validationCallback={ updateValidationData }
            focusHandler={ clearErrorMessage }
          />
          <Input
            label="Last Name"
            name="lastName"
            value={ formData.lastName }
            onChange={ updateField }
            required
            validate={ validate }
            validationCallback={ updateValidationData }
            focusHandler={ clearErrorMessage }
          />
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
            condition={ confirmPassword }
            conditionMessage="passwords do not match!"
            conditionCheck={ checkConfirmPassword }
            focusHandler={ clearErrorMessage }
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirm"
            value={ formData.confirm }
            onChange={ updateField }
            required
            validate={ validate }
            validationCallback={ updateValidationData }
            condition={ confirmPassword }
            conditionMessage="passwords do not match!"
            conditionCheck={ checkConfirmPassword }
            focusHandler={ clearErrorMessage }
          />
          { errorMessage ? <p className="authError">{ errorMessage }</p> : null }
          <button onClick={ handleButtonClick }>Sign Up</button>
        </form>
      </div>
      <Link
        to="/login"
        className="authLink"
        onClick={ clearErrorMessage }
      >
        Already have an account?
      </Link>
    </div>
  );
};

export default SignUp;
