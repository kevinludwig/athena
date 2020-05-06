const ROOT = 'game';

export const selectPgnFile = (state) => state.getIn([ROOT, 'pgnFile']);
export const selectPgnData = (state) => state.getIn([ROOT, 'pgnData']);
export const selectFen = (state) => state.getIn([ROOT, 'fen']);
export const selectPriorMove = (state) => state.getIn([ROOT, 'priorMove']);
