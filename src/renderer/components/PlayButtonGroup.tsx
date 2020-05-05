import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import SkipBackward from '../icons/SkipBackward';
import SkipForward from '../icons/SkipForward';
import StepBackward from '../icons/StepBackward';
import StepForward from '../icons/StepForward';

interface Props {
    onSkipBackward: () => void;
    onStepBackward: () => void;
    onStepForward: () => void;
    onSkipForward: () => void;
}

export default (props: Props) => {
    return (
        <ButtonGroup color='primary'>
            <Tooltip placement="right" title="Start of game">
                <IconButton
                    aria-label="skip to start of game"
                    onClick={props.onSkipBackward}>
                    <SkipBackward />
                </IconButton>
            </Tooltip>
            <Tooltip placement="right" title="Move back">
                <IconButton
                    aria-label="undo move"
                    onClick={props.onStepBackward}>
                    <StepBackward />
                </IconButton>
            </Tooltip>
            <Tooltip placement="right" title="Move forward">
                <IconButton
                    aria-label="move"
                    onClick={props.onStepForward}>
                    <StepForward />
                </IconButton>
            </Tooltip>
            <Tooltip placement="right" title="End of game">
                <IconButton
                    aria-label="skip to end of game"
                    onClick={props.onSkipForward}>
                    <SkipForward />
                </IconButton>
            </Tooltip>
        </ButtonGroup>
    );
}
