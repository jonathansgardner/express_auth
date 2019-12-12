const jwt = require( 'jsonwebtoken' );
const mongoose = require( 'mongoose' );
const { JWT_SECRET } = require( '../config/keys' );
const User = mongoose.model( 'User' );

module.exports = ( req, res, next ) => {
  // get the authorization header from the request
  const { authorization } = req.headers;
  if ( !authorization )
    // return an error if no authorization header is found in the request
    // *** return a more general error message and status when handling authentication errors ***
    return res.status( 401 ).send({ error: 'You must be logged in.' });
  // extract token by removing "Bearer " from the authorization header
  const token = authorization.replace( 'Bearer ', '' );
  // verify the token's secret key
  jwt.verify( token, JWT_SECRET, async ( err, payload ) => {
    if ( err ) {
      // return an error if token cannot be verified
      // *** return a more general error message and status when handling authentication errors ***
      return res.status( 401 ).send({ error: 'You must be logged in.' });
    }
    // get the userId from the token's payload
    const { userId } = payload;
    // find the user in the database using the id
    const user = await User.findById( userId );
    if ( user === null ) {
      // return an error if no user if found with a matching id
      return res.status( 400 ).send({ error: 'Sorry, something went wrong and we were unable to process your request. We apologize for any inconvenince. If the problem persists, please contact support.' });
    }
    // attach the user to the request
    req.user = user;
    // call the next middleware
    next();
  });
};
