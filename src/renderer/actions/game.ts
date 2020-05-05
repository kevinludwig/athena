import {fromJS} from 'immutable';
import actionCreator from '../utils/actionCreator';

export const loadGame = actionCreator('GAME_LOAD', (moves) => ({
    moves: fromJS(moves),
    currentMove: 0
}));

export const setCurrentMove = actionCreator('GAME_SET_MOVE', (currentMove => ({
    currentMove: fromJS(currentMove)
})));

export const makeMove = actionCreator('GAME_MAKE_MOVE');
export const undoMove = actionCreator('GAME_UNDO_MOVE');
export const moveToStart = actionCreator('GAME_MOVE_TO_START');
export const moveToEnd = actionCreator('GAME_MOVE_TO_END');
