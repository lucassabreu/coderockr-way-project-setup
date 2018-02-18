import React from 'react';
import './App.css';
import CoderockrLogo from './assets/images/hand-yellow.svg'
import Home from './Home'
import Footer from './Footer';
import { Switch, Route } from 'react-router-dom'

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
      </Switch>
    </div>
    <Footer />
  </div>
)

export default App;
