import React, { Component } from 'react';
import {
    Grid,
    withStyles,
    Typography,
    Card,
    CardContent,
} from '@material-ui/core';

//MaterialUI Icon
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';


const styles = theme=>({
    root:{
        background:'#fff'
    }
});

class TentangPekerja extends Component {
    render() {
        const {
            classes,
            verification: { emailVerification, identityVerification, phonenumberVerification},
            address: {city, province},
            joinedOn
        } = this.props;
        const joinDate = (new Intl.DateTimeFormat('en-US', { year: 'numeric', day: '2-digit', month: 'short' }).format(new Date(joinedOn)));

        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid container style={{ padding: '14px 16px'}}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Tentang Pekerja</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <Grid container direction="row" spacing={1}>
                                        <Grid item><CalendarTodayIcon fontSize="small" /></Grid>
                                        <Grid item><Typography variant="body2" component="h2" gutterBottom>Bergabung pada {joinDate}</Typography></Grid>
                                    </Grid>
                                </Grid>

                                <Grid item>
                                    <Grid container direction="row" spacing={1}>
                                        <Grid item><LocationCityIcon fontSize="small" /></Grid>
                                        <Grid item><Typography variant="body2" component="h2" gutterBottom>{city}, {province}</Typography></Grid>
                                    </Grid>
                                </Grid>

                                <Grid item>
                                    <br/>
                                    <Typography variant="h6">Verifikasi Pekerja</Typography>
                                </Grid>

                                <Grid item>
                                    <Grid container spacing={1}>
                                        <Grid item><AccountBoxIcon color={identityVerification ? 'primary' : 'inherit'} fontSize="small" /></Grid>
                                        <Grid item style={{ flexGrow: 1 }} ><Typography color={identityVerification ? 'primary' : 'inherit'} variant="body2">Identitas Terverifikasi</Typography></Grid>
                                    </Grid>

                                </Grid>

                                <Grid item>
                                    <Grid container spacing={1}>
                                        <Grid item><EmailIcon color={emailVerification ?'primary':'inherit'} fontSize="small" /></Grid>
                                        <Grid item style={{ flexGrow: 1 }} ><Typography color={emailVerification ? 'primary' : 'inherit'}variant="body2">Email Terverifikasi</Typography></Grid>
                                    </Grid>

                                </Grid>

                                <Grid item>
                                    <Grid container spacing={1}>
                                        <Grid item><PhoneIcon color={phonenumberVerification ? 'primary' : 'inherit'} fontSize="small" /></Grid>
                                        <Grid item style={{ flexGrow: 1 }} ><Typography color={phonenumberVerification ? 'primary' : 'inherit'} variant="body2">No. Telpon Terverifikasi</Typography></Grid>
                                    </Grid>

                                </Grid>
                                
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        );
    }
}

export default withStyles(styles)(TentangPekerja);