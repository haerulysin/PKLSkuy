import React, { Component } from 'react';
import {
    withStyles,
    Grid,
    Typography,
    Divider,
    Button,
    IconButton,
    Collapse
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
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

class PasswordDetails extends Component {
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
                currentPassword,
                password,
                password2

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
            <Grid container spacing={2} className={classes.root} direction="column">
                <form onSubmit={handleSubmit}>
                    <Grid item>
                        <Typography variant="h2" gutterBottom>Password</Typography>

                    </Grid>
                    <Divider />

                    <Grid item xs={12} container className={classes.sectionsWrapper} direction="column" spacing={2}>
                        <br />
                        <Grid item xs={12}>
                            <Typography variant="h4">Ganti Password</Typography>
                        </Grid>
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
                        <Grid item xs={6}>
                            <Inputs
                                labels="Password Sekarang"
                                type="password"
                                fullWidth
                                name='currentPassword'
                                id='currentPassword'
                                values={currentPassword}
                                onChange={change.bind(null, "currentPassword")}
                                helpertext={touched.currentPassword ? errors.currentPassword : ""}
                                error={(errors.currentPassword && touched.currentPassword) ? true : false}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Inputs
                                labels="Password Baru"
                                type="password"
                                fullWidth
                                name='password'
                                id='password'
                                values={password}
                                onChange={change.bind(null, "password")}
                                helpertext={touched.password ? errors.password : ""}
                                error={(errors.password && touched.password) ? true : false}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Inputs
                                labels="Konfirmasi Password baru"
                                name='password2'
                                id='password2'
                                type="password"
                                fullWidth
                                values={password2}
                                onChange={change.bind(null, "password2")}
                                helpertext={touched.password2 ? errors.password2 : ""}
                                error={(errors.password2 && touched.password2) ? true : false}
                            />
                        </Grid>
                    </Grid>

                    <Grid item style={{ textAlign: 'right' }}>
                        <Divider />
                        <br />
                        <Button variant="contained" color="primary" type="submit" disabled={!isValid}>Simpan Perubahan</Button>
                    </Grid>
                </form>
            </Grid>
        );
    }
}

export default withStyles(styles)(PasswordDetails);