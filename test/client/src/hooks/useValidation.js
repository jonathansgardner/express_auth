import { useMemo, useReducer } from 'react';
import validationReducer, { SET, UPDATE } from '../reducers/validationReducer';

const useValidation = ( initialState = {} ) => {
  const [ state, dispatch ] = useReducer( validationReducer, initialState );

  const updateValidationData = ({ name, value }) => UPDATE( dispatch )({ name, value });

  const setValidationData = useMemo( data => data => {
    if ( data ) {
      SET( dispatch )( data );
    }
  }, [] );

  return { validationData: state, updateValidationData, setValidationData };
}

export default useValidation;
