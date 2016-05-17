import AppDispatcher from '../dispatcher/AppDispatcher';
import { AppConstants } from '../constants/AppConstants';


function testAction(actionData) {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.TEST_ACTION,
    actionData
  });
}

export default testAction;
