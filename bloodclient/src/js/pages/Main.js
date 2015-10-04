import Radium from 'radium'
import React from 'react';
import { Link } from 'react-router';
import IndexLink from 'react-router/lib/IndexLink';

//import Components
import Button from '../components/Button';

//import base styles
import '../../styles/base/styles.less';
import '../../styles/pages/default.less';

class Main extends React.Component{
	render() {

		return (
			<div>
        <header className="topNavbar">
					<div className="navWrapper col-lg-9 col-md-10">
						<div className="logo left">
							<p className="logotext">H</p>
	          </div>
	          <div className="userSection right">
							<Button type="secondory" size="small" label="Sign in / Sign up" href="/signin" />&nbsp;&nbsp;
							<Button type="save" size="small" label="Save a Life" />
	          </div>
						<nav className="mainNavigation right">
							<ul>
								<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
								<li><Link to={`/events`} activeClassName="active">Events</Link></li>
								<li><Link to={`/request`} activeClassName="active">Request a Help</Link></li>
								<li><Link to={`/about`} activeClassName="active">About</Link></li>
								<li><Link to={`/contributions`} activeClassName="active">Contributions</Link></li>
							</ul>
	          </nav>
					</div>
        </header>
        <section className="appBody">
          {React.cloneElement(this.props.children, {...this.props})}
        </section>
				<footer className="appFooter">

				</footer>
			</div>
		)
	}
};
Main = Radium(Main);
export default Main;
