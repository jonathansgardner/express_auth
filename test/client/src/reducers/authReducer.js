import { actionDeclarer } from '../services/actionDeclarer';

export const { SIGN_UP, LOG_IN, SIGN_OUT, ERROR, CLEAR_ERROR } = actionDeclarer;

export const authReducer = ( state, action ) => {
  switch ( action.type ) {
    case SIGN_UP:
    case LOG_IN:
      return { token: action.payload, errorMessage: ''  };
    case SIGN_OUT:
      return { token: null, errorMessage: '' };
    case ERROR:
      return { ...state, errorMessage: action.payload };
    case CLEAR_ERROR:
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};
