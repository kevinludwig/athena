import React, {useState} from 'react';
import Chessboard from 'chessboardjsx';
import chess from '../utils/chess';

const squareStyling = ({ pieceSquare, priorMove }) => {
    const sourceSquare = priorMove && priorMove.from;
    const targetSquare = priorMove && priorMove.to;
    const backgroundColor = 'rgba(255, 255, 0, 0.4)';
    return {
        [pieceSquare]: { backgroundColor },
        ...(sourceSquare && {
            [sourceSquare]: { backgroundColor }
        }),
        ...(targetSquare && {
            [targetSquare]: { backgroundColor }
        })
    };
};

interface Props {
    fen: string;
    setMove: (any) => void;
    priorMove: any;
}
export default React.memo((props: Props) => {
    const {
        fen,
        setMove,
        priorMove
    } = props;
    const [dropSquareStyle, setDropSquareStyle] = useState({});
    const [squareStyles, setSquareStyles] = useState({});
    const [pieceSquare, setPieceSquare] = useState('');

    const removeHighlightSquare = (square) => setSquareStyles(squareStyling({pieceSquare: square, priorMove}));

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
                        priorMove,
                        pieceSquare
                    })
                };
            }, {});

        setSquareStyles({...squareStyles, ...highlightStyles});
    };

    const onDrop = ({ sourceSquare, targetSquare }) => {
        const move = chess.move({
            fen,
            from: sourceSquare,
            to: targetSquare
        });

        if (move) {
            setMove(move);
            setSquareStyles(squareStyling({pieceSquare, priorMove}));
        }
    };

    const onMouseOverSquare = square => {
        const moves = chess.moves({fen, square});
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
        setSquareStyles(squareStyling({ pieceSquare: square, priorMove }));
        setPieceSquare(square);

        const move = chess.move({
            fen,
            from: pieceSquare,
            to: square
        });

        if (move) {
            setMove(move);
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
            transitionDuration={100}
            undo
        />
    );   
});
