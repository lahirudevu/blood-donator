
import AppDispatcher from '../dispatcher/AppDispatcher';
import ContributionConstants from '../constants/ContributionConstants';

var ContributionActions = {

  create: function(text) {
    AppDispatcher.dispatch({
      actionType: ContributionConstants.CONTRIB_CREATE,
      text: text
    });
  }

};

module.exports = ContributionActions;