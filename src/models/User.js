const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' )

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[A-Za-z0-9](?:[A-Za-z0-9]|(?<!\.)[`~!#$%^&*_=+{}|'./?-]){0,62}[A-Za-z0-9]@(([a-zA-Z\-0-9]{0,63}\.)+[a-zA-Z]{2,63})$/,
    maxlength: 254,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  passwordResetCode: {
    type: String,
    required: false,
    unique: true,
    sparse: true
  }
});

// hash and salt the user's password
userSchema.pre( 'save', function( next ) {
  const user = this;
  if ( !user.isModified( 'password' ) ) {
    // if the user has not modified the password, call the next middleware
    return next();
  }
  // generate a salt
  bcrypt.genSalt( 10, ( err, salt ) => {
    if ( err ) {
      // if there is an error, call the next middleware and pass it the err
      return next( err );
    }
    // hash the password together with the salt
    bcrypt.hash( user.password, salt, ( err, hash ) => {
      if ( err ) {
        // if there is an error, call the next middleware and pass it the err
        return next( err );
      }
      // replace the user entered password string with the hashed password
      user.password = hash;
      // call the next middleware
      next();
    });
  })
});

userSchema.pre( 'updateOne', function( next ) {
  const update = this.getUpdate();
  if (!update.password) {
    return next()
  }
  // generate a salt
  bcrypt.genSalt( 10, ( err, salt ) => {
    if ( err ) {
      // if there is an error, call the next middleware and pass it the err
      return next( err );
    }
    // hash the password together with the salt
    bcrypt.hash( update.password, salt, ( err, hash ) => {
      if ( err ) {
        // if there is an error, call the next middleware and pass it the err
        return next( err );
      }
      // replace the user entered password string with the hashed password
      update.password = hash;
      // call the next middleware
      next();
    });
  })
})

// Middleware to handle errors thrown by MongoDB or Mongoose when saving a user to the database
// adds a userMessage to any errors that are caused by invalid data being sent in the request
// message should make sense to the user and be shown on the frontend if a request is somehow submitted with invalid data
// This will catch any errors that manage to slip past frontend validation
userSchema.post( 'save', ( err, doc, next ) => {
  if ( err.code === 11000 && err.keyPattern.email ) {
    // handle duplicate key error thrown by MongoDB if the email found in the request is not unique among the users stored in the the database
    err.userMessage = 'There is already an account associated with that email address.';
    next( err );
  } else if ( err.name === 'ValidationError' ){
    // handle validation errors thrown by Mongoose
    for ( let errorObj in err.errors ) {
      if ( err.errors[ errorObj ].kind === 'required' ) {
        // handle validation error thrown by Mongoose when required fields are missing from the request
        err.userMessage = 'One or more required fields are missing.';
      } else if ( err.errors[ errorObj ].kind === 'regexp' && errorObj === 'email' ) {
        // handle validation error thrown by Mongoose if the email from the request does not match the regular expression provided in the match validator in the user schema
        err.userMessage = 'Invalid email. A valid email address consists of a recipient name and a domain name separated by the "@" character. The recipient must begin and end with an uppercase letter (A-Z), a lowercase letter (a-z), or a digit (0-9). Special characters ( ` ~ ! # $ % ^ & * - _ = + { } | \' . / ? ) may also be used as long as they don\'t directly follow a "." character. The recipient name must not exceed 64 characters in length. The domain name must include one or more second level domains (separated by the "." character) and a top level domain that is at least two characters in length and separated from the second level domain(s) by the "." char. No part of the domain name my exceed 63 characters in length. The entire email address must not exceed 254 characters in length';
      } else if ( err.errors[ errorObj ].kind === 'maxlength' && errorObj === 'email' ) {
        // handle validation error thrown by Mongoose if the email exceeds to maximum number of allowed characters
        err.userMessage = 'Invalid email. Email must not exceed 254 characters.';
      }
    }
    next( err );
  } else {
    err.userMessage = 'An error occurred and we were not able to process your request. Please try again. If you continue to have issues, please contact support.'
    next( err );
  }
});

userSchema.post( 'updateOne', ( err, doc, next ) => {
  if ( err.name === 'ValidationError' ){
    // handle validation errors thrown by Mongoose
    for ( let errorObj in err.errors ) {
      if ( err.errors[ errorObj ].kind === 'required' ) {
        // handle validation error thrown by Mongoose when required fields are missing from the request
        err.userMessage = 'One or more required fields are missing.';
      } else if ( err.errors[ errorObj ].kind === 'regexp' && errorObj === 'email' ) {
        // handle validation error thrown by Mongoose if the email from the request does not match the regular expression provided in the match validator in the user schema
        err.userMessage = 'Invalid email. A valid email address consists of a recipient name and a domain name separated by the "@" character. The recipient must begin and end with an uppercase letter (A-Z), a lowercase letter (a-z), or a digit (0-9). Special characters ( ` ~ ! # $ % ^ & * - _ = + { } | \' . / ? ) may also be used as long as they don\'t directly follow a "." character. The recipient name must not exceed 64 characters in length. The domain name must include one or more second level domains (separated by the "." character) and a top level domain that is at least two characters in length and separated from the second level domain(s) by the "." char. No part of the domain name my exceed 63 characters in length. The entire email address must not exceed 254 characters in length';
      } else if ( err.errors[ errorObj ].kind === 'maxlength' && errorObj === 'email' ) {
        // handle validation error thrown by Mongoose if the email exceeds to maximum number of allowed characters
        err.userMessage = 'Invalid email. Email must not exceed 254 characters.';
      }
    }
    next( err );
  } else {
    err.userMessage = 'An error occurred and we were not able to process your request. Please try again. If you continue to have issues, please contact support.'
    next( err );
  }
});

// create a method on the userSchema to compare the user submitted password with the hashed and salted password in the database
userSchema.methods.comparePassword = function( requestPassword ) {
  // get the hashed and salted password from the database
  const user = this;
  // return a Promise
  return new Promise( ( resolve, reject ) => {
    // compare the password submitted in the request with the hashed and salted password in the database
    bcrypt.compare( requestPassword, user.password, ( err, isMatch ) => {
      if ( err ) {
        // if there's an error, reject the Promise and pass in the err
        return reject( err );
      }
      if( !isMatch ) {
        // if the passwords don't match, reject the Promise and pass in a value of false
        return reject( false );
      }
      // resolve the Promise and pass in a value of true
      resolve( true );
    });
  });
}

mongoose.model( 'User', userSchema );
