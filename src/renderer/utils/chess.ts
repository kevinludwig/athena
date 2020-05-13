import Chess from 'chess.js';

const chess = new Chess();
const promotion = 'q';
const verbose = true;

export const move = ({fen, from, to}) => {
    chess.load(fen);
    const m = chess.move({from, to, promotion});
    return m && {fen: chess.fen(), san: m.san, from, to};
};

export default {
    move
};
