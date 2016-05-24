import TileData from './TileData';


function _generateTiles() {
  let tiles = [];  // eslint-disable-line prefer-const

  for (let i = 0; i < 3; i++) {
    tiles[i] = [];

    for (let j = 0; j < 3; j++) {
      tiles[i][j] = new TileData(i, j);
    }
  }

  return tiles;
}


export default class InnerBoardData {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.tiles = _generateTiles();
    this.isNextBoard = true;
    this.winningPlayer = null;
  }

  updatePlayer(tileRow, tileCol, player) {
    let tile = this.tiles[tileRow][tileCol];

    tile.setPlayer(player);

    this.winningPlayer = this.getWinningPlayer();
  }

  updateNextBoard(tileRow, tileCol, relaxed) {
    const relaxedCondition = relaxed ? true : (this.row === tileRow && this.col === tileCol);

    this.isNextBoard = (
      !this.winningPlayer &&
      !this._isFull() &&
      relaxedCondition
    );

    return this.isNextBoard;
  }

  getWinningPlayer() {
    let isWinning = false;
    let winningPlayer = null;

    // Check rows (stop if already found)
    for (let i = 0; i < 3 && !isWinning; i++) {
      isWinning = (
        this.tiles[i][0].player &&
        this.tiles[i][0].player === this.tiles[i][1].player &&
        this.tiles[i][0].player === this.tiles[i][2].player
      );

      winningPlayer = isWinning ? this.tiles[i][0].player : null;
    }

    // Check columns (skip if already found)
    for (let j = 0; j < 3 && !isWinning; j++) {
      isWinning = (
        this.tiles[0][j].player &&
        this.tiles[0][j].player === this.tiles[1][j].player &&
        this.tiles[0][j].player === this.tiles[2][j].player
      );

      winningPlayer = isWinning ? this.tiles[0][j].player : null;
    }

    // Check main diagonal (skip if already found)
    if (!isWinning) {
      isWinning = (
        this.tiles[0][0].player &&
        this.tiles[0][0].player === this.tiles[1][1].player &&
        this.tiles[0][0].player === this.tiles[2][2].player
      );

      winningPlayer = isWinning ? this.tiles[0][0].player : null;
    }

    // Check second diagonal (skip if already found)
    if (!isWinning) {
      isWinning = (
        this.tiles[0][2].player &&
        this.tiles[0][2].player === this.tiles[1][1].player &&
        this.tiles[0][2].player === this.tiles[2][0].player
      );

      winningPlayer = isWinning ? this.tiles[0][2].player : null;
    }

    return winningPlayer;
  }

  static updateNextBoardForAll(innerBoards, tileRow, tileCol) {
    let nextBoardExist = false;

    // Update all boards and keep flag if at one board is the next
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        nextBoardExist = innerBoards[i][j].updateNextBoard(tileRow, tileCol) || nextBoardExist;
      }
    }

    // If no board can be next - all boards are next (except for full & won boards)
    if (!nextBoardExist) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          innerBoards[i][j].updateNextBoard(tileRow, tileCol, true);
        }
      }
    }
  }

  _isFull() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!this.tiles[i][j].player) {
          return false;
        }
      }
    }

    return true;
  }
}
