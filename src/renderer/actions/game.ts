import {readFile} from 'fs';
import {fromJS} from 'immutable';
import pgnParser from 'pgn-parser';
import fenify from 'fenify';
import stockfish from '../utils/stockfish';
import actionCreator from '../utils/actionCreator';

stockfish.registerHandler((line) => {
    console.log('STOCKFISH: ' + line);
});

const setPgnFile = actionCreator('GAME_SET_PGN_FILE', (pgnFile) => ({
    pgnFile
}));
const setPgnData = actionCreator('GAME_SET_PGN_DATA', (pgnText, pgnData) => ({
    pgnText,
    pgnData: fromJS(pgnData)
}));

export const loadGame = (pgnFile) => (dispatch) => {
    dispatch(setPgnFile(pgnFile));
    readFile(pgnFile, 'utf-8', (err, text) => {
        if (!err) {
            stockfish.newGame();
            dispatch(setPgnData(text, pgnParser.parse(text).map(fenify)));
        }
    });
};

const _setMove = actionCreator('GAME_SET_MOVE', (move) => ({
    ...move
}));

export const setMove = (move) => (dispatch) => {
    stockfish.newPosition(move.fen);
    dispatch(_setMove(move));
};

export const skipToMove = actionCreator('GAME_SKIP_TO_MOVE', (moveIndex) => ({
    currentMove: moveIndex+1
}));

export const setLastEcoCode = actionCreator('GAME_SET_LAST_ECO_CODE', (lastEcoCode) => ({
    lastEcoCode
}));

export const makeMove = actionCreator('GAME_MAKE_MOVE');
export const undoMove = actionCreator('GAME_UNDO_MOVE');
export const moveToStart = actionCreator('GAME_MOVE_TO_START');
export const moveToEnd = actionCreator('GAME_MOVE_TO_END');
