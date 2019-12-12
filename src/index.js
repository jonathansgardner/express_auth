require( './models/User' );
const express = require( 'express' );
const mongoose = require( 'mongoose' );
const bodyParser = require( 'body-parser' );
const requireAuth = require( './middlewares/requireAuth' );
const { MONGO_URI, API_PORT } = require( './config/keys' );
const User = mongoose.model( 'User' );

const app = express();

const mongoUri = MONGO_URI;
mongoose.connect( mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on( 'connected', () => {
  console.log( 'Connected to MongoDB');
});
mongoose.connection.on( 'error', err => {
  console.error( 'Error connectiong to MongoDB', err );
});

app.use( bodyParser.json() );

const authRoutes = require( './routes/authRoutes' );
app.use( '/auth', authRoutes );

app.get( '/user', requireAuth, async ( req, res ) => {
  const user = req.user;
  res.send( user );
});

app.listen( API_PORT, () => {
  console.log( `Listening on port ${ API_PORT }` );
});
