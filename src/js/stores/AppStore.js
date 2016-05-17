import AppDispatcher from '../dispatcher/AppDispatcher';
import { AppConstants } from '../constants/AppConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

// Define the store as an empty array
let _store = {  // eslint-disable-line prefer-const
  list: []
};


// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve the store
class AppStoreClass extends EventEmitter {

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getList() {
    return _store.list;
  }

}


// Initialize the singleton to register with the
// dispatcher and export for React components
const AppStore = new AppStoreClass();


// Register each of the actions with the dispatcher
// by changing the store's data and emitting a change
AppDispatcher.register((payload) => {
  const { actionType, actionData } = payload.action;

  switch (actionType) {
    case AppConstants.TEST_ACTION:
      _store.list.push(actionData);
      AppStore.emit(CHANGE_EVENT);
      break;
    default:
      break;
  }

  return true;
});


export default AppStore;
