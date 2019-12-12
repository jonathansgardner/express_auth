import { actionDeclarer } from '../services/actionDeclarer';

export const { UPDATE, SET } = actionDeclarer;

const formReducer = ( state = {}, action ) => {
  switch ( action.type ) {
    case UPDATE:
      return { ...state, [ action.payload.name ]: action.payload.value };
    case SET:
      return action.payload;
    default:
      return state;
  }
};

export default formReducer;
