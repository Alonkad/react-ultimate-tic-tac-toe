export default class TileData {
  constructor(row, col) {
    this.player = null;
    this.row = row;
    this.col = col;
  }

  setPlayer(player) {
    this.player = player;
  }
}
