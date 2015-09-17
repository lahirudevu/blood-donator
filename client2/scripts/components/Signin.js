import React from 'react';

export default class Signin extends React.Component {
	render() {
		return (
			<div>
				<h3>Login With:</h3>
				<hr />
				<a href="http://127.0.0.1:3001/auth/google">Google</a><hr />
				<a href="http://127.0.0.1:3001/auth/facebook">Facebook</a><hr />
				<a href="http://127.0.0.1:3001/auth/twitter">Twitter</a>
			</div>
		);
	}
};