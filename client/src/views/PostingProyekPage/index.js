import React, { Component } from 'react';
import {
    Grid,

} from '@material-ui/core';

import Header from './Section/Header';
import FormPosting from './Section/FormPostingProyek';
//FormHelper
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import PropTypes from 'prop-types';
//redux
import {connect} from 'react-redux';
import {postProject} from '../../redux/actions/projectListActions';
//MapsHelper


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoURL: [],
            uploadPercentage:0,
            isLoading: false,
            manualAddressInput:false,
            geoLocation:[],
        }

    }

    static getDerivedStateFromProps(props, state) {
        if(props.projectListState){
            return{
                isLoading: props.projectListState.isLoading
            }
        }
        return null;
    }

    componentDidMount(){
        if (!this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }
    }

    async handleOnAddPhoto(files) {
        const cdate = Date.now();
        var ext = files[0].name.split(".").slice(-1)[0];
        var ext2 = files[0].name.split("." + ext).slice(0)[0];
        var fileNames = (ext2 + '-' + cdate + "." + ext);
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('fileName', fileNames);

        try {
           await axios.post('/api/upload/files', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },

                onUploadProgress: progressEvent => {
                    this.setState({
                        uploadPercentage: parseInt(
                            Math.round((progressEvent.loaded * 100)) / progressEvent.total)
                    });
                    setTimeout(() => this.setState({ uploadPercentage: 0 }), 500);
                }
            });
        } catch (err) { console.log(err) };

        this.setState(prevState => ({
            photoURL: [...prevState.photoURL, fileNames]
        }));
        
    }

    async handleRemovePhoto(index) {
        let fileName = await this.state.photoURL[index]
        await this.setState({
            photoURL: this.state.photoURL.filter((_, i) => i !== index)
        });
        await axios.delete('/api/upload/removeFiles/'+fileName);
    }

    handlePostingSubmit(values) {
        values.projectBudget = [values.projectBudgetmin,values.projectBudgetmax]
        values.location = {'geoLocation': this.state.geoLocation, 'address': [values.addressFull, values.addressCity, values.addressProvince]}
        values.photoURL = this.state.photoURL;
        this.props.postProject(values,this.props.history)
    }

    handleOnPlaceSelected(e) {
        const {location}= e.geometry;
        this.setState({geoLocation: [location.lat(), location.lng()]})
        this.setState({manualAddressInput:true});
    }

    handleOnManualAddressInput(e){
        e.preventDefault();
        this.setState({manualAddressInput:true});
    }

    render() {
        const cDate = new Date();

        let cDateString = cDate.getFullYear() + '-' + ('0' + (cDate.getMonth() + 2)).slice(-2) + '-' + ('0' + cDate.getDate()).slice(-2)
        const values = { projectCategory: 1, projectName: '', projectDescription: '', projectDeadline: cDateString, projectBudgetmin: '', projectBudgetmax: '',addressFull: '', addressCity:'',addressProvince:''}
        const validationSchema = Yup.object({
            projectCategory: Yup.number(),
            projectBudgetmin: Yup.number().required('Dana minimum wajib diisi'),
            projectBudgetmax: Yup.number().required('Dana maksimum wajib diisi').moreThan(Yup.ref("projectBudgetmin"),"Dana maksimal harus lebih besar dari dana minimal"),
            projectName: Yup.string('').required('Nama proyek harus di isi'),
            projectDescription: Yup.string().min(20, 'Deskripsikan dengan jelas proyek anda').required('Deskripsikan proyek anda'),
            addressFull: Yup.string().required('Alamat lengkap harus diisi'),
            addressCity: Yup.string().required('Kota harus diisi'),
            addressProvince: Yup.string().required('Provinsi harus diisi'),
        });

        return (
            <Grid container direction="column">
                <Grid item>
                    <Header />
                </Grid>
                <Grid item style={{ marginTop: '-180px' }}>
                    <Formik
                        initialValues={values}
                        validationSchema={validationSchema}
                        onSubmit={this.handlePostingSubmit.bind(this)}
                    >
                        {props =>
                            <FormPosting
                                {...props}
                                {...this.state}
                                uploadPercentage={this.state.uploadPercentage}
                                handleOnAddPhoto={this.handleOnAddPhoto.bind(this)}
                                handleRemovePhoto={this.handleRemovePhoto.bind(this)}
                                handleOnPlaceSelected={this.handleOnPlaceSelected.bind(this)}
                                handleOnManualAddressInput={this.handleOnManualAddressInput.bind(this)}
                            />
                        }
                    </Formik>
                </Grid>
            </Grid>
        );
    }
}

index.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    postProject: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    projectListState: state.projectListState,
});

export default connect(
    mapStateToProps,
    {postProject}
)(index);