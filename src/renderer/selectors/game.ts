const ROOT = 'game';

export const selectPgnFile = (state) => state.getIn([ROOT, 'pgnFile']);
export const selectPgnData = (state) => state.getIn([ROOT, 'pgnData']);
export const selectFen = (state) => state.getIn([ROOT, 'fen']);
export const selectHistory = (state) => state.getIn([ROOT, 'history']);