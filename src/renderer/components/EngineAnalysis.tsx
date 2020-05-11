import React from 'react';
import Paper from '@material-ui/core/Paper';

interface Props {
    className?: string
}

export default (props: Props) => {
    return (
        <Paper className={props.className} />
    );
}
