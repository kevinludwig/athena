import React from 'react';
import clsx from 'clsx';
import {useSelector, useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {makeStyles, withStyles} from '@material-ui/core/styles';

import {selectGame, selectLastMove} from '../selectors/game';
import {skipToMove} from '../actions/game';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    button: {
        marginRight: theme.spacing(1),
        fontSize: '1rem',
        verticalAlign: 'baseline',
        minWidth: 0,
        textTransform: 'none',
        padding: 0
    },
    lastMove: {
        fontWeight: 'bold'
    }
}));

interface Props {
    className?: string;
}

export default (props) => {
    const classes = useStyles({});
    const dispatch = useDispatch();
    const game = useSelector(selectGame);
    const lastMove = useSelector(selectLastMove);
    const handleSkipToMove = (m) => () => dispatch(skipToMove(m));

    return (
        <Paper className={clsx(props.className, classes.root)}>
            <Typography>
                {game.get('moves').map((m, index) => (
                    <span key={index}>
                        {m.has('move_number') ? m.get('move_number') + '. ' : null}
                        <Button
                            className={clsx(classes.button, index === lastMove && classes.lastMove)}
                            onClick={handleSkipToMove(index)}>
                            {m.get('move')}
                        </Button>
                    </span>
                ))}
            </Typography>
        </Paper>
    );
};
