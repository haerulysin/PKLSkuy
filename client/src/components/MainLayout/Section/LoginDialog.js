import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Logo';
import PropTypes from "prop-types";

//MaterialUI Core
import {
    Typography,
    Dialog,
    DialogContent,
    Slide,
    Box,
    Divider,
    withStyles,
} from '@material-ui/core';
import LoginForm from './LoginForm';

//FormHelper
import { Formik } from 'formik';
import * as Yup from 'yup';
//MiddleWare
import { connect } from "react-redux";
import { loginUser } from "../../../redux/actions/authActions";

const styles = theme => ({
    loginDialog: {
        textAlign: 'left',
    },

    logoLogin: {
        display: 'block',
        textAlign: 'center',
        margin: '0 auto',
        width: '40%'
    },
    loginBtn: {
        margin: theme.spacing(3, 0, 2)
    },
    loginModalFooter: {
        paddingBottom: '30px',
    }
});
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const validationSchema = Yup.object({
    email: Yup.string("Masukkan email/username").required("Masukkan email/username"),
    password: Yup.string("").min(8, "Password minimal 8 karakter").required("Password harus di isi"),
});

class LoginDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openErrorMessage: false,
            authErrors: "AAA",
            responseAuthData: {},
            isLoading: false,
        }
    }

    componentDidMount(){
        if(localStorage.jwtToken){
            
        }
    }

    static getDerivedStateFromProps(props,state){
        if(props.auth.isAuthenticated){
            props.handleCloseModal();
            return{
                responseAuthData: {},
                
            }
        }

        if(props.errors){
            
            return{
                responseAuthData: props.errors
            }
        }

        return null;
    }

    async handleSubmitForm(e,values){
        await this.setState({isLoading:!this.state.isLoading});
        await this.props.loginUser(values);
        await this.setState({ isLoading: !this.state.isLoading });
    }

    

    render() {
        const values = {email:"",password:""}
        
        const {classes,openModal,handleCloseModal} = this.props;
        return (
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                keepMounted
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                className={classes.loginDialog}

            >
                <DialogContent>
                    <Link to="/"><Logo className={classes.logoLogin} /></Link>
                    <Box mt={8} className={classes.loginModalFooter}>

                        <Typography variant="h3" color="textSecondary" align="center">
                            Selamat datang kembali !
                        </Typography>
                    </Box>
                    <Divider />

                    <Formik
                        initialValues={values}
                        validationSchema={validationSchema}
                        onSubmit = {this.handleSubmitForm.bind(this,values)}

                    >
                        {props =>
                        <LoginForm
                            {...props}
                            responseAuthData={this.state.responseAuthData}
                            clickForgotPassword = {handleCloseModal}
                            isLoading = {this.state.isLoading}
                            
                        />}

                    </Formik>
                    <Box mt={8} className={classes.loginModalFooter}>
                        <Divider />
                        <br />
                        <Typography variant="body2" color="textSecondary" align="center">
                            {'Tidak Punya Akun? '}
                            <Link color="secondary" to="/register" onClick={handleCloseModal}>
                                Daftar Sekarang
                            </Link>{' '}

                            {'.'}
                        </Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        );
    }
}

LoginDialog.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(withStyles(styles)(LoginDialog));