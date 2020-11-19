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
import {
    Skeleton
} from '@material-ui/lab'
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

class EmailDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAlertMessage: false,
        }
    }

    handleCloseAlertMessage() {
        this.setState({ openAlertMessage: false });
    }

    render() {
        if (!this.props.values) {
            return (
                <Grid container style={{ padding: '20px 50px' }}>
                    <Grid item xs={12}>
                        <Typography variant="h3"><Skeleton /></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
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
                email,
                phoneNumber

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
                        <Typography variant="h2" gutterBottom>Emails {'&'} Nomor Telpon</Typography>
                    </Grid>
                    <Divider />

                    <Grid item xs={12} container spacing={2} className={classes.sectionsWrapper}>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>Emails</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Collapse in={updateStatusMessage.open}>
                                <Alert
                                    severity={updateStatusMessage.success ? 'success' :'error'}
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

                        <Grid item xs={12}>
                            <Inputs
                                labels="Email Address *"
                                fullWidth
                                name='email'
                                id='email'
                                values={email}
                                defaultValue={email}
                                onChange={change.bind(null, "email")}
                                helpertext={touched.email ? errors.email : ""}
                                error={(errors.email && touched.email) ? true : false}

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Inputs
                                labels="No Hp *"
                                type="number"
                                fullWidth
                                values={phoneNumber}
                                defaultValue={phoneNumber}
                                onChange={change.bind(null, "phoneNumber")}
                                helpertext={touched.phoneNumber ? errors.phoneNumber : ""}
                                error={(errors.phoneNumber && touched.phoneNumber) ? true : false}
                            />
                        </Grid>


                    </Grid>

                    <Grid item style={{ textAlign: "right" }}>
                        <Divider />
                        <br />
                        <Button variant="contained" color="primary" type="submit" disabled={!isValid || this.props.isLoading} style={{ minWidth: 180 }}>{this.props.isLoading ? <CircularProgress size={20} /> : 'Simpan Perubahan'}</Button>
                    </Grid>
                </form>
            </Grid>
        );
    }
}

export default withStyles(styles)(EmailDetails);