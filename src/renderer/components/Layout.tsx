import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

import Chessboard from './Chessboard';
import Movetext from './Movetext';
import PlayButtonGroup from './PlayButtonGroup';
import EngineAnalysis from './EngineAnalysis';
import {selectFen, selectPriorMove} from '../selectors/game';
import {undoMove, makeMove, moveToStart, moveToEnd, setMove} from '../actions/game';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        display: 'grid',
        gridTemplateColumns: '500px 1fr',
        gridTemplateRows: '500px auto 80px',
        gridGap: theme.spacing(1)
    },
    movetext: {
        gridRow: 'span 2',
        marginRight: theme.spacing(2)
    },
    analysis: {
        gridColumn: 'span 2',
        marginRight: theme.spacing(2)
    }
}));

export default () => {
    const classes = useStyles({});
    const dispatch = useDispatch();
    const fen = useSelector(selectFen);
    const priorMove = useSelector(selectPriorMove);
    const handleSetMove = useCallback((move) => dispatch(setMove(move)), [setMove])
    const handleStepBackward = useCallback(() => dispatch(undoMove()), [undoMove]);
    const handleStepForward = useCallback(() => dispatch(makeMove()), [makeMove]);
    const handleSkipBackward = useCallback(() => dispatch(moveToStart()), [moveToStart]);
    const handleSkipForward = useCallback(() => dispatch(moveToEnd()), [moveToEnd]);

    return (
        <Container className={classes.root} disableGutters>
            <Chessboard
                height={500}
                fen={fen}
                priorMove={priorMove}
                setMove={handleSetMove} />
            <Movetext className={classes.movetext} />
            <PlayButtonGroup
                onSkipBackward={handleSkipBackward}
                onSkipForward={handleSkipForward}
                onStepBackward={handleStepBackward}
                onStepForward={handleStepForward} />
            <EngineAnalysis className={classes.analysis} />
       </Container>
    );
};