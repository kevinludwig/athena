import {readFile} from 'fs';
import {fromJS} from 'immutable';
import makeParser from 'pgn-parser';
import actionCreator from '../utils/actionCreator';

let parser = null;
makeParser((err, p) => {
    parser = p;
});

const setPgnFile = actionCreator('GAME_SET_PGN_FILE', (pgnFile) => ({
    pgnFile
}));
const setPgnData = actionCreator('GAME_SET_PGN_DATA', (pgnText, pgnData) => ({
    pgnText,
    pgnData: fromJS(pgnData)
}));

export const loadGame = (pgnFile) => {
    return (dispatch) => {
        dispatch(setPgnFile(pgnFile));
        readFile(pgnFile, 'utf-8', (err, text) => {
            if (!err) {
                dispatch(setPgnData(text, parser.parse(text)));
            }
        });
    }
};

export const setMove = actionCreator('GAME_SET_MOVE', (move) => ({
    ...move
}));
export const makeMove = actionCreator('GAME_MAKE_MOVE');
export const undoMove = actionCreator('GAME_UNDO_MOVE');
export const moveToStart = actionCreator('GAME_MOVE_TO_START');
export const moveToEnd = actionCreator('GAME_MOVE_TO_END');
