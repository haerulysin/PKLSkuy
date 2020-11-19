import React, { Component } from 'react';
import {
    Card,
    CardContent,
    Typography,
    withStyles

} from '@material-ui/core';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import {Link} from 'react-router-dom';

const styles = theme => ({
    root: {
        minHeight: 300,
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        textAlign:"center"

    },

    findMoreLink:{
        '&:hover':{
            textDecoration:'underline',
        },

        padding:5
    }

});
class ProjectLockedCard extends Component {
    render() {
        const { classes } = this.props
        return (
            <Card className={classes.root}>
                <CardContent>
                    <LockTwoToneIcon color="primary" fontSize="large"/>
                    <Typography variant="h4">Proyek ini tidak dapat menerima proposal lagi</Typography>
                    <Typography variant="body1" color="primary" component={Link} to="/carikerja" className={classes.findMoreLink}>Cari proyek lain</Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(ProjectLockedCard);