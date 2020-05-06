import Chess from 'chess.js';

const chess = new Chess();
const promotion = 'q';
const verbose = true;

export const move = ({fen, from, to}) => {
    chess.load(fen);
    const m = chess.move({from, to, promotion});
    return m && {fen: chess.fen(), priorMove: m};
};

export const moves = ({fen, square}) => {
    chess.load(fen);
    return chess.moves({
        square,
        verbose
    });
};

export default {
    move,
    moves
};
