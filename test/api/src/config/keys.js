const {
  API_PORT,
  JWT_SECRET,
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST,
  MONGO_PORT,
  TRANSPORT_HOST,
  TRANSPORT_PORT
} = process.env;

const MONGO_URI = `mongodb://${ MONGO_USER }:${ MONGO_PASS }@${ MONGO_HOST }:${ MONGO_PORT }`;

module.exports = {
  API_PORT,
  JWT_SECRET,
  MONGO_URI,
  TRANSPORT_HOST,
  TRANSPORT_PORT
};
