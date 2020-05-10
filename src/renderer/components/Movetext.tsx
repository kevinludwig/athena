import React from 'react';
import {useSelector} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

import {selectGame} from '../selectors/game';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        width: '450px',
        height: '520px'
    }
}));

export default () => {
    const classes = useStyles({});
    const game = useSelector(selectGame);
    return (
        <Paper className={classes.root}>
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
