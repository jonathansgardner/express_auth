import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import history from './history';
import { Context as AuthContext } from './contexts/AuthContext';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ValidatedRoute from './components/ValidatedRoute';
import FourOFour from './components/FourOFour';
import LoggedIn from './components/LoggedIn';
import './App.css';

const App = () => {
  const { token, validateToken } = useContext( AuthContext );

  useEffect(() => {
    validateToken()
  }, []);

  return (
    <div className="app">
      <Router history={ history }>
        { !token
          ? <Switch>
              <Route path="/signup" exact component={ SignUp } />
              <Route path="/login" exact component={ LogIn } />
              <Route path="/forgotPassword" exact component={ ForgotPassword } />
              <ValidatedRoute path="/resetPassword/:id" exact component={ ResetPassword } />
              <Redirect from="/" exact to="/login" />
              <Route component={ FourOFour } />
            </Switch>
          : <Switch>
              <Route path="/" exact component={ LoggedIn } />
              <Redirect from="*" exact to="/" />
            </Switch>
        }
      </Router>
    </div>
  );
};

export default App;
