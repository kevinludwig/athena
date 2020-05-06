import {readFile} from 'fs';
import {fromJS} from 'immutable';
import actionCreator from '../utils/actionCreator';

const setPgnFile = actionCreator('GAME_SET_PGN_FILE', (pgnFile) => ({
    pgnFile
}));
const setPgnData = actionCreator('GAME_SET_PGN_DATA', (pgnData) => ({
   pgnData
}));

export const loadGame = actionCreator('GAME_LOAD', (pgnFile) => {
    return (dispatch) => {
        dispatch(setPgnFile(pgnFile));
        readFile(pgnFile, 'utf-8', (err, data) => {
            if (!err) {
                dispatch(setPgnData(data));
            }
        });
    }
});

export const setFen = actionCreator('GAME_SET_FEN', (fen) => ({
    fen
}));
export const setHistory = actionCreator('GAME_SET_HISTORY', (history) => ({
    history: fromJS(history)
}));
export const makeMove = actionCreator('GAME_MAKE_MOVE');
export const undoMove = actionCreator('GAME_UNDO_MOVE');
export const moveToStart = actionCreator('GAME_MOVE_TO_START');
export const moveToEnd = actionCreator('GAME_MOVE_TO_END');
