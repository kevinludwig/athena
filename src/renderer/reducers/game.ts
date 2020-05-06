import { fromJS } from 'immutable';
import chess from '../utils/chess';

const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const initialState = fromJS({
    /* filename loaded */
    pgnFile: null,

    /* raw pgn text */
    pgnText: null,

    /* parsed pgn data */
    pgnData: null,

    /* playback position into pgnData */
    currentMove: 0,

    /* FEN of current position: used by chessboardjsx to render */
    fen: START_FEN,

    /* prior move: used by chessboard for move highlighting */
    priorMove: null 
});

/* may be several games in parsed PGN, limiting to one first for now */
const CURRENT_GAME = 0;

const makeMove = (state) => {
    const currentMove = state.get('currentMove');
    const san = state.getIn(['pgnData', CURRENT_GAME, 'moves', currentMove, 'move']);
    const fen = state.get('fen');
    const move = chess.moveSAN({fen, san});
    return move ? state.merge({
        ...move,
        currentMove: currentMove + 1
    }) : state;
};

const undoMove = (state) => {
    const currentMove = state.get('currentMove');
    if (currentMove > 0) {
        const moves = state.getIn(['pgnData', CURRENT_GAME, 'moves']);
        const move = chess.moveTo(moves.take(currentMove - 1).values());
        if (move) {
            return state.merge({
                ...move,
                currentMove: currentMove - 1
            });
        }
    } 
    return state;
};

const moveToEnd = (state) => {
    const moves = state.getIn(['pgnData', CURRENT_GAME, 'moves']);
    const currentMove = moves.size;
    if (currentMove > 0) {
        const move = chess.moveTo(moves.values());
        if (move) {
            return state.merge({
                ...move,
                currentMove
            });
        }
    } 
    return state;
};


export default (state = initialState, action) => {
    switch (action.type) {
        case 'GAME_SET_PGN_FILE':
        case 'GAME_SET_MOVE':
            return state.merge(action.payload);
        case 'GAME_SET_PGN_DATA':
            return state.merge({
                ...action.payload, 
                fen: START_FEN,
                priorMove: null,
                currentMove: 0
            });
        case 'GAME_MAKE_MOVE':
            return makeMove(state);
        case 'GAME_UNDO_MOVE':
            return undoMove(state); 
        case 'GAME_MOVE_TO_START':
            return state.merge({
                fen: START_FEN,
                priorMove: null,
                currentMove: 0
            });
        case 'GAME_MOVE_TO_END':
            return moveToEnd(state); 
        default:
            return state;
    }
};
