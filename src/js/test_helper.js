import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { CONST } from './constants/AppConstants';
import InnerBoardData from './logic/InnerBoardData';

function renderShallow(component) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(component);
  return shallowRenderer.getRenderOutput();
}


function fillInnerBoard(board) {
  let playerX = CONST.PLAYERS.X;
  let playerO = CONST.PLAYERS.O;

  board.updatePlayer(0, 0, playerX);
  board.updatePlayer(0, 1, playerO);
  board.updatePlayer(0, 2, playerX);
  board.updatePlayer(1, 0, playerO);
  board.updatePlayer(1, 1, playerX);
  board.updatePlayer(1, 2, playerX);
  board.updatePlayer(2, 0, playerO);
  board.updatePlayer(2, 1, playerX);
  board.updatePlayer(2, 2, playerO);

  return board;
}


function generateBoard() {
  let innerBoards = [];  // eslint-disable-line prefer-const

  for (let i = 0; i < 3; i++) {
    innerBoards[i] = [];

    for (let j = 0; j < 3; j++) {
      innerBoards[i][j] = new InnerBoardData(i, j);
    }
  }

  return innerBoards;
}

export {
  renderShallow,
  fillInnerBoard,
  generateBoard
};

