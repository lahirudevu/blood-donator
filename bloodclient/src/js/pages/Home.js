import styles from '../../styles/btns.js';
import React from 'react';
import {Link} from 'react-router';
import Radium from 'radium';

//import Components
import Button from '../components/Button';

@Radium
class Home extends React.Component {

    constructor(props) {
        super(props);
        this._popUpLogin = this._popUpLogin.bind(this);
    }

    render() {
       let styles = {
         pageTitle: {
           fontSize: '4em',
           fontWeight: '100',
           color: '#fff',
           marginTop: '5%',
           textAlign: 'center'
         },
         bigText: {
           fontSize: '1.5em',
           fontWeight: '300'
         },
         mainButtonSection: {
           textAlign: 'center',
           marginTop: '5%'
         },
         rqstLink: {
           color: '#fff',
           fontWeight: '500',
           fontSize: '1.15em',
           marginTop: '0.4%',
           display: 'inline-block',
           ':hover': {
             color: '#001e3a'
           }
         }
       }
        return (
          <div>
              <h1 style={styles.pageTitle}>you can <span style={styles.bigText}>keep</span> them <span style={styles.bigText}>happy</span></h1>
              <div style={styles.mainButtonSection}>
                <Button type="save" size="large" label="Save a Life" />
                <br /><a href="#" style={styles.rqstLink}>or Request for help</a>
              </div>
          </div>
        );
    }

    _popUpLogin(){

    }
}

export default Home;
