import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1)
    }
}));

interface Props {
    className?: string;
    text: string;
}

export default (props) => {
    const classes = useStyles({});
    const { className, text } = props;
    return (
        <span className={clsx(className, classes.root)}>
            {"{ " + text + " }"}
        </span>
    );
};
