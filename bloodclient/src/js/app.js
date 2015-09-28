import Home from './pages/Home';
import About from './pages/About';
import Contributions from './pages/Contributions';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route} from 'react-router';

let history = createBrowserHistory();

//define routing and handlers
ReactDom.render((
  <Router history={history}>
    <Route name="home" path="/" component={Home} />
    <Route name="about" path="/about" component={About} />
    <Route name="contributions" path="/contributions" component={Contributions} />
  </Router>
), document.getElementById('app'));