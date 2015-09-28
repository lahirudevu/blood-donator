import styles from '../../css/btns.js';
import React from 'react';
import {Link} from 'react-router';
import Radium from 'radium';

@Radium
class Home extends React.Component {

    constructor(props) {
        super(props);
        this._popUpLogin = this._popUpLogin.bind(this);
    }

    render() {
        return <div>
            <p>This is the home page</p>
            <a ref="mainBtn" style={styles.btnoptLarge} href="#">Save a Life</a><br/><br/>
            <a ref="sideBtn" style={styles.btnopt} href="#">Save a Life</a><br/><br/>
            <Link to="/about" >About page</Link><br/>
            <Link to="/contributions" >contribution page</Link>
        </div>
    }

    _popUpLogin(){

    }
}

export default Home;