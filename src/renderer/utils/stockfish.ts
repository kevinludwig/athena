import StockfishWorker from 'worker-loader!stockfish';
let stockfish = null; 
let isReady = true;
let handler = null;
const commandQueue = [];

const drain = () => {
    while (isReady && commandQueue.length) {
        const {cmd, readyCheck} = commandQueue.shift();
        console.log('issuing command to Stockfish:', cmd);
        stockfish.postMessage(cmd);
        if (readyCheck) {
            isReady = false;
            stockfish.postMessage('isready');
        }
    }
};
const cmd = (cmd: string, readyCheck: boolean = false) => {
    commandQueue.push({cmd, readyCheck});
    drain();
}

export const registerHandler = (h) => {
    handler = h;
};

const init = () => {
    if (!stockfish) {
        stockfish = new StockfishWorker();
        stockfish.onmessage = (ev) => {
            const line = ev && typeof ev === 'object' ? ev.data : ev;
            console.log('line:', line);
            if (line.startsWith('uciok') || line.startsWith('option name')) return;
            if (line === 'readyok') {
                isReady = true;
                drain();
            } else if (handler) {
                handler(line);
            }
        }
       
        cmd('uci', true);
        cmd('setoption name MultiPV value 5');
    }

    cmd('ucinewgame', true);
};

export const shutdown = () => {
    if (stockfish) {
        cmd('quit');
    }
};

export const newGame = () => init();

export const newPosition = (fen) => {
    if (!stockfish) {
        init();
    }
    cmd('position fen ' + fen);
    cmd('go depth 20');

};

export default {
    shutdown,
    newGame,
    newPosition,
    registerHandler
}