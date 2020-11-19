import React from 'react';
import {Grid, makeStyles} from '@material-ui/core';
import Logo from '../../../components/Logo';
import {Link} from 'react-router-dom';
const styles = makeStyles(({
    logoTop:{
        textAlign:"center",
        paddingBottom: "80px"
    }
}));


const TopNav = () => {
    const classes = styles();
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12} className={classes.logoTop}>
                    <Link to="/"><Logo /></Link>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default TopNav;