import React, { Component } from 'react';
import { Backdrop, Container, Grid, CircularProgress } from '@material-ui/core';
import SideBar from './Section/SideBar';
import ProfileDetails from './Section/ProfileDetails';
import EmailDetails from './Section/EmailDetails';
import PasswordDetails from './Section/PasswordDetails';
import VerifikasiDetails from './Section/VerifikasiDetails';
import PropTypes from 'prop-types';
//FormHelper
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
//redux
import { connect } from 'react-redux';
import { getCurrentUser, getCurrentAuthenticated } from '../../redux/actions/authActions';
import { updateUser, updatePassword } from '../../redux/actions/userActions';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionValue: 2,
            userData: {},
            isLoading: false,
            updateStatusMessage: {}
        }
    }

    async componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            await this.props.history.push('/');
        } else {
            await this.props.getCurrentUser();
        }

    }

    static getDerivedStateFromProps(props, state) {

        if (props.auth.userCurrentData) {
            return {
                userData: props.auth.userCurrentData,
            }
        }

        return;
    }

    handleSideBar(e, nVal) {
        this.setState({ sectionValue: nVal });
        this.setState({ updateStatusMessage: {} });
    }


    async handleUpdateProfile(values) {
        await this.setState({ isLoading: true });
        const data = await {
            fullName: values.fullName,
            address: {
                address1: values.address1,
                city: values.city,
                postalCode: values.postalCode,
                province: values.province,

            }
        };

        await this.props.updateUser(data);
        await this.setState({
            updateStatusMessage: {
                open: true,
                success: true,
                message: 'Data profil berhasil diupdate'
            },
        });

        await this.setState({ isLoading: false });
        //this.handleCloseAlert();


    }

    async handleUpdateEmail(values) {
        await this.setState({ updateStatusMessage: { open: false } })
        await this.setState({ isLoading: true });
        const data = await {
            email: values.email,
            auth: { password: values.password },
            regemail: values.email,
        };
        console.log(this.state)
        await this.checkAvailableEmail(data);
        await this.setState({ isLoading: false });
    }

    async handleUpdatePassword(values) {
        await this.checkCurrentPassword(values);
    }

    handleCloseAlert(e) {

        this.setState({ updateStatusMessage: { open: false } })

    }


    checkCurrentPassword(values) {
        let dataToUpdate = values;

        axios.patch('/api/users/changePassword/', dataToUpdate)
            .then(res => {
                this.setState({
                    updateStatusMessage: {
                        open: true,
                        success: true,
                        message: 'Password berhasil diupdate'
                    },
                });

                //this.props.updateUser(data);
            })
            .catch(err => {
                this.setState({
                    updateStatusMessage: {
                        open: true,
                        sucess: false,
                        message: 'Password lama salah !'
                    }
                })
            });
    }

    checkAvailableEmail(currentData, data) {
        axios.post('/api/users/checkAvailableEmail', data)
            .then(res => {
                this.setState({
                    updateStatusMessage: {
                        open: true,
                        success: true,
                        message: 'Email berhasil diupdate'
                    },
                });

                this.props.updateUser(data);
            })
            .catch(err => {
                this.setState({
                    updateStatusMessage: {
                        open: true,
                        sucess: false,
                        message: 'Email sudah terdaftar'
                    }
                })
            });
    }



    render() {
        if (!this.state.userData._id) {
            this.props.getCurrentUser();
            return (
                <Backdrop open={true} style={{ zIndex: '1000' }}><CircularProgress size={120} /></Backdrop>

            );
        }

        const { address } = this.state.userData;
        const values = {
            id: this.state.userData._id,
            fullName: this.state.userData.fullName,
            address1: address.address1,
            city: address.city,
            province: address.province,
            postalCode: address.postalCode,
            phoneNumber: this.state.userData.phoneNumber,
            email: this.state.userData.email,
            password: '',
            currentPassword: '',
            password2: '',

        };

        const validationSchema = Yup.object().shape({
            fullName: Yup.string().required('Nama lengkap wajib diisi'),
            address1: Yup.string().required('Alamat wajib diisi'),
            city: Yup.string().required('Kota wajib diisi'),
            province: Yup.string().required('Provinsi wajib diisi'),
            postalCode: Yup.string().required('Kode Pos wajib diisi'),
        });

        const validationSchema2 = Yup.object({
            email: Yup.string().required('Kode Pos wajib diisi').email('Email tidak valid'),
        });

        const passwordValidationSchema = Yup.object({
            currentPassword: Yup.string().required('Password sekarang wajib diisi').min(8, 'Password minimal 8 karakter'),
            password: Yup.string().required('Password baru wajib diisi').min(8, 'Password baru minimal 8 karakter'),
            password2: Yup.string().required('Konfirmasi password baru wajib diisi').min(8, 'Password baru minimal 8 karakter').oneOf([Yup.ref("password")], "Password tidak cocok"),
        });

        return (
            <React.Fragment>
                <Container style={{ marginTop: 30 }} spacing={1} >
                    <Grid container>
                        <Grid item xs={3}>
                            <SideBar
                                sectionValue={this.state.sectionValue}
                                handleSideBar={this.handleSideBar.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={9} style={{ background: '#fff' }}>

                            {this.state.sectionValue === 0 &&
                                <Formik
                                    initialValues={values}
                                    enableReinitialize={true}
                                    validationSchema={validationSchema}
                                    isLoading={this.state.isLoading}
                                    onSubmit={this.handleUpdateProfile.bind(this)}
                                >
                                    {props =>
                                        <ProfileDetails {...props} isLoading={this.state.isLoading} handleCloseAlert={this.handleCloseAlert.bind(this)} updateStatusMessage={this.state.updateStatusMessage} />
                                    }
                                </Formik>
                            }
                            {this.state.sectionValue === 1 &&
                                <Formik
                                    initialValues={values}
                                    validationSchema={validationSchema2}
                                    enableReinitialize={true}
                                    onSubmit={this.handleUpdateEmail.bind(this)}
                                    isLoading={this.state.isLoading}
                                    updateStatusMessage={this.state.updateStatusMessage}


                                >
                                    {props =>
                                        <EmailDetails
                                            {...props}
                                            updateStatusMessage={this.state.updateStatusMessage}
                                            isLoading={this.state.isLoading}
                                            handleCloseAlert={this.handleCloseAlert.bind(this)}
                                        />
                                    }
                                </Formik>
                            }

                            {this.state.sectionValue === 2 &&
                                <Formik
                                    initialValues={values}
                                    validationSchema={passwordValidationSchema}
                                    enableReinitialize={true}
                                    onSubmit={this.handleUpdatePassword.bind(this)}
                                >
                                    {props =>
                                        <PasswordDetails
                                            {...props}
                                            updateStatusMessage={this.state.updateStatusMessage}
                                            isLoading={this.state.isLoading}
                                            handleCloseAlert={this.handleCloseAlert.bind(this)}
                                        />
                                    }
                                </Formik>
                            }
                            {this.state.sectionValue === 3 && <VerifikasiDetails />}
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

index.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    getCurrentAuthenticated: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});
export default connect(
    mapStateToProps,
    { getCurrentUser, updateUser, getCurrentAuthenticated, updatePassword }
)(index);