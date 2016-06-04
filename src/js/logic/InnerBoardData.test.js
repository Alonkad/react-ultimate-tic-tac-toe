import test from 'ava';
import InnerBoardData from './InnerBoardData';
import { CONST } from '../constants/AppConstants';
import { fillInnerBoard, generateBoard } from '../test_helper';

let subject;


test.beforeEach(() => {
  subject = new InnerBoardData(0, 0);
});


/******************
 *  updatePlayer  *
 *****************/

test('Update player - tile is updated', t => {
  let row = 0;
  let col = 0;
  let player = CONST.PLAYERS.X;

  subject.updatePlayer(row, col, player);

  t.is(subject.tiles[row][col].player, player);
});

test('Update player - no winningPlayer', t => {
  let row = 0;
  let col = 0;
  let player = CONST.PLAYERS.X;

  subject.updatePlayer(row, col, player);

  t.is(subject.winningPlayer, null);
});

test('Update player - winningPlayer should be set', t => {
  let player = CONST.PLAYERS.X;

  subject.updatePlayer(0, 0, player);
  subject.updatePlayer(0, 1, player);
  subject.updatePlayer(0, 2, player);

  t.is(subject.winningPlayer, player);
});


/**********************
 *  getWinningPlayer  *
 **********************/

test('Get Winning Player - return null if no winning player', t => {
  const result = subject.getWinningPlayer();
  t.is(result, null);
});

test('Get Winning Player - completed row', t => {
  let player = CONST.PLAYERS.X;

  subject.updatePlayer(0, 0, player);
  subject.updatePlayer(0, 1, player);
  subject.updatePlayer(0, 2, player);
  const result = subject.getWinningPlayer();

  t.is(result, player);
});

test('Get Winning Player - completed column', t => {
  let player = CONST.PLAYERS.X;

  subject.updatePlayer(0, 0, player);
  subject.updatePlayer(1, 0, player);
  subject.updatePlayer(2, 0, player);
  const result = subject.getWinningPlayer();

  t.is(result, player);
});

test('Get Winning Player - completed main diagonal', t => {
  let player = CONST.PLAYERS.X;

  subject.updatePlayer(0, 0, player);
  subject.updatePlayer(1, 1, player);
  subject.updatePlayer(2, 2, player);
  const result = subject.getWinningPlayer();

  t.is(result, player);
});

test('Get Winning Player - completed secondary diagonal', t => {
  let player = CONST.PLAYERS.X;

  subject.updatePlayer(0, 2, player);
  subject.updatePlayer(1, 1, player);
  subject.updatePlayer(2, 0, player);
  const result = subject.getWinningPlayer();

  t.is(result, player);
});

test('Get Winning Player - completed secondary diagonal', t => {
  let player = CONST.PLAYERS.X;

  subject.updatePlayer(0, 2, player);
  subject.updatePlayer(1, 1, player);
  subject.updatePlayer(2, 0, player);
  const result = subject.getWinningPlayer();

  t.is(result, player);
});

test('Get Winning Player - full board with no winner', t => {
  subject = fillInnerBoard(subject);
  const result = subject.getWinningPlayer();

  t.is(result, null);
});


/*********************
 *  updateNextBoard  *
 *********************/

test('Update Next Board - true if opponent selected next board', t => {
  const result = subject.updateNextBoard(0, 0);

  t.is(result, true);
});

test('Update Next Board - false if opponent didn\'t select next board', t => {
  const result = subject.updateNextBoard(1, 0);

  t.is(result, false);
});

test('Update Next Board - won board can\'t be next', t => {
  let player = CONST.PLAYERS.X;

  subject.updatePlayer(0, 0, player);
  subject.updatePlayer(0, 1, player);
  subject.updatePlayer(0, 2, player);

  const result = subject.updateNextBoard(0, 0);

  t.is(result, false);
});

test('Update Next Board - won board can\'t be next (selected next board is NA)', t => {
  let player = CONST.PLAYERS.X;
  const nextBoardNA = true;

  subject.updatePlayer(0, 0, player);
  subject.updatePlayer(0, 1, player);
  subject.updatePlayer(0, 2, player);

  const result = subject.updateNextBoard(0, 0, nextBoardNA);

  t.is(result, false);
});

test('Update Next Board - full board can\'t be next', t => {
  subject = fillInnerBoard(subject);

  const result = subject.updateNextBoard(0, 0);

  t.is(result, false);
});

test('Update Next Board - full board can\'t be next (selected next board is NA)', t => {
  subject = fillInnerBoard(subject);
  const nextBoardNA = true;

  const result = subject.updateNextBoard(0, 0, nextBoardNA);

  t.is(result, false);
});

test('Update Next Board - selected next board is NA allows board to be next', t => {
  const result = subject.updateNextBoard(1, 0, true);

  t.is(result, true);
});


/***************************
 *  updateNextBoardForAll  *
 **************************/

test('Update Next Board For All - selected next board is available', t => {
  let innerBoards = generateBoard();

  InnerBoardData.updateNextBoardForAll(innerBoards, 0, 0);

  const result = innerBoards[0][0].isNextBoard;

  t.is(result, true);
});

test('Update Next Board For All - selected next board is NA', t => {
  let innerBoards = generateBoard();
  innerBoards[0][0] = fillInnerBoard(innerBoards[0][0]);

  InnerBoardData.updateNextBoardForAll(innerBoards, 0, 0);

  t.is(innerBoards[0][0].isNextBoard, false);
  t.is(innerBoards[0][1].isNextBoard, true);
  t.is(innerBoards[0][2].isNextBoard, true);
  t.is(innerBoards[1][0].isNextBoard, true);
  t.is(innerBoards[1][1].isNextBoard, true);
  t.is(innerBoards[1][2].isNextBoard, true);
  t.is(innerBoards[2][0].isNextBoard, true);
  t.is(innerBoards[2][1].isNextBoard, true);
  t.is(innerBoards[2][2].isNextBoard, true);
});
