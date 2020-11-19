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
    InputAdornment,
    Typography
} from '@material-ui/core';

import Inputs from '../../../../components/CustomizeComponents/Inputs';

const styles = theme => ({
    root:{
        width:'300px'
    }
});


function VerificationCodeForm(){
    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Typography variant="caption">Kode verifikasi telah dikirim ke +6281828899</Typography>
            </Grid>
            <Grid item xs={6}>
                <Inputs
                    labels="Masukkan Kode : "
                />
            </Grid>
            <Grid item xs={6} />

            <Grid item xs={6}>
                <Button size="small" color="primary" variant="outlined">Kirim Ulang Kode</Button>
            </Grid>
        </React.Fragment>
    );
}


class NomorHp extends Component {
    constructor(props) {
        super(props);
        this.state={
            verificationForm : 0,
        }
    }
    
    
    handleBtnSendVerification(){
        this.setState({verificationForm:1})
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
                <DialogTitle id="alert-dialog-title">Verifikasi Kartu Identitas</DialogTitle>
                <DialogContent style={{width:400}}>
                    <DialogContentText id="alert-dialog-description" style={{overflow:'hidden'}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                Masukkan Nomor telepon untuk mengirimkan kode verifikasi untuk memverifikasi akun Anda. Nomor ini akan dirahasiakan dan hanya akan digunakan untuk tujuan verifikasi.
                            </Grid>
                            <Grid item xs={12} container spacing={1} style={{ alignItems:'center'}}>
                                <Grid item xs={12}>
                                    <Inputs
                                        labels="Nomor Telepon : "
                                        fullWidth
                                        startAdornment={<InputAdornment position="start" style={{fontSize:13}}>+62</InputAdornment>}
                                    />
                                </Grid>
                                {this.state.verificationForm === 1 && <VerificationCodeForm/>}
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

export default withStyles(styles)(NomorHp);