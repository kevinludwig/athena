import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


interface Props {
    className?: string
}

export default (props: Props) => {
    return (
        <Paper className={props.className}>
            <Typography>

            </Typography>
        </Paper>
    );
}
