import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <p>This is the home page</p>
            <Link to="/about" >About page</Link><br/>
            <Link to="/contributions" >contribution page</Link>
        </div>
    }
}