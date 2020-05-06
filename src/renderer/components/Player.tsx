import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Container from '@material-ui/core/Container';

import Chessboard from './Chessboard';
import PlayButtonGroup from './PlayButtonGroup';
import {selectFen, selectPriorMove} from '../selectors/game';
import {undoMove, makeMove, moveToStart, moveToEnd, setMove} from '../actions/game';

export default () => {
    const dispatch = useDispatch();
    const fen = useSelector(selectFen);
    const priorMove = useSelector(selectPriorMove);
    const handleSetMove = useCallback((move) => dispatch(setMove(move)), [setMove])
    const handleStepBackward = useCallback(() => dispatch(undoMove()), [undoMove]);
    const handleStepForward = useCallback(() => dispatch(makeMove()), [makeMove]);
    const handleSkipBackward = useCallback(() => dispatch(moveToStart()), [moveToStart]);
    const handleSkipForward = useCallback(() => dispatch(moveToEnd()), [moveToEnd]);

    return (
        <Container disableGutters>
            <Chessboard
                fen={fen}
                priorMove={priorMove}
                setMove={handleSetMove} />
            <PlayButtonGroup 
                onSkipBackward={handleSkipBackward}
                onSkipForward={handleSkipForward}
                onStepBackward={handleStepBackward}
                onStepForward={handleStepForward} />
        </Container>
    );
};
