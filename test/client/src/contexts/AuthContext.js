import history from '../history';
import createDataContext from '../services/createDataContext';
import { authReducer, SIGN_UP, LOG_IN, SIGN_OUT, ERROR, CLEAR_ERROR } from '../reducers/authReducer';
import api from '../apis/api';


const signup = dispatch => async formData => {
  try {
    const response = await api.post( '/auth/signup', formData );
    await localStorage.setItem( 'token', response.data.token );
    dispatch({ type: SIGN_UP, payload: response.data.token });
  } catch ( err ) {
    console.log( err )
    dispatch({ type: ERROR, payload: err.response.data.error });
  }
};

const login = dispatch => async formData => {
  try {
    const response = await api.post( '/auth/login', formData );
    await localStorage.setItem( 'token', response.data.token );
    dispatch({ type: LOG_IN, payload: response.data.token });
  } catch ( err ) {
    dispatch({ type: ERROR, payload: err.response.data.error });
  }
};

const logout = dispatch => async () => {
  await localStorage.removeItem( 'token' );
  dispatch({ type: SIGN_OUT });
  history.push( '/login' );
};

const setErrorMessage = dispatch => message => {
  dispatch({ type: ERROR, payload: message });
}

const clearErrorMessage = dispatch => () => {
  dispatch({ type: CLEAR_ERROR });
};

const validateToken = dispatch => async () => {
  const token = await localStorage.getItem( 'token' );
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
      await localStorage.removeItem( 'token' );
    }
  }
}

const forgotPassword = dispatch => async ({ email }) => {
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
};

const resetPassword = dispatch => async ({ passwordResetCode, password }) => {
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
};

const actions = {
  signup,
  login,
  logout,
  setErrorMessage,
  clearErrorMessage,
  validateToken,
  forgotPassword,
  resetPassword
}

export const { Provider, Context } = createDataContext(
  authReducer,
  actions,
  { token: null, errorMessage: '' }
);
