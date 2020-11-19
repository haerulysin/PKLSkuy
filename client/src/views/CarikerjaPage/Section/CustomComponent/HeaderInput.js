import React from 'react';
import{
    InputAdornment,
    makeStyles,
    InputBase
} from '@material-ui/core';

const styles = makeStyles({
    root:{
        padding: '9px 8px',
        border:'1px solid #ddd',
        width: '100%',

    },

    inputIcon:{
        padding: '15px'
    },

    input:{
        padding: '8px 5px'
    }
});

function HeaderInput(props){
    const classes = styles();
    return (
        <div style={{margin:'3px'}}>
            <InputBase
                className={classes.root}
                placeholder={props.placeholder}
                startAdornment={<InputAdornment>{props.icons}</InputAdornment>}
                inputProps={{ className: classes.input }}
                {...props}
            />
        </div>
    );
}

export default HeaderInput;