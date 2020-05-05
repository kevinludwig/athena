import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

import FolderOpen from '../icons/FolderOpen';

const useStyles = makeStyles(theme => ({
    toolbar: {
        flexGrow: 1,
        justifyContent: 'space-between'
    }
}));
export default () => {
    const classes = useStyles({});
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar} variant="dense">
                <Typography variant="h6">Athena</Typography>
                <Tooltip title="Open">
                    <IconButton color="inherit">
                        <FolderOpen />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}