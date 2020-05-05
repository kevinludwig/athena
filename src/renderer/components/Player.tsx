import React from 'react';
import Container from '@material-ui/core/Container';

import Chessboard from './Chessboard';
import PlayButtonGroup from './PlayButtonGroup';

export default () => {
    const noop = () => {};
    return (
        <Container disableGutters>
            <Chessboard />
            <PlayButtonGroup 
                onSkipBackward={noop}
                onSkipForward={noop}
                onStepBackward={noop}
                onStepForward={noop} />
        </Container>
    );
};
