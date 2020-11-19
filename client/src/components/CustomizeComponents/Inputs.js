import React from 'react';
import {
    InputLabel,
    OutlinedInput,
    withStyles,
    FormHelperText
} from '@material-ui/core';

const MyInputs = withStyles({
    root:{
        borderRadius:0,
        padding: '3px 5px',
        marginTop: '10px',
        fontSize: 13

    },
    input: {
        padding: '8px 5px'
    }
})(OutlinedInput);

const MyLabel = withStyles({
    root: {
        fontSize:14,
        color: '#000',
        fontWeight:700
    }
})(InputLabel);
function Inputs(props) {
    
    return (
            <React.Fragment>
            <MyLabel>{props.labels}</MyLabel>
            <MyInputs

                {...props}

            />
            <FormHelperText error={true}>{props.helpertext}</FormHelperText>
        </React.Fragment>
    );
}

export default Inputs;