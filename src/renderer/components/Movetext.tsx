import React from 'react';
import clsx from 'clsx';
import {useSelector} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

import {selectGame} from '../selectors/game';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    }
}));

interface Props {
    className?: string;
}

export default (props) => {
    const classes = useStyles({});
    const game = useSelector(selectGame);
    return (
        <Paper className={clsx(props.className, classes.root)}>
            <Typography>
                {game.get('moves').map((m) => {
                    let res = '';
                    if (m.has('move_number')) res += m.get('move_number') + '. ';
                    res += m.get('move') + ' ';
                    return res;
                })}
            </Typography>
        </Paper>
    );
};
