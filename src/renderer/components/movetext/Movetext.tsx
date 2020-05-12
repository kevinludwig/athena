import React from 'react';
import clsx from 'clsx';
import {List, Map} from 'immutable';

import {useSelector, useDispatch} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

import {selectGame, selectLastMove} from '../../selectors/game';
import {skipToMove} from '../../actions/game';
import Header from './Header';
import Move from './Move';
import Commentary from './Commentary'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    }
}));

interface Props {
    className?: string;
}

export default (props) => {
    const classes = useStyles({});
    const dispatch = useDispatch();
    const game = useSelector(selectGame);

    return (
        <Paper className={clsx(props.className, classes.root)}>
            {game.get('headers', Map()).entrySeq().map(([k, v], index) => (
                <Header key={index} name={k} value={v} />
            ))}
            <Typography>
                {(game.get('comment') || []).map((text, index) => <Commentary text={text} key={index} />)}
                {game.get('moves').map((m, index) => <Move key={index} index={index} move={m} />)}
                {game.get('result')}
            </Typography>
        </Paper>
    );
};
