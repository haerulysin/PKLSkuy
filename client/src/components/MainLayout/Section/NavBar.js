import React, { Component } from 'react';
import Logo from '../../Logo';
import { Link } from 'react-router-dom';
import LoginDialog from './LoginDialog';
//MaterialUI Core
import {
    AppBar,
    Toolbar,
    Button,
    Hidden,
    withStyles,
    Grid,

} from '@material-ui/core';
import LoginButton from './CustomComponent/LoginButton';
const styles = theme => ({
    root: {
        flexGrow: 1
    },
    toolBar: {
        background: '#fff',
        height: '7vh',
        color: '#FF7200',
    },

    navLogo: {
        flexGrow: 1
    },

    navLink: {
        height: '64px',
        textTransform: 'capitalize'
    },

    dialogLogin: {
        visibility: 'hidden'
    },

    avatarButton: {
        width: 30,
        height: 30,
        marginRight: 10
    },

    loginBtn: {
        textTransform: 'Capitalize'
    }
});

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
        }

    }

    componentDidMount() {
        if (localStorage.jwtToken) {

        }
    }

    handleOpenModal = () => {
        this.setState({ openModal: true });
    }

    handleCloseModal = () => {
        this.setState({ openModal: false });
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <AppBar className={classes.root} position="relative">
                    <Toolbar className={classes.toolBar}>
                        <Grid container spacing={1} style={{ alignItems: 'center' }}>
                            <Grid item className={classes.navLogo}>
                                <Link to="/"><Logo /></Link>
                            </Grid>

                            <Grid item>
                                <Hidden xsDown>
                                    <Link to="/dashboard">
                                        <Button variant="text" color="primary" className={classes.navLink}>Dashboard</Button>
                                    </Link>
                                    <Link to="/carikerja">
                                        <Button variant="text" color="primary" className={classes.navLink}>Cari Kerja</Button>
                                    </Link>
                                    
                                    <Link to="/mymessage">
                                        <Button variant="text" color="primary" className={classes.navLink}>Pesan Saya</Button>
                                    </Link>
                                </Hidden>
                            </Grid>
                            <Grid item />
                            <Grid item>
                                {localStorage.jwtToken ?
                                    <LoginButton {...this.props} /> :
                                    <Button variant="contained" color="primary" className={classes.loginBtn} onClick={this.handleOpenModal.bind(this)}>
                                        Masuk
                                    </Button>
                                }
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <LoginDialog {...this.state} handleCloseModal={this.handleCloseModal} />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(NavBar);