import React from 'react';
import {useSelector} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {selectGame} from '../selectors/game';

interface Props {
    className?: string;
}

export default (props) => {
    const game = useSelector(selectGame);
    return (
        <Paper className={props.className}>
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
