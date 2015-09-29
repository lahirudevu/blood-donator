import Radium from 'radium'
import React from 'react';
import { Link } from 'react-router';
import IndexLink from 'react-router/lib/IndexLink';

class Main extends React.Component{
	render() {
		return (
			<div>
					<ul>
						<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
						<li><Link to={`/about`} activeClassName="active">About</Link></li>
						<li><Link to={`/contributions`} activeClassName="active">Contributions</Link></li>
					</ul>
          <div>
            {React.cloneElement(this.props.children, {...this.props})}
          </div>
			</div>
		)
	}
};
Main = Radium(Main);
export default Main;
