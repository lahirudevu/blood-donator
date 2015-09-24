import AppDispatcher from '../dispatcher/AppDispatcher';
import ContributionConstants from '../constants/ContributionConstants';

var ContributionActions = {

  create: function(text) {
    AppDispatcher.dispatch({
      actionType: ContributionConstants.USER_CREATE
    });
  }

};

module.exports = ContributionActions;