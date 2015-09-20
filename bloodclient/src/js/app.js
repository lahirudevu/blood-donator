//import '../css/master.scss';

import Home from './pages/Home';
import About from './pages/About';
import Contributions from './pages/Contributions';

import React from 'react';
import {Router, Route} from 'react-router';

//define routing and handlers
React.render((
  <Router>
    <Route name="home" path="/" component={Home} />
    <Route name="about" path="/about" component={About} />
    <Route name="contributions" path="/contributions" component={Contributions} />
  </Router>
), document.getElementById('app'));