import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

import Chessboard from './Chessboard';
import Movetext from './Movetext';
import PlayButtonGroup from './PlayButtonGroup';
import {selectFen, selectPriorMove} from '../selectors/game';
import {undoMove, makeMove, moveToStart, moveToEnd, setMove} from '../actions/game';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row'
    },
    chessboard: {
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column'
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
            <div className={classes.chessboard}>
                <Chessboard
                    fen={fen}
                    priorMove={priorMove}
                    setMove={handleSetMove} />
                <PlayButtonGroup 
                    onSkipBackward={handleSkipBackward}
                    onSkipForward={handleSkipForward}
                    onStepBackward={handleStepBackward}
                    onStepForward={handleStepForward} />
            </div>
            <Movetext />
       </Container>
    );
};
