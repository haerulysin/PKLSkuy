import React, { Component } from 'react';
import {
    withStyles,
    Button,
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    Divider
} from '@material-ui/core';


const styles = theme => ({
    root:{
        margin:'40px 12px',
        flexGrow:1
    }
});
class Content extends Component {

    nama = ['A','B','C'];
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                
                    <Grid container spacing={2} style={{ margin: 0, width: '100%' }} direction="row">
                        <Grid item xs={4} md={4}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Gambar"
                                        height="150"
                                        src="https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"

                                    />
                                </CardActionArea>
                                <CardContent >
                                    Culpa commodo proident eiusmod est adipisicing sint eu.
                            </CardContent>
                                <Divider />
                                <CardActions>
                                    <div style={{ flexGrow: 1 }}></div>
                                    <Button size="small" variant="contained" color="primary">Pesan</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                
            </div>

        );
    }
}

export default withStyles(styles)(Content);