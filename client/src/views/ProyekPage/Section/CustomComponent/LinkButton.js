import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import{
    Typography
} from '@material-ui/core';

import {Link} from 'react-router-dom';
const useStyles = makeStyles({
    linkBtn:{
        '&:hover':{
            color: '#FF7200',
            borderColor:'#FF7200'
        },

        padding:'5px',
        border:'1px solid #000',
        color: '#000'
    }
});

export default function LinkButton(props) {
    const classes = useStyles();

    return(
        <Link to={props.t0}>
                <Typography variant="body2" className={classes.linkBtn}>{props.label}</Typography>
        </Link>
    );
    
}