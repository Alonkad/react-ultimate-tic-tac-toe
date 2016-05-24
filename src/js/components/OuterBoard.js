import React from 'react';
import { tileClickedAction } from '../actions/AppActions';
import InnerBoard from './InnerBoard';


class OuterBoard extends React.Component {
  constructor() {
    super();

    this._bindMethods();
  }

  onTileClick(data) {
    tileClickedAction(data);
  }

  _bindMethods() {
    this.onTileClick = this.onTileClick.bind(this);
  }

  _getInnerBoards(innerBoardsData) {
    let innerBoards = [];
    let index = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        innerBoards.push(
          <InnerBoard
            key={index}
            data={innerBoardsData[i][j]}
            clickHandler={this.onTileClick}
          />
        );
        index++;
      }
    }

    return innerBoards;
  }

  render() {
    const innerBoardsData = this.props.data.outerBoard.innerBoards;
    let innerBoards = this._getInnerBoards(innerBoardsData);

    return (
      <div className="board-container outer-board">
        {innerBoards}
      </div>
    );
  }
}


OuterBoard.propTypes = {
  data: React.PropTypes.object.isRequired
};


export default OuterBoard;  // eslint-disable-line new-cap
