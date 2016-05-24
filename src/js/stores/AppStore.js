import AppDispatcher from '../dispatcher/AppDispatcher';
import { CONST } from '../constants/AppConstants';
import { EventEmitter } from 'events';
import InnerBoardData from '../logic/InnerBoardData';

// Helper function
function _generateBoard() {
  let innerBoards = [];  // eslint-disable-line prefer-const

  for (let i = 0; i < 3; i++) {
    innerBoards[i] = [];

    for (let j = 0; j < 3; j++) {
      innerBoards[i][j] = new InnerBoardData(i, j);
    }
  }

  return innerBoards;
}

// Variables
const CHANGE_EVENT = 'change';
const { X, O } = CONST.PLAYERS;
const _initialData = {
  gameType: CONST.GAME_TYPES.LOCAL_PLAYERS,
  currentPlayer: CONST.PLAYERS.X,
  winningPlayer: null,
  outerBoard: {
    innerBoards: _generateBoard()
  }
};
let _store = {};  // eslint-disable-line prefer-const


// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve the store
class AppStoreClass extends EventEmitter {

  constructor() {
    super();

    // TODO: Use game type
    _store = _initialData;
  }

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  handleTileClick(actionData) {
    this._updateInnerBoards(actionData, _store.currentPlayer);

    // Check if game over
    _store.winningPlayer = this._getWinningPlayer();

    // toggle current player
    _store.currentPlayer = _store.currentPlayer === X ? O : X;

    this.emit(CHANGE_EVENT);
  }

  getData() {
    return _store;
  }

  _updateInnerBoards(actionData, player) {
    let innerBoard = _store.outerBoard.innerBoards[actionData.board.row][actionData.board.col];

    // Update the clicked inner board
    innerBoard.updatePlayer(actionData.tile.row, actionData.tile.col, player);

    // Update all inner boards
    InnerBoardData.updateNextBoardForAll(_store.outerBoard.innerBoards,
      actionData.tile.row,
      actionData.tile.col
    );
  }

  _getWinningPlayer() {
    let isWinning = false;
    let winningPlayer = null;
    const innerBoards = _store.outerBoard.innerBoards;

    // Check rows (stop if already found)
    for (let i = 0; i < 3 && !isWinning; i++) {
      isWinning = (
        innerBoards[i][0].winningPlayer &&
        innerBoards[i][0].winningPlayer === innerBoards[i][1].winningPlayer &&
        innerBoards[i][0].winningPlayer === innerBoards[i][2].winningPlayer
      );

      winningPlayer = isWinning ? innerBoards[i][0].winningPlayer : null;
    }

    // Check columns (skip if already found)
    for (let j = 0; j < 3 && !isWinning; j++) {
      isWinning = (
        innerBoards[0][j].winningPlayer &&
        innerBoards[0][j].winningPlayer === innerBoards[1][j].winningPlayer &&
        innerBoards[0][j].winningPlayer === innerBoards[2][j].winningPlayer
      );

      winningPlayer = isWinning ? innerBoards[0][j].winningPlayer : null;
    }

    // Check main diagonal (skip if already found)
    if (!isWinning) {
      isWinning = (
        innerBoards[0][0].winningPlayer &&
        innerBoards[0][0].winningPlayer === innerBoards[1][1].winningPlayer &&
        innerBoards[0][0].winningPlayer === innerBoards[2][2].winningPlayer
      );

      winningPlayer = isWinning ? innerBoards[0][0].winningPlayer : null;
    }

    // Check second diagonal (skip if already found)
    if (!isWinning) {
      isWinning = (
        innerBoards[0][2].winningPlayer &&
        innerBoards[0][2].winningPlayer === innerBoards[1][1].winningPlayer &&
        innerBoards[0][2].winningPlayer === innerBoards[2][0].winningPlayer
      );

      winningPlayer = isWinning ? innerBoards[0][2].winningPlayer : null;
    }

    return winningPlayer;
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
    case CONST.ACTIONS.TILE_CLICKED:
      AppStore.handleTileClick(actionData);
      break;
    default:
      break;
  }

  return true;
});


export default AppStore;
