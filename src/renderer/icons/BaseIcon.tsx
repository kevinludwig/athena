import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: theme.spacing(4),
        height: theme.spacing(4)
    }
}));

interface Props {
    path: string
}

export default (props: Props) => {
    const clases = useStyles({});
    return (
        <SvgIcon viewBox="0 0 24 24">
            <path fill="currentColor" d={props.path} />
        </SvgIcon>
    );
};
