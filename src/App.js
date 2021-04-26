
import React, { Component } from 'react';
import './App.css';

import Login from './components/Login';
import Main from './components/Main';

import {
  BrowserRouter as Router,
  Route, Switch
  } from "react-router-dom";

  function App() {
    return (
      <Router>
      <div className="App">
  
        <Switch>
          <Route path="/callback*" component={Main}/>
          <Route path="/" component={Login}/>
        </Switch>
      </div>
      </Router>
    );
  }
export default App;