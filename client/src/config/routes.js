import React from 'react';
import Main from '../pages/Main';
import Home from '../pages/Home';
import Router from 'react-router';
let {DefaultRoute, Route, Routes} = Router;

export default (
	<Route name="app" path="/" handler={Main} >
		<DefaultRoute name="Home" handler={Home} />
	</Route>
);
