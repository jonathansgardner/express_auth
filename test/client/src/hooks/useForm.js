import { useMemo, useReducer } from 'react';
import formReducer, { SET, UPDATE } from '../reducers/formReducer';

const useForm = ( initialState = {} ) => {
  const [ state, dispatch ] = useReducer( formReducer, initialState );

  const updateField = ({ target }) => UPDATE( dispatch )( target )

  const setFormData = useMemo( data => data => {
    if ( data ) {
      SET( dispatch )( data );
    }
  }, [] );

  return { formData: state, updateField, setFormData };
}

export default useForm;
