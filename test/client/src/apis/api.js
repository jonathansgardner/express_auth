import axios from 'axios';

// create a new instance of axios for the SSP API
const api = axios.create({
  baseURL: '/api'
});

// set default headers for all requests to the sspApi
api.defaults.headers[ 'Content-Type' ] = 'application/json'

// this runs before each request is sent to the API
api.interceptors.request.use(
  async config => {
    // look for the token in AsyncStorage
    const token = await localStorage.getItem( 'token' ) || null;
    // if a token is found, add it to the request header
    if ( token ) {
      Object.assign( config.headers, {
        Authorization: `Bearer ${ token }`,
      });
    }
    return config;
  },
  error => console.log( error )
);

export default api;
