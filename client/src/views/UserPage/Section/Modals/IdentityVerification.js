import React, { Component } from 'react';
import {
    withStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Grid,
    Divider,
} from '@material-ui/core';

import PublishIcon from '@material-ui/icons/Publish';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
const styles = theme => ({
    root: {
        width: '300px'
    }
});



class IdentityVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationForm: false,
            verificationDone : false
        }
    }


    handleBtnSendVerification() {
        this.setState({ verificationForm: true })
    }



    render() {
        return (
            <React.Fragment>
                <Dialog
                    open={this.props.openModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    onClose={this.props.onClose}
                >
                    <DialogTitle id="alert-dialog-title">Verifikasi Identitas</DialogTitle>
                    <DialogContent style={{ width: 400 }}>
                        <DialogContentText id="alert-dialog-description" style={{ overflow: 'hidden' }}>
                            <Grid container spacing={3} style={{textAlign:'center'}}>
                                <Grid item xs={12}>
                                    Upload kartu identitas anda untuk memverifikasi akun anda.
                                    
                                </Grid>
                                

                                <Grid item xs={12}  spacing={1} style={{ alignItems: 'center', textAlign:'center' }}>
                                    <Button variant="contained" color="primary" fullWidth><PhotoCameraIcon style={{marginRight:10}} /> Ambil foto melalui kamera anda</Button>
                                </Grid>

                                <Grid item xs={12} container style={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Grid item xs={5}><Divider /></Grid>
                                    <Grid item xs={2}>Atau</Grid>
                                    <Grid item xs={5}><Divider/></Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    
                                    <Button variant="outlined" color="primary" component="label">
                                        <PublishIcon/>
                                        Upload foto melalui komputer anda
                                        <input type="file" style={{display:'none'}}/>
                                    </Button>
                                </Grid>

                            </Grid>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" variant="contained" size="small" onClick={this.handleBtnSendVerification.bind(this)}>Kirim Verifikasi</Button>
                        <Button color="primary" variant="outlined" size="small" onClick={this.props.onClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(IdentityVerification);