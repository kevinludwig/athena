import React from 'react';
import clsx from 'clsx';
import {Map} from 'immutable';

import {useSelector, useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

import {selectLastMove} from '../../selectors/game';
import {skipToMove} from '../../actions/game';

import Commentary from './Commentary';
import lookupNag from './lookupNag';

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
        fontSize: '1rem',
        verticalAlign: 'baseline',
        minWidth: 0,
        textTransform: 'none',
        padding: 0
    },
    lastMove: {
        fontWeight: 'bold'
    }
}));

interface Props {
    className?: string;
    index: number;
    move: Map<string, any>;
}

export default (props) => {
    const classes = useStyles({});
    const dispatch = useDispatch();
    const lastMove = useSelector(selectLastMove);
    const handleSkipToMove = (m) => () => dispatch(skipToMove(m));

    return (
        <span className={props.className}>
            {props.move.has('move_number') ? props.move.get('move_number') + '. ' : null}
                <>
                    <Button
                        className={clsx(classes.button, props.index === lastMove && classes.lastMove)}
                        onClick={handleSkipToMove(props.index)}>
                        {props.move.get('move')}
                        {(props.move.get('nags') || []).map(lookupNag).join(' ')}
                    </Button>
                    {props.move.has('comment') ? <Commentary text={props.move.get('comment')} /> : null}
                </>
        </span>
    );
};
