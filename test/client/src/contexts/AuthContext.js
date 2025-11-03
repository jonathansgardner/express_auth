import history from '../history';
import createDataContext from '../services/createDataContext';
import { authReducer, SIGN_UP, LOG_IN, SIGN_OUT, ERROR, CLEAR_ERROR } from '../reducers/authReducer';
import api from '../apis/api';
import { useCallback, useContext } from 'react';

const { Provider, Context } = createDataContext(
  authReducer,
  { token: null, errorMessage: '' }
);

function useAuthContext() {
  const { dispatch, ...state } = useContext(Context);

  const signup = useCallback(async formData => {
    try {
      const response = await api.post( '/auth/signup', formData );
      localStorage.setItem( 'token', response.data.token );
      dispatch({ type: SIGN_UP, payload: response.data.token });
    } catch ( err ) {
      console.log( err )
      dispatch({ type: ERROR, payload: err.response.data.error });
    }
  }, [ dispatch ]);

  const login = useCallback(async formData => {
    try {
      const response = await api.post( '/auth/login', formData );
      localStorage.setItem( 'token', response.data.token );
      dispatch({ type: LOG_IN, payload: response.data.token });
    } catch ( err ) {
      dispatch({ type: ERROR, payload: err.response.data.error });
    }
  }, [ dispatch ]);

  const logout = useCallback(() => {
    localStorage.removeItem( 'token' );
    dispatch({ type: SIGN_OUT });
  }, [ dispatch ]);

  const setErrorMessage = useCallback(message => {
    dispatch({ type: ERROR, payload: message });
  }, [ dispatch ]);

  const clearErrorMessage = useCallback(() => {
    dispatch({ type: CLEAR_ERROR });
  }, [ dispatch ]);

  const validateToken = useCallback(async () => {
    const token = localStorage.getItem( 'token' );
    if ( token ) {
      try {
        const response = await api({
          method: 'get',
          url: '/auth/validateToken',
          headers: {
            Authorization: `Bearer ${ token }`
          }
        });
        if ( response.status === 200 ) {
          dispatch({ type: LOG_IN, payload: token });
        }
      } catch ( err ) {
        localStorage.removeItem( 'token' );
      }
    }
  }, [ dispatch ]);

  const forgotPassword = useCallback(async ({ email }) => {
    try {
      const response = await api({
        method: 'post',
        url: '/auth/sendResetLink',
        data: { email }
      });
      if ( response.status === 200 ) {
        return true;
      }
    } catch ( err ) {
      dispatch({ type: ERROR, payload: err.response.data.error });
      return false;
    }
  }, [ dispatch ]);

  const resetPassword = useCallback(async ({ passwordResetCode, password }) => {
    try {
      const response = await api({
        method: 'post',
        url: '/auth/resetPassword',
        data: { passwordResetCode, password }
      });
      if ( response.status === 200 ) {
        history.push( '/login' );
      }
    } catch ( err ) {
      dispatch({ type: ERROR, payload: err.response.data.error });
    }
  }, [ dispatch ]);

  return {
    ...state,
    signup,
    login,
    logout,
    setErrorMessage,
    clearErrorMessage,
    validateToken,
    forgotPassword,
    resetPassword
  };
}

export { Provider, useAuthContext };
