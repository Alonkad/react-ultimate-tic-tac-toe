import React from 'react';
import Tile from './Tile';
import InnerBoardDataClass from '../logic/InnerBoardData';


class InnerBoard extends React.Component {
  constructor() {
    super();

    this.onTileClick = this.onTileClick.bind(this);
  }

  onTileClick(tileRow, tileCol) {
    if (!this.props.data.isNextBoard) {  // Filter non-allowed board
      return;
    }

    const data = {
      board: {
        row: this.props.data.row,
        col: this.props.data.col
      },
      tile: {
        row: tileRow,
        col: tileCol
      }
    };

    this.props.clickHandler(data);
  }

  _getTiles(tilesData) {
    let tiles = [];
    let index = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        tiles.push(
          <Tile
            key={index}
            data={tilesData[i][j]}
            clickHandler={this.onTileClick}
          />);
        index++;
      }
    }

    return tiles;
  }

  render() {
    const tilesData = this.props.data.tiles;
    const winningPlayer = this.props.data.winningPlayer;
    const classNames = [
      this.props.data.isNextBoard ? 'next-board' : '',
      winningPlayer ? `winning-player${winningPlayer}` : ''
    ];
    const tiles = this._getTiles(tilesData);

    return (
      <div className={`board-container inner-board ${classNames.join('')}`}>
        {tiles}
      </div>
    );
  }
}


InnerBoard.propTypes = {
  data: React.PropTypes.instanceOf(InnerBoardDataClass).isRequired,
  clickHandler: React.PropTypes.func.isRequired
};


export default InnerBoard;  // eslint-disable-line new-cap
