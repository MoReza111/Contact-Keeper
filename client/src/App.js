import React, { Fragment } from 'react'
import './App.css';
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'

import ContactState from './context/contact/ContactState'
import AuthState from './context/auth/AuthState'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ContactState>
    </AuthState>
  );
}

export default App;
