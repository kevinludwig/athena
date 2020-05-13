import {Map} from 'immutable';
import {createSelector} from 'reselect';

const ROOT = 'game';
const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const selectCurrentGame = (state) => state.getIn([ROOT, 'currentGame']);
const selectCurrentMove = (state) => state.getIn([ROOT, 'currentMove']);
export const selectPgnFile = (state) => state.getIn([ROOT, 'pgnFile']);
export const selectPgnData = (state) => state.getIn([ROOT, 'pgnData']);

export const selectLastEcoCode = (state) => state.getIn([ROOT, 'lastEcoCode']);

export const selectLastMove = createSelector(
    selectCurrentMove,
    (currentMove) => currentMove - 1);
    
export const selectFen = createSelector(
    selectPgnData,
    selectCurrentGame,
    selectCurrentMove,
    (pgnData, currentGame, currentMove) => {
        if (!pgnData) return START_FEN;
        if (currentMove > 0) {
            return pgnData.getIn([currentGame, 'moves', currentMove-1, 'fen']);
        } else {
           return pgnData.getIn(['headers', 'FEN'], START_FEN); 
        }
    });
    
export const selectPriorMove = createSelector(
    selectPgnData,
    selectCurrentGame,
    selectCurrentMove,
    (pgnData, currentGame, currentMove) => {
        if (!pgnData || currentMove === 0) return null;
        const from = pgnData.getIn([currentGame, 'moves', currentMove-1, 'from']);
        const to = pgnData.getIn([currentGame, 'moves', currentMove-1, 'to']);
        return {from, to};
    });

export const selectGame = createSelector(
    selectPgnData,
    selectCurrentGame,
    (pgnData, currentGame) => {
        console.log('selectGame', pgnData.toJS());
        return pgnData.get(currentGame, Map());
    });
