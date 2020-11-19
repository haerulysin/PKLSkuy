import React, { Component } from 'react';
import {
    withStyles,
    Container,
    Grid
} from '@material-ui/core';
//Components
import UserDetails from './UserDetails';
import UserDetailsEdit from './UserDetailsEdit';
import UserVerificationDetails from './UserVerificationDetails';
import UserReviewDetails from './UserReviews';
import axios from 'axios';
const styles = theme => ({
    root: {

    },

});

class ProfileContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            editProfiles: false,
            aboutProfiles: '',
            photoProfiles: '',
            uploadPercentage: 0,
        }

    }
    async getUserData() {
        let userID = this.props.match.params.id;
        let res = await axios.get('/api/users/' + userID);

        return await res;
    }

    async componentDidMount() {
        await this.getUserData()
            .then(res => this.setState({ userData: res.data }))
            .catch(err => console.log(err));

        this.setState({ aboutProfiles: this.state.userData.biodata.about })
    }

    handleOnChange(e) {
        this.setState({ aboutProfiles: e.target.value });

    }

    async handleOnAddPhoto(e,files) {
        e.preventDefault();
        e.stopPropagation();
        var ext = files[0].name.split(".").slice(-1)[0];
        var fileNames = (this.state.userData._id + "." + ext);
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
        let userData = await {
            biodata: {
                about: this.state.aboutProfiles,
                photo: fileNames,
            }
        };

        if(this.state.uploadPercentage===100){
            await this.props.updateUser(userData);
            await this.toggleEditProfile();
            await window.location.reload();
        }
    }

    async handleOnSubmit(e) {
        let userData = await {
            biodata: {
                about: this.state.aboutProfiles,
            }
        };

        await this.props.updateUser(userData);
        await this.toggleEditProfile();
        await window.location.reload();
    }

    toggleEditProfile() {
        this.setState({ editProfiles: !this.state.editProfiles });
    }



    render() {
        return (
            <Container>
                <Grid container spacing={3} style={{ marginTop: 20 }}>
                    <Grid item md={9} xs={12}>
                        {this.state.editProfiles ?
                            <UserDetailsEdit
                                {...this.state}
                                {...this.props}
                                onChange={this.handleOnChange.bind(this)}
                                onSubmit={this.handleOnSubmit.bind(this)}
                                toggleEditProfile={this.toggleEditProfile.bind(this)}
                                handleOnAddPhoto={this.handleOnAddPhoto.bind(this)}
                            />
                            :
                            <UserDetails {...this.state} {...this.props} toggleEditProfile={this.toggleEditProfile.bind(this)} />
                        }
                    </Grid>

                    <Grid item md={3} xs={12}>
                        <UserVerificationDetails {...this.state} />
                    </Grid>
                    <Grid item md={9} xs={12}>
                        <UserReviewDetails userID={this.props.match.params.id} />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}



export default (withStyles(styles)(ProfileContent));