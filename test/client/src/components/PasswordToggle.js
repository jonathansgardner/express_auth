import React from 'react';
import { ReactComponent as ShowPassword } from './eye-solid.svg';
import { ReactComponent as HidePassword } from './eye-slash-solid.svg';

const PasswordToggle = ({ showPassword }) => {
  return (
    <>
      { showPassword ? HidePassword : ShowPassword }
    </>
  );
}
