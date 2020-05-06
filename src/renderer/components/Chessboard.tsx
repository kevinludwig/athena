import React, {useState, useRef} from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';

const squareStyling = ({ pieceSquare, history }) => {
    const move = history.size && history.last();
    const sourceSquare = move && move.from;
    const targetSquare = move && move.to;

    return {
        [pieceSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
        ...(sourceSquare && {
            [sourceSquare]: {
                backgroundColor: 'rgba(255, 255, 0, 0.4)'
            }
        }),
        ...(targetSquare && {
            [targetSquare]: {
                backgroundColor: 'rgba(255, 255, 0, 0.4)'
            }
        })
    };
};

interface Props {
    fen: string;
    setFen: (string) => void;
    history: string[];
    setHistory: ([string]) => void;
}
export default (props: Props) => {
    const {
        fen,
        setFen,
        history,
        setHistory
    } = props;
    const [dropSquareStyle, setDropSquareStyle] = useState({});
    const [squareStyles, setSquareStyles] = useState({});
    const [pieceSquare, setPieceSquare] = useState('');

    const gameRef = useRef(new Chess());
    
    const removeHighlightSquare = (square) => setSquareStyles(squareStyling({pieceSquare: square, history}));

    const highlightSquare = (sourceSquare, squaresToHighlight) => {
        const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
            (a, c) => {
                return {
                    ...a,
                    ...{
                        [c]: {
                            background: 'radial-gradient(circle, #fffc00 36%, transparent 40%)',
                            borderRadius: '50%'
                        }
                    },
                    ...squareStyling({
                        history,
                        pieceSquare
                    })
                };
            }, {});

        setSquareStyles({...squareStyles, ...highlightStyles});
    };

    const onDrop = ({ sourceSquare, targetSquare }) => {
        const move = gameRef.current.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q'
        });

        if (move) {
            setFen(gameRef.current.fen());
            setHistory(gameRef.current.history({verbose: true}));
            setSquareStyles(squareStyling({pieceSquare, history}));
        }
    };

    const onMouseOverSquare = square => {
        const moves = gameRef.current.moves({
            square,
            verbose: true
        });

        if (moves.length) {
            highlightSquare(square, moves.map(m => m.to));
        }
    };

    const onMouseOutSquare = square => removeHighlightSquare(square);

    const onDragOverSquare = square => {
        const isCentralSquare = ['e4', 'd4', 'e5', 'd5'].includes(square);
        setDropSquareStyle(isCentralSquare ?
            { backgroundColor: 'cornFlowerBlue' } :
            { boxShadow: 'inset 0 0 1px 4px rgb(255, 255, 0)' });
    };

    const onSquareClick = square => {
        setSquareStyles(squareStyling({ pieceSquare: square, history }));
        setPieceSquare(square);

        const move = gameRef.current.move({
            from: pieceSquare,
            to: square,
            promotion: 'q'
        });

        if (move) {
            setFen(gameRef.current.fen());
            setHistory(gameRef.current.history({verbose: true}));
            setPieceSquare('');
        }
    };

    const onSquareRightClick = square => setSquareStyles({ [square]: { backgroundColor: 'deepPink' }});

    const onCalcWidth = ({screenWidth, screenHeight}) => {
        const RESERVED = 100; /* roughly the size of the player button bar */
        return screenHeight >= (screenWidth + RESERVED) ?  screenWidth : screenHeight - RESERVED;
    };
    return (
        <Chessboard
            calcWidth={onCalcWidth}
            position={fen}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            boardStyle={{
              borderRadius: '5px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
            }}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
        />
    );   
};
