import React from 'react';
import {Link} from 'react-router';
import AboutContent from '../components/AboutContent';

export default class About extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <p>This is About page</p>
            <AboutContent author="madhumal"/>
            <Link to="/" >home page</Link><br/>
            <Link to="/contributions" >contribution page</Link>
        </div>
    }
}