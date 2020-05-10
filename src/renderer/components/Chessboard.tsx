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
    const [pieceSquare, setPieceSquare] = useState('');

    const onDrop = ({ sourceSquare, targetSquare }) => {
        const move = chess.move({
            fen,
            from: sourceSquare,
            to: targetSquare
        });

        if (move) {
            setMove(move);
        }
    };

    const onDragOverSquare = () => {
        setDropSquareStyle({ boxShadow: 'inset 0 0 1px 4px rgb(255, 255, 0)' });
    };

    const onSquareClick = square => {
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

    const onCalcWidth = ({screenWidth, screenHeight}) => {
        const RESERVED = 116; /* roughly the size of the player button bar */
        return screenHeight >= (screenWidth + RESERVED) ?  screenWidth : screenHeight - RESERVED;
    };

    return (
        <Chessboard
            calcWidth={onCalcWidth}
            position={fen}
            onDrop={onDrop}
            boardStyle={{
              borderRadius: '5px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
            }}
            squareStyles={squareStyling({pieceSquare, priorMove})}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            transitionDuration={100}
            undo
        />
    );   
});
