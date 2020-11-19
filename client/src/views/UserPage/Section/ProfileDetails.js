import React, { Component } from 'react';
import {
    withStyles,
    Grid,
    Typography,
    Divider,
    Button,
    CircularProgress,
    IconButton,
    Collapse
} from '@material-ui/core';
import{
    Skeleton
} from '@material-ui/lab';
import Inputs from '../../../components/CustomizeComponents/Inputs';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    root: {
        padding: '20px 50px'

    },

    sectionsWrapper: {
        marginTop: 5
    }
});

class ProfileDetails extends Component {
    render() {

        if (!this.props.values.id) {
            return (
                <Grid container style={{padding:'20px 50px'}}>
                    <Grid item xs={12}>
                        <Typography variant="h3"><Skeleton/></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>

                    <Grid item xs={12}>
                        <Skeleton />
                        <Typography variant="h3"><Skeleton /></Typography>
                        <Typography variant="h3"><Skeleton /></Typography>
                        <Typography variant="h3"><Skeleton /></Typography>
                    </Grid>
                </Grid>
            );
        }
        const {
            classes,
            values: {
                fullName,
                address1,
                postalCode,
                city,
                province
                
            },
            errors,
            touched,
            handleChange,
            isValid,
            setFieldTouched,
            handleSubmit,
            updateStatusMessage
        } = this.props;
        const change = (name, e) => {
            e.persist();
            handleChange(e);
            setFieldTouched(name, true, false)
        }
        return (
            <Grid container className={classes.root} direction="column" spacing={2}>
                <form onSubmit={handleSubmit}>
                    <Grid item>
                        <Typography variant="h2" gutterBottom>Detail Profil</Typography>
                    </Grid>
                    <Divider />
                    <Grid item xs={12}><br/></Grid>
                    <Grid item xs={12}>
                        <Collapse in={updateStatusMessage.open}>
                            <Alert
                                severity={updateStatusMessage.success ? 'success' : 'error'}
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={this.props.handleCloseAlert}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                {updateStatusMessage.message}
                            </Alert>
                        </Collapse>
                    </Grid>
                    <Grid item xs={12} container spacing={2} className={classes.sectionsWrapper}>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>Nama Lengkap</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Inputs
                                labels="Nama Lengkap*"
                                fullWidth
                                autoComplete='Fullname'
                                autoFocus
                                name='fullName'
                                id='fullName'
                                values={fullName}
                                defaultValue={fullName}
                                onChange={change.bind(null, "fullName")}
                                helpertext = {touched.fullName?errors.fullName:""}
                                error={(errors.fullName && touched.fullName) ? true : false}
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <Divider />

                    <Grid item xs={12} container spacing={2} className={classes.sectionsWrapper}>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>Alamat</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Inputs
                                labels="Alamat*"
                                fullWidth
                                name='address1'
                                id='address1'
                                values={address1}
                                defaultValue={address1}
                                onChange={change.bind(null, "address1")}
                                helpertext={touched.address1 ? errors.address1 : ""}
                                error={(errors.address1 && touched.address1) ? true : false}
                                
                                
                                
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Inputs
                                labels="Kota*"
                                fullWidth
                                name="city"
                                values={city}
                                defaultValue={city}
                                onChange={change.bind(null, "city")}
                                helpertext={touched.city ? errors.city : ""}
                                error={(errors.city && touched.city) ? true : false}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Inputs
                                labels="Kode Pos*"
                                name="postalCode"
                                fullWidth
                                values={postalCode}
                                defaultValue={postalCode}
                                onChange={change.bind(null, "postalCode")}
                                helpertext={touched.postalCode ? errors.postalCode : ""}
                                error={(errors.postalCode && touched.postalCode) ? true : false}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Inputs
                                labels="Provinsi*"
                                name="province"
                                fullWidth
                                values={province}
                                defaultValue={province}
                                onChange={change.bind(null, "province")}
                                helpertext={touched.province ? errors.province : ""}
                                error={(errors.province && touched.province) ? true : false}
                            />
                        </Grid>
                    </Grid>

                    <Grid item style={{ textAlign: 'right' }}>
                        <Divider />
                        <br />
                        <Button variant="contained" color="primary" type="submit" disabled={!isValid||this.props.isLoading} style={{minWidth:180}}>{this.props.isLoading?<CircularProgress size={20}/>:'Simpan Perubahan'}</Button>
                    </Grid>
                </form>

            </Grid>
        );
    }
}

export default withStyles(styles)(ProfileDetails);