import React, { useContext, useState } from 'react';
import useForm from '../hooks/useForm';
import { Context as AuthContext } from '../contexts/AuthContext';
import Input from '../components/Input';

const ResetPassword = props => {
  const { errorMessage, resetPassword } = useContext( AuthContext );

  const [ confirmPassword, setConfirmPassword ] = useState( true );

  const { formData, updateField } = useForm({
    password: '',
    confirm: ''
  });

  const handleSubmit = e => {
    e.preventDefault()
    resetPassword({
      passwordResetCode: props.match.params.passwordResetCode,
      password: formData.password
    });
  };

  const checkConfirmPassword = () => {
    console.log( `logic: ${ formData.password.length && formData.confirm.length && formData.password !== formData.confirm }`)
    if ( formData.password.length && formData.confirm.length && formData.password !== formData.confirm ) {
      setConfirmPassword( false );
      return false;
    } else {
      setConfirmPassword( true );
      return true;
    }
  };

  return (
    <div className="resetPassword">
      <div className="authForm">
        <h2>Reset Password</h2>
        <form
          onSubmit={ handleSubmit }
        >
          <Input
            label="New Password"
            type="password"
            name="password"
            value={ formData.password }
            onChange={ updateField }
            required
            condition={ confirmPassword }
            conditionMessage="passwords do not match!"
            conditionCheck={ checkConfirmPassword }
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirm"
            value={ formData.confirm }
            onChange={ updateField }
            required
            condition={ confirmPassword }
            conditionMessage="passwords do not match!"
            conditionCheck={ checkConfirmPassword }
          />
          { errorMessage ? <p className="authError">{ errorMessage }</p> : null }
          <button>Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
