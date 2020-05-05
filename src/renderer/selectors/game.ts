const ROOT = 'game';

export const selectMoves = (state) => state.getIn([ROOT, 'moves']);
export const selectCurrentMove = (state) => state.getIn([ROOT, 'currentMove']);