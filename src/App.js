import React from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';
import CoderockrLogo from './assets/images/hand-yellow.svg'
import Home from './Home'
import Footer from './Footer';
import GitHub from './Origins/GitHub';

const App = () => (
  <div className="CWSPApp">
    <header>
      <a href="/">
        <CoderockrLogo className="logo" />
        <h1 className="text">CODEROCKR WAY PROJECT SETUP</h1>
      </a>
    </header>
    <div className=" container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/github/" component={GitHub} />
      </Switch>
    </div>
    <Footer />
  </div>
)

export default App;
