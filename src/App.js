import React from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';
import CoderockrLogo from './assets/images/hand-yellow.svg'
import Home from './Home'
import Footer from './Footer';
import GitHub from './Origins/GitHub';
import GitLab from './Origins/GitLab';
import Trello from './Origins/Trello';

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
        <Route exact path="/github" component={GitHub} />
        <Route exact path="/gitlab" component={GitLab} />
        <Route exact path="/trello" component={Trello} />
      </Switch>
    </div>
    <Footer />
  </div>
)

export default App;
