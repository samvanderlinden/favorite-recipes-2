import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import EditRecipeForm from './components/recipes/EditRecipeForm';
import M from 'materialize-css';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import AuthState from './context/auth/AuthState';
import RecipesState from './context/recipes/RecipesState';
import AlertState from './context/alert/AlertState';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });

  //load token into global headers
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return (
    <AuthState>
      <RecipesState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <EditRecipeForm />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route path='/register' component={Register} />
                  <Route path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </RecipesState>
    </AuthState>
  );
}

export default App;
