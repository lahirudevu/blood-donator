import React from 'react';
import {Link} from 'react-router';
import Contributors from '../components/Contributors';
import ContributionStore from '../stores/ContributionStore';
import ContributionActions from '../actions/ContributionActions';
var ENTER_KEY_CODE = 13;

function getContributionState() {
  return {
    allContributors: ContributionStore.getAll()
  };
}

export default class Contributions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allContributors: ContributionStore.getAll()
        };
        this._onChange = this._onChange.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
    }

    componentDidMount() {
         ContributionStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
         ContributionStore.removeChangeListener(this._onChange);
    }

    render() {
        return <div>
                    <h1>contributors</h1>
                     <Contributors allContributors={this.state.allContributors}/>
                     <input ref="contribIP" onKeyDown={this._onKeyDown} type="text" id="newContributor" placeholder="type and enter contributor" />
                     <br/><Link to="/" >home page</Link>
               </div>
    }

    _onChange() {
        this.setState(getContributionState());
    }

    _onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            let value = React.findDOMNode(this.refs.contribIP).value;
            React.findDOMNode(this.refs.contribIP).value="";
            if(value.length>1){
                ContributionActions.create(value);
            }
        }
  }
}