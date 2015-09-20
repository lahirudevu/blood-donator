import React from 'react';

export default class Contributor extends React.Component {
	
    constructor(props) {
        super(props);
    }

    render() {

        return <h3>
            {this.props.name}
        </h3>
    }
}