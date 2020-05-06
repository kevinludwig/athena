import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Container from '@material-ui/core/Container';

import Chessboard from './Chessboard';
import PlayButtonGroup from './PlayButtonGroup';
import {selectFen, selectHistory} from '../selectors/game';
import {undoMove, makeMove, moveToStart, moveToEnd, setFen, setHistory} from '../actions/game';

export default () => {
    const dispatch = useDispatch();
    const fen = useSelector(selectFen);
    const history = useSelector(selectHistory);
    const handleSetFen = useCallback((fen) => dispatch(setFen(fen)), []);
    const handleSetHistory = useCallback((history) => dispatch(setHistory(history)), [])
    const handleStepBackward = useCallback(() => dispatch(undoMove()), []);
    const handleStepForward = useCallback(() => dispatch(makeMove()), []);
    const handleSkipBackward = useCallback(() => dispatch(moveToStart()), []);
    const handleSkipForward = useCallback(() => dispatch(moveToEnd()), []);

    return (
        <Container disableGutters>
            <Chessboard
                fen={fen}
                setFen={handleSetFen}
                history={history}
                setHistory={handleSetHistory} />
            <PlayButtonGroup 
                onSkipBackward={handleSkipBackward}
                onSkipForward={handleSkipForward}
                onStepBackward={handleStepBackward}
                onStepForward={handleStepForward} />
        </Container>
    );
};
