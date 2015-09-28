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
            <a ref="sideBtn" style={styles.btnopt} href="#">Save a Life</a><br/><br/><br/>

            <a ref="secondaryLarge" style={styles.btnSecondaryLarge} href="#">Save a Life</a><br/><br/><br/>
            <a ref="seBtn" style={styles.btnSecondary} href="#">Save a Life</a><br/><br/><br/>

            <a ref="prLargeBtn" style={styles.btnPrimaryLarge} href="#">Primary large</a><br/><br/>
            <a ref="prBtn" style={styles.btnPrimary} href="#">Primary</a><br/><br/>
            <Link to="/about" >About page</Link><br/>
            <Link to="/contributions" >contribution page</Link>
        </div>
    }

    _popUpLogin(){

    }
}

export default Home;