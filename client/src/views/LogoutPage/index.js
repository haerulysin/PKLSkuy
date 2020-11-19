import React, { Component } from 'react';
import {logoutUser} from '../../redux/actions/authActions';
import{
    CircularProgress, Card, Grid
} from '@material-ui/core';
class index extends Component {
    render() {
        return (
            <React.Fragment>
                    <Grid container>
                        <Grid item xs={12} style={{justifyContent:'center'}}>
                        <CircularProgress style={{width:200,height:200}} />
                        </Grid>
                    </Grid>
            </React.Fragment>
        );
    }
}

export default index;