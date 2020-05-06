import { fromJS } from 'immutable';

const initialState = fromJS({
    pgnFile: null,
    pgnData: null,
    fen: 'start',
    history: []
});

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GAME_SET_PGN_FILE':
        case 'GAME_SET_PGN_DATA':
        case 'GAME_SET_FEN':
        case 'GAME_SET_HISTORY':
            return state.merge(action.payload);
        case 'GAME_MAKE_MOVE':
        case 'GAME_UNDO_MOVE':
        case 'GAME_MOVE_TO_START':
        case 'GAME_MOVE_TO_END':
        default:
            return state;
    }
};