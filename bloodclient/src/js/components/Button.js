import Radium from 'radium';
import React from 'react';
import { Link } from 'react-router';

import styles from './styles/button.js';

//Wrap react router <Link> component with radium
let RadiumLink = Radium(Link);

@Radium
class Button extends React.Component {
  renderButton(){
    const {size, type, label, ...props} = this.props;
    return (
      <button style={[
          styles.base,
					styles[size],
          styles[type],
        ]}
				onClick={this.props.onClick}
				{...props}
			>
				{label}
			</button>
    );
  }
  renderLink(){
    const {size, type, label, href, ...props} = this.props;
    return (
      <RadiumLink style={[
          styles.base,
					styles[size],
          styles[type],
        ]}
				onClick={this.props.onClick}
				{...props}
        to={href}
        activeClassName="active"
			>
				{label}
			</RadiumLink>
    );
  }

  render() {
    if(this.props.href) {
      return this.renderLink();
    } else {
      return this.renderButton();
    }
	}
}

export default Button;
