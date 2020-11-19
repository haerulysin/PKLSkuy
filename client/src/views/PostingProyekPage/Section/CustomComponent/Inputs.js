import React from 'react';
import {
    InputLabel,
    OutlinedInput,
    withStyles,
    Typography,
    FormHelperText 
} from '@material-ui/core';

const MyInputs = withStyles({
    root: {
        borderRadius: 0,
        padding: '3px 5px',
        marginTop: '10px',
        fontSize: 15,

    },
    input: {
        padding: '12px 5px'
    }
})(OutlinedInput);

const MyLabel = withStyles({
    root: {
        fontSize: 20,
        color: '#000',
        fontWeight: 500,
    }
})(InputLabel);
function Inputs(props) {

    return (
        <React.Fragment>
            <MyLabel>{props.labels}</MyLabel>
            <Typography style={{marginTop:12}} variant="caption" color="inherit">{props.keterangan}</Typography>
            <MyInputs
                {...props}
            />
            <FormHelperText error={props.error}>{props.helpertext}</FormHelperText>
        </React.Fragment>
    );
}

export default Inputs;