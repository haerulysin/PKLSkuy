import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Logo';
//MaterialUI Core
import {
    Button,
    Typography,
    Dialog,
    DialogContent,
    Slide,
    TextField,
} from '@material-ui/core';

const LoginDialog = ({onCloseModal, openModal}) => {
    return (
        <div>
            <Dialog
                open={openModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={onCloseModal}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent className={classes.loginDialog}>
                    <Logo />
                    <br />
                    <Typography>Welcome Back!</Typography>
                    <Divider />
                    <TextField id="standard-basic" label="Userasd" /><br /><br />
                    <TextField id="outlined-basic" label="Passwd" variant="outlined" />
                    <Divider />
                    <Link>Forgot Password?</Link>
                    <Button variant="contained" color="secondary">MASUK</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LoginDialog;