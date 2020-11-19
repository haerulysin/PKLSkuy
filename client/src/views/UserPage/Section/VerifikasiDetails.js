import React, { Component } from 'react';
import {
    withStyles,
    Grid,
    Typography,
    Divider,
    Button
} from '@material-ui/core';

import ModalNomorHp from './Modals/NomorHp';
import ModalIdentitas from './Modals/IdentityVerification';
const styles = theme => ({
    root: {
        padding: '20px 50px',
        paddingBottom:40

    },
    sectionsWrapper: {
        marginTop: 5,
        alignItems: 'center',
        border: '0.3px solid #ddd',
    }
});

class VerifikasiDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openTelpVerification : false,
            openIdentityVerification : false,
        }
    }

    handleModalTelp(){
        this.setState({ openTelpVerification: !this.state.openTelpVerification});
    }

    handleModalVerifikasi(){
        this.setState({openIdentityVerification:!this.state.openIdentityVerification});
    }
    
    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={5} className={classes.root} direction="column">
                <Grid item>
                    <Typography variant="h2" gutterBottom>Verifikasi Detail</Typography>
                    <Divider />
                </Grid>

                <Grid item xs={12} container className={classes.sectionsWrapper}>
                    <Typography variant="h4" style={{ flexGrow: 1 }}>Email Address</Typography>
                    <Typography variant="h5" color="primary"> Verified</Typography>
                </Grid>

                <Grid item xs={12} container className={classes.sectionsWrapper}>
                    <Typography variant="h4" style={{flexGrow:1}}>Nomor Hp</Typography>
                    <Button variant="outlined" color="primary" onClick={this.handleModalTelp.bind(this)}>Tambah Nomor Hp</Button>
                </Grid>

               

                <Grid item xs={12} container className={classes.sectionsWrapper}>
                    <Typography variant="h4" style={{ flexGrow: 1 }}>Kartu Identitas (KTP/SIM)</Typography>
                    <Button variant="outlined" color="primary" onClick={this.handleModalVerifikasi.bind(this)}>Verifikasi Identitas</Button>
                </Grid>

                <ModalNomorHp
                    openModal = {this.state.openTelpVerification}
                    onClose = {this.handleModalTelp.bind(this)}
                />

                <ModalIdentitas
                    openModal={this.state.openIdentityVerification}
                    onClose={this.handleModalVerifikasi.bind(this)}
                />
            </Grid>
        );
    }
}

export default withStyles(styles)(VerifikasiDetails);