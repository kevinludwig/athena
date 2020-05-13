import { fromJS, List, Map } from 'immutable';

const initialState = fromJS({
    /* filename loaded */
    pgnFile: null,

    /* raw pgn text */
    pgnText: null,

    /* parsed pgn data */
    pgnData: [
        {
            moves: [],
            comment: [],
            headers: {}
        }
    ],

    /* playback position into pgnData */
    currentMove: 0,

    /* currently selected game index */
    currentGame: 0
});

const setMove = (state, {san, fen, from, to}) => {
    const currentGame = state.get('currentGame');
    const currentMove = state.get('currentMove');

    return state
        .set('currentMove', currentMove + 1)
        .updateIn(['pgnData', currentGame, 'moves'], List(), 
            (list) => list.setSize(currentMove).push(Map({
                move: san,
                fen,
                from,
                to
            })));
};

const makeMove = (state) => {
    const currentMove = state.get('currentMove');
    const currentGame = state.get('currentGame');
    if (state.hasIn(['pgnData', currentGame, 'moves', currentMove, 'move'])) {
        return state.merge({
            currentMove: currentMove + 1
        });
    } else return state;
};

const undoMove = (state) => {
    const currentMove = state.get('currentMove');
    if (currentMove > 0) {
        return state.merge({
            currentMove: currentMove - 1
        });
    } 
    return state;
};

const moveToEnd = (state) => {
    const currentGame = state.get('currentGame');
    const moves = state.getIn(['pgnData', currentGame, 'moves']);
    const currentMove = moves.size;
    if (currentMove > 0) {
        return state.merge({
            currentMove
        });
    } 
    return state;
};


export default (state = initialState, action) => {
    switch (action.type) {
        case 'GAME_SET_PGN_FILE':
        case 'GAME_SKIP_TO_MOVE':
            return state.merge(action.payload);
        case 'GAME_SET_PGN_DATA':
            return state.merge({
                ...action.payload, 
                currentMove: 0
                });
        case 'GAME_SET_MOVE':
            return setMove(state, action.payload);
        case 'GAME_MAKE_MOVE':
            return makeMove(state);
        case 'GAME_UNDO_MOVE':
            return undoMove(state); 
        case 'GAME_MOVE_TO_START':
            return state.merge({
                currentMove: 0
            });
        case 'GAME_MOVE_TO_END':
            return moveToEnd(state); 
        default:
            return state;
    }
};
