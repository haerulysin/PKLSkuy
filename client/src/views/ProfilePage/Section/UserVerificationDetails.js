import React, { Component } from 'react';
import {
    Card,
    CardContent,
    Divider,
    Typography,
    Grid
} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CheckIcon from '@material-ui/icons/Check';
import RemoveIcon from '@material-ui/icons/Remove';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import { Skeleton } from '@material-ui/lab';
function SkeletonLoadings() {
    return (
        <Card>
            <CardContent>
                <Skeleton />
                <Divider />
                <br />
                <Grid container direction="column">
                    <Skeleton />
                    <Skeleton animation={false} />
                    <Skeleton animation="wave" />
                </Grid>
            </CardContent>
        </Card>
    );
}

class UserVerificationDetails extends Component {

    render() {
        if (!this.props.userData.verification) {
            return (
                SkeletonLoadings()
            );
        }
        const { verification } = this.props.userData;
        return (
            <Card>
                <CardContent>
                    <Typography>Verifikasi</Typography>
                    <Divider />
                    <br />
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container spacing={1}>
                                <Grid item><AccountBoxIcon color={verification.identityVerification ? 'primary' : 'inherit'} fontSize="small" /></Grid>
                                <Grid item style={{ flexGrow: 1 }} ><Typography color={verification.identityVerification ? 'primary' : 'inherit'} variant="body2">Identitas Terverifikasi</Typography></Grid>
                                <Grid item>{verification.identityVerification ? <CheckIcon color="primary" /> : <RemoveIcon />}</Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item><EmailIcon color={verification.emailVerification ? 'primary' : 'inherit'} fontSize="small" /></Grid>
                                <Grid item style={{ flexGrow: 1 }} ><Typography color={verification.emailVerification ? 'primary' : 'inherit'} variant="body2">Email Terverifikasi</Typography></Grid>
                                <Grid item>{verification.emailVerification ? <CheckIcon color="primary" /> : <RemoveIcon />}</Grid>
                            </Grid>

                            <Grid container spacing={1}>
                                <Grid item><PhoneIcon color={verification.phonenumberVerification ? 'primary' : 'inherit'} fontSize="small" /></Grid>
                                <Grid item style={{ flexGrow: 1 }} ><Typography color={verification.phonenumberVerification ? 'primary' : 'inherit'} variant="body2">No. Telpon Terverifikasi</Typography></Grid>
                                <Grid item>{verification.phonenumberVerification ? <CheckIcon color="primary" /> : <RemoveIcon />}</Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>

        );
    }
}

export default UserVerificationDetails;