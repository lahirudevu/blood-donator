import Radium from 'radium';
import React from 'react';

import styles from './styles/button.js';

@Radium
class Button extends React.Component {
  render() {
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
}

export default Button;
