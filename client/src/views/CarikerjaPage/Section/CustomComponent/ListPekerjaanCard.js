import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    CardActionArea
} from '@material-ui/core';

//MaterialUI Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';

import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        borderRadius: 0,
        border: 'none',
    },
});

export default function ImgMediaCard(props) {
    const classes = useStyles();
    const {
        _id,
        projectName,
        projectDescription,
        location:{address}
    } = props;

    return (
        <Card className={classes.root}>
            <CardActionArea component={Link} to={"/proyek/"+_id+"/details"} target="_blank">
                <CardContent>
                    <Typography variant="h5" component="h4" gutterBottom>{projectName}</Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        {projectDescription}
                </Typography>
                    <br />
                    <Grid container direction="row" alignItems="center">
                        <LocationOnIcon fontSize="small" />
                        <Typography variant="body2">{address[1]+', '+address[2]}</Typography>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}