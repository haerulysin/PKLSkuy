import React, { Component } from 'react';
import {
    Grid,
    Typography,
    withStyles,
    Button,
    Hidden
} from '@material-ui/core';
import ContentHeaderLayout from './ContentHeaderLayout';
import {Link} from 'react-router-dom';
const styles = theme => ({

    innerImage: {
        backgroud: '#000',
        alignItems: 'center',
        height: '400px',
        margin: '0 auto',
        fontWeight: '700'
    },

    buttonCari:{
        borderColor: '#fff',
        color: '#fff',
        marginLeft: '10px'
    }
});

class ContentHeader extends Component {
    render() {
        const { classes } = this.props;
        return (
            <ContentHeaderLayout>
                <Grid container className={classes.innerImage}>
                    <Grid item md={6} xs={6}>
                        <Typography variant="h1">
                            Cari Jasa Tukang Anda Disini Secara Online.
                        </Typography>
                        <br/>
                        <Button size="medium" variant="contained" color="primary" component={Link} to='/register'>
                            Daftar Sekarang Juga
                        </Button>
                        <Hidden smDown>
                            <Button className={classes.buttonCari} size="medium" variant="outlined" color="success" component={Link} to='/register'>
                                Posting Kebutuhan Anda.
                        </Button>
                        </Hidden>
                        
                    </Grid>
                    
                </Grid>
            </ContentHeaderLayout>
        );
    }
}

export default withStyles(styles)(ContentHeader);