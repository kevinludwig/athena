import * as React from 'react';
import {Provider} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppTheme from './AppTheme';
import AppBar from './AppBar';
import Layout from './Layout';

interface Props {
    store: any;
}

export default (props: Props) => {
    return (
        <Provider store={props.store}>
            <CssBaseline />
            <AppTheme>
                <AppBar />
                <Layout />
            </AppTheme>
        </Provider>
    );
}
