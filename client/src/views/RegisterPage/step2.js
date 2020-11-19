import React, { Component } from 'react';
import PropTypes from 'prop-types';

//FormHelpers
import { Formik } from 'formik';
import * as Yup from 'yup';

//Component
import FormStep2 from './Section/FormStep2';
//redux
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import {withRouter} from 'react-router-dom';

class step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step2RegisterErrors: ''
        };
    }

    componentDidMount(){
        if (!this.props.auth.userRegisterData.fullName){
           this.props.history.push('/register');
        }
    }
    static getDerivedStateFromProps(props,state){
        if(props.errors){
            return{
                step2RegisterErrors: props.errors.message
            }
        }

        return null;
    }

    handleRegisterSubmit(e, values) {
        let userData = this.props.auth.userRegisterData;
        userData.username = values.username;
        this.props.registerUser(userData,this.props.history);
        
    }


    render() {
        const values = {username: ''};
        const validationSchema = Yup.object({
            username: Yup.string('').required('Username wajib diisi')
        });

        return (
            <React.Fragment>
                <Formik
                    initialValues={values}
                    validationSchema = {validationSchema}
                    onSubmit = {this.handleRegisterSubmit.bind(this,values)}
                    
                >
                    {props =>
                        <FormStep2
                            {...props}
                            registerErrors={this.state.step2RegisterErrors}
                        />
                    }
                </Formik>
            </React.Fragment>
        );
    }
}
step2.propTypes = {
    auth:PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    registerUser : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    {registerUser}
)(withRouter(step2));