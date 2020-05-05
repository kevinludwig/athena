import * as React from 'react';
import {Provider} from 'react-redux';
import Chessboard from './Chessboard';

interface IProps {
    store: any;
}

export default (props: IProps) => {
    return (
        <Provider store={props.store}>
            <Chessboard />
        </Provider>
    );
}
