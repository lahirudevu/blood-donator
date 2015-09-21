import AppDispatcher from '../dispatcher/AppDispatcher';
import ContributionConstants from '../constants/ContributionConstants';

class ContribActions {
  create(text) {
    AppDispatcher.dispatch({
      actionType: ContributionConstants.CONTRIB_CREATE,
      text: text
    });
  }
};

let ContributionActions = new ContribActions();

export default ContributionActions;