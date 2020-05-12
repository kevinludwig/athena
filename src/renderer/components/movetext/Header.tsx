import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: '0.875rem'
    },
    hob: {
        fontWeight: 'bold',
        paddingRight: theme.spacing(0.5)
    },
    hcb: {
        fontWeight: 'bold',
        paddingLeft: theme.spacing(0.5)
    },
    hk: {
        color: theme.palette.text.primary
    },
    hv: {
        color: theme.palette.success.main   
    }
}));

interface Props {
    key?: string;
    className?: string;
    name: string;
    value: string;
}

export default (props) => {
    const classes = useStyles({});
    const { name, value, className } = props;
    return (
        <Typography className={clsx(className, classes.root)}>
            <span className={classes.hob}>[</span>
            <span className={classes.hk}>{name} </span>
            <span className={classes.hv}>"{value}"</span>
            <span className={classes.hcb}>]</span>
        </Typography>
    );
};
