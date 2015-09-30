import React from 'react';
import Main from '../pages/Main';
import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import Contributions from '../pages/Contributions';

import { Router, IndexRoute, Route } from 'react-router';

export default (
	<Route path="/" component={Main} >
		<IndexRoute component={Home} />
		<Route path="/about" component={About} />
		<Route path="/contributions" component={Contributions} />
		<Route path="*" component={NotFound} />
	</Route>
);

//<Route name="typography" path="typography" handler={Typography} />
