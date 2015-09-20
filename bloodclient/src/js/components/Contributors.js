import React from 'react';
import Contributor from './Contributor';

export default class Contributors extends React.Component {
	
    constructor(props) {
        super(props);
    }

    render() {

    	if (Object.keys(this.props.allContributors).length < 1) {
      		return null;
    	}

    	var contributors = [];

    	for (var key in this.props.allContributors) {
      		contributors.push(<Contributor name={this.props.allContributors[key].text} />);
    	}

        return <div id="contributor-list">
        	{contributors}
        </div>
    }
}