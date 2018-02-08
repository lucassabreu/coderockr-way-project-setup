import React, { Component } from 'react';
import './App.css';
import Home from './Home'
import { Switch, Route } from 'react-router-dom'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
)

export default App;
