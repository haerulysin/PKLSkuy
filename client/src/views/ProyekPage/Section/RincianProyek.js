import React, { Component } from 'react';
import {
    withStyles,
    Grid,
    Typography,
    Card,
    CardContent,


} from '@material-ui/core';
import Links from './CustomComponent/LinkButton';
import Carousel from 'react-material-ui-carousel';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import moment from 'moment';

const styles = theme => ({
    root: {
        background: '#fff'

    }
});

const projectCategoryString = [
    '',
    'Perbaikan dan Instalasi',
    'Renovasi dan Pembangunan',
    'Desain dan perencanaan'
]

class RincianProyek extends Component {

    render() {
        const { classes, projectData } = this.props;
        const numberFormatter = new Intl.NumberFormat("es-ES");
        const {
            projectBudget,
            projectDescription,
            projectCategory,
            location,
            photoURL,
            projectDeadline
        } = projectData;
        const deadline = moment(projectDeadline);
        const today = moment(new Date())
        const diff = deadline.diff(today,'days');

        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid container style={{ padding: '14px 16px', justifyContent: 'center' }}>
                        <Grid item style={{ flexGrow: 1 }}>
                            <Typography variant="h3">Rincian Proyek</Typography>
                        </Grid>

                        <Grid item style={{textAlign:'right'}}>
                            <Typography variant="h5" align="right">
                                Rp. {numberFormatter.format(projectBudget[0])} -
                                Rp. {numberFormatter.format(projectBudget[1])}
                            </Typography>
                            <Typography variant="caption" align="right">
                                {projectData.onProgress.status?'Penawaran telah berakhir':
                                    ('Penawaran berakhir dalam ' + diff+' Hari')
                                }
                            </Typography>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid item xs={12} style={{ background: '#fff' }}>
                    {photoURL.length === 0 ? (
                        <div style={{ background: '#fff', minHeight: 300, textAlign: "center" }}>
                            <img style={{ maxHeight: 300 }} alt="listimage" src={process.env.PUBLIC_URL + '/assets/upload/default.png'} />
                        </div>
                    ) : (
                            <Carousel
                                navButtonsAlwaysVisible={true}
                                autoPlay={false}
                                animation="fade"

                            >


                                {photoURL.map(item => {
                                    return (
                                        <div key={item} style={{ background: '#fff', minHeight: 300, textAlign: "center" }}>
                                            <img style={{ maxHeight: 300 }} alt="listimage" src={process.env.PUBLIC_URL + '/assets/upload/' + item} />
                                        </div>
                                    );
                                })}
                            </Carousel>
                        )
                    }


                </Grid>

                <Grid item xs={12}>
                    <Card style={{ borderRadius: '0px' }}>
                        <CardContent>
                            <Grid container direction="column" spacing={3}>
                                <Grid item>
                                    <Typography variant="h4" gutterBottom>Deskripsi Proyek</Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {projectDescription}
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Typography variant="h4" gutterBottom>Jenis Pekerjaan</Typography>
                                    <Grid container spacing={2} >
                                        <Grid item><Links label={projectCategoryString[projectCategory]} t0='/' /></Grid>
                                    </Grid>
                                </Grid>

                                <Grid item>
                                    <Typography variant="h4" gutterBottom>Lokasi Pekerjaan</Typography>
                                    <Grid container direction="row" alignItems="center">
                                        <LocationOnIcon fontSize="small" />
                                        <Typography variant="body2"> {location.address[1] + ', ' + location.address[2]}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid item style={{ textAlign: 'right' }}>
                                    <Typography variant="caption">Project ID : {projectData._id}</Typography>

                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(RincianProyek);