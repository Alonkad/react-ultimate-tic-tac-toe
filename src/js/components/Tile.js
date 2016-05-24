import React from 'react';
import TileDataClass from '../logic/TileData';


class Tile extends React.Component {
  constructor() {
    super();

    this._bindMethods();
  }

  onTileClick() {
    if (this.props.data.player) {
      return;
    }

    this.props.clickHandler(this.props.data.row, this.props.data.col);
  }

  _bindMethods() {
    this.onTileClick = this.onTileClick.bind(this);
  }

  render() {
    const playerClass = this.props.data.player ? `player${this.props.data.player}` : '';

    return (
      <span className={`tile-container ${playerClass}`} onClick={this.onTileClick}>
      </span>
    );
  }
}


Tile.propTypes = {
  data: React.PropTypes.instanceOf(TileDataClass).isRequired,
  clickHandler: React.PropTypes.func.isRequired
};


export default Tile;
