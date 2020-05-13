import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

import {setLastEcoCode} from '../actions/game';
import {selectFen, selectLastEcoCode} from '../selectors/game';
import lookupEcoCode from 'chess-eco-codes';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: '0.75rem'
    }
}));

const makeText = (ecoCode) => {
    return ecoCode ? `${ecoCode.name} (${ecoCode.moves})` : ''; 
};

export default () => {
    const classes = useStyles({});
    const dispatch = useDispatch();
    const fen = useSelector(selectFen);
    const lastEcoCode = useSelector(selectLastEcoCode);

    useEffect(() => {
        const ecoCode = lookupEcoCode(fen);
        if (ecoCode) {
            dispatch(setLastEcoCode(ecoCode));
        }
    }, [fen]);

    return (
        <Typography className={classes.root}>{makeText(lastEcoCode)}</Typography>
    );
};
