import StockfishWorker from 'worker-loader!stockfish';
let stockfish = null; 
let isReady = false;
let handler = null;
const cmd = (cmd: string) => stockfish.postMessage(cmd);

export const registerHandler = (h) => {
    handler = h;
};

const init = () => {
    if (!stockfish) {
        stockfish = new StockfishWorker();
        stockfish.onmessage = (ev) => {
            const line = ev && typeof ev === 'object' ? ev.data : ev;
            if (line.startsWith('uciok') || line.startsWith('option name')) return;
            if (line === 'readyok') isReady = true;
            else if (handler) {
                handler(line);
            }
        };
        console.log('stockfish loaded');
        cmd('uci');
        cmd('isready');
        console.log('issued uci isready');
    }
};

export const shutdown = () => {
    if (stockfish) {
        cmd('quit');
    }
};

export const newGame = () => {
    init();
    cmd('ucinewgame');
};

export const newPosition = (fen) => {
    if (!stockfish) {
        init();
        newGame();
    }
    if (isReady) {
        cmd('position ' + fen);
        cmd('go depth 20');
    }
};

export default {
    shutdown,
    newGame,
    newPosition,
    registerHandler
}