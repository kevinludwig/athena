import Chess from 'chess.js';

const chess = new Chess();
const promotion = 'q';
const verbose = true;

export const move = ({fen, from, to}) => {
    chess.load(fen);
    const m = chess.move({from, to, promotion});
    return m && {fen: chess.fen(), san: m.san, from, to};
};

export const moveSAN = ({fen, san}) => {
    chess.load(fen);
    const m = chess.move(san);
    return m && {fen: chess.fen(), priorMove: m};
};

export const moves = ({fen, square}) => {
    chess.load(fen);
    return chess.moves({
        square,
        verbose
    });
};

export const moveTo = (moves) => {
    const ch = new Chess();
    let move = null;
    for (let m of moves) {
        move = ch.move(m.get('move'));
        if (!move) return null;    
    }
    return {fen: ch.fen(), priorMove: move};
};

export default {
    move,
    moveSAN,
    moves,
    moveTo
};
