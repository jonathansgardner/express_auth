export const actionDeclarer = new Proxy (
  {}, {
    get ( target, name ) {
      const x = { [ name ]:  dispatch => ( payload => dispatch( {type:x[name], payload} )) };
      return x[name];
    }
  }
);
