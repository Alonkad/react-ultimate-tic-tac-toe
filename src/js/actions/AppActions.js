import AppDispatcher from '../dispatcher/AppDispatcher';
import { CONST } from '../constants/AppConstants';


export function tileClickedAction(actionData) {
  AppDispatcher.handleViewAction({
    actionType: CONST.ACTIONS.TILE_CLICKED,
    actionData
  });
}
