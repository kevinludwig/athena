import * as React from 'react';
import {Provider} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Player from './Player';

interface Props {
    store: any;
}

export default (props: Props) => {
    return (
        <Provider store={props.store}>
            <CssBaseline />
            <Player />
        </Provider>
    );
}
