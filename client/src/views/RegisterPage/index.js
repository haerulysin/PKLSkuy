import React, { Component } from 'react';
import PropTypes from 'prop-types';
//redux
import {connect} from 'react-redux';
import { registerUser, checkAvailableEmail} from '../../redux/actions/authActions';
//Form helper
import * as Yup from 'yup';
import { Formik } from 'formik';
//Component
import TopNav from './Section/TopNav';
import FormRegister from './Section/FormRegister';

import { withRouter } from 'react-router-dom';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerErrors: '',
            isLoading:false,
        }
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.errors) {
            return {
                registerErrors: props.errors.message
            };
        }

        return null;
    }
    
    async handleRegisterSubmit(e,values){
        await this.setState({isLoading:true});
        if (this.props.errors.status === 0) {
            await this.setState({ registerErrors: '' })
        }
        values.email = await values.regemail;
        await this.props.checkAvailableEmail(values,this.props.history);
        await this.setState({ isLoading: false });

    }
    
    render() {

        const values = { fullName: "", regemail:"",password:"",password2:""}
        const validationSchema = Yup.object({
            regemail: Yup.string("").email("Masukkan email valid").required("Masukkan email"),
            password: Yup.string("").min(8, "Password minimal 8 karakter").required("Password harus di isi"),
            fullName: Yup.string("").required("Masukkan nama lengkap"),
            password2: Yup.string("").required("Konfirmasi password").min(3, "Password minimal 8 karakter").oneOf([Yup.ref("password")], "Password tidak cocok"), 
        });
        return (
            <div style={{background:'#fff'}}>
                <TopNav/>
                <Formik
                    initialValues = {values}
                    
                    validationSchema = {validationSchema}
                    onSubmit={this.handleRegisterSubmit.bind(this,values)}
                >
                    {props => 
                        <FormRegister {...props} isLoading={this.state.isLoading} registerErrors={this.state.registerErrors} />
                    }
                </Formik>
            </div>
        );
    }
}
index.propTypes = {
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    checkAvailableEmail: PropTypes.func.isRequired,
}

const mapStateProps = state =>({
    auth:state.auth,
    errors : state.errors,
});

export default connect(
    mapStateProps,
    { registerUser,checkAvailableEmail}
)(withRouter(index));