import React from 'react';

export default class AboutContent extends React.Component {
	
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <p>This About page content is written by {this.props.author}</p>
        </div>
    }
}