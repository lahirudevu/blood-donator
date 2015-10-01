import styles from '../../styles/btns.js';
import React from 'react';
import {Link} from 'react-router';
import Radium from 'radium';

//import Components
import Button from '../components/Button';

let homeBack = document.createElement('img');
homeBack.src = require('./img/family.png');

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
           marginTop: '0%',
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
         },
         appBody: {
          backgroundImage: `url(${homeBack.src})`,
          backgroundPosition: 'bottom center',
          backgroundColor : '#1f90ff',
          backgroundRepeat: 'no-repeat',
          width : '100%',
          height : '91vh',
          paddingTop : '5%'
        }
       }
        return (
          <div style={styles.appBody}>
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
