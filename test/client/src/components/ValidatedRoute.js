import React, { useEffect, useState } from 'react';
import api from '../apis/api';
import FourOFour from '../components/FourOFour';

const ValidatedRoute = props => {

  const [ isLoaded, setIsLoaded ] = useState( false );
  const [ isValid, setIsValid ] = useState( false )

  useEffect(() => {
    const effect = async () => {
      try {
        const response = await api.post( '/auth/validatePasswordResetCode', { passwordResetCode: props.computedMatch.params.id } );
        if ( response.status === 200 ) {
          setIsValid( true );
        };
      } catch ( err ) {
        setIsValid( false );
      }
      setIsLoaded( true );
    }
    effect();
  });

  return (
    <>
      { isLoaded
        ? <>
            { isValid
              ? <props.component { ...props } />
              : <FourOFour { ...props }/>
            }
          </>
        : <></>
      }
    </>
  );
};

export default ValidatedRoute;
