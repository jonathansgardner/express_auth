import React, { useCallback, useEffect, useState } from 'react';
import ShowPassword from './eye-solid.svg';
import HidePassword from './eye-slash-solid.svg';

const Input = React.forwardRef(( props, ref ) => {

  const {
    label,
    type="text",
    name,
    placeholder="",
    value,
    onChange, // function
    required, // boolean
    validate,
    validationCallback,
    validation, // regEx
    validationMessage, // string
    condition,
    conditionMessage,
    conditionCheck,
    readOnly=false,
    focusHandler,
    ...rest
  } = props;

  const [ isValid, setIsValid ] = useState( true );
  const [ errorMessage, setErrorMessage ] = useState( '' );
  const [ showPassword, setShowPassword ] = useState( false );

  useEffect(() => {
    if ( validationCallback ) {
      if ( !isValid ) {
        validationCallback({ name, value: false });
      } else {
        validationCallback({ name, value: true });
      }
    }
  }, [ isValid, name, validationCallback ]);

  useEffect(() => {
    if ( condition === false ) {
      setIsValid( false );
      setErrorMessage( conditionMessage );
    } else {
      setIsValid( true );
      setErrorMessage( '' );
    }
  }, [ condition, conditionMessage ]);

  const handleFocus = useCallback(() => {
    if ( focusHandler ) {
      focusHandler();
    }
    if ( !isValid ) {
      setIsValid( true );
    }
    if ( errorMessage ) {
      setErrorMessage( '' );
    }
  }, [ errorMessage, focusHandler, isValid ]);

  const handleBlur = useCallback(() => {
    if ( conditionCheck ) {
      conditionCheck();
    }
    if ( required ) {
      const noValue = !value.toString().length
      if ( noValue ) {
        setIsValid( false );
        setErrorMessage( `${ label } is a required field.`);
        return;
      }
    }
    if ( validation && !validation.test( value ) ) {
      setIsValid( false );
      setErrorMessage( validationMessage );
      return;
    }
    if ( condition === false ) {
      setIsValid( false );
      setErrorMessage( conditionMessage );
    }
  }, [
    condition,
    conditionCheck,
    conditionMessage,
    label,
    required,
    validation,
    validationMessage,
    value
  ]);

  // useEffect(() => {
  //   handleBlur();
  // }, [ handleBlur, validate ]);

  const togglePassword = useCallback(() => {
    setShowPassword( prevState => !prevState );
  }, []);

  return (
    <div className={ `input ${ !isValid ? 'invalid' : null } ${ readOnly ? 'readOnly' : null }` }>
      <label>{ label }</label>
      <input
        ref={ ref }
        type={ type === 'password'
                ? !showPassword
                  ? 'password'
                  : 'text'
                : type
        }
        name={ name }
        placeholder={ placeholder }
        value={ value }
        onChange={ onChange }
        onFocus={ handleFocus }
        onBlur={ handleBlur }
        { ...rest }
      />
      { type === 'password' && value
          ? <img
              className="passwordToggle"
              src={ showPassword ? HidePassword : ShowPassword }
              alt=""
              onClick={ togglePassword }
            />
          : null
      }
      <span className="validationMessage">{ errorMessage ? errorMessage : null }</span>
    </div>
  );
});

export default Input;
