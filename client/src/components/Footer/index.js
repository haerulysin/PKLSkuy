import React, { Component } from 'react';
import{
    withStyles, Grid
} from '@material-ui/core';
const styles = theme => ({
    root:{
        background:'#000',
        minHeight: '10vh',
        color: '#fff',
        marginTop: '70px',
    }
});
class index extends Component {
    render() {
        const {classes} = this.props
        return (
            <Grid container className={classes.root}>
                <p>Footer</p>
            </Grid>
        );
    }
}

export default withStyles(styles)(index);