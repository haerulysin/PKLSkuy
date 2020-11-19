import React, { Component } from 'react';
import {
    withStyles,
    Grid,
    Card,
    CardContent,
    Avatar,
    Typography,
    Button,
    TextField,
    Badge,
    Popper,
    Paper,
    Box
} from '@material-ui/core';

import { Skeleton } from '@material-ui/lab/';
//MaterialUI Icon
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import dateFormat from 'dateformat';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import PublishIcon from '@material-ui/icons/Publish';
import Dropzone from 'react-dropzone';


const styles = theme => ({
    root: {

    },

    photoProfile: {
        backgroud: '#ddd',
        position: 'static',
    },
    profileImg: {
        height: '220px',
        width: '220px',
    },
    editProfileBtn: {
        padding: '3px 20px',
        marginLeft: 20,
    },
    dragndropzone: {
        textAlign: 'center',
        background: '#ddd',
        border: '1px dashed #000',
        padding: 15,
        zIndex: 1001,
    },

    popperContent: {
        padding: '20px 12px',
        border: 0,
        width: 300,
        marginLeft: 10,
    }

});

function SkeletonLoadings() {
    return (
        <Card>
            <CardContent>
                <Grid container>
                    <Grid item xs={4}>
                        <Grid container direction="column" spacing={1} style={{ marginLeft: '10px' }}>
                            <Grid item>
                                <Skeleton variant="rect" width={220} height={220} />
                            </Grid>
                            <br />
                            <Grid item>
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={8}>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />

                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopperPhoto: false,
            profilePhoto: [],
        }
        this.anchorEl = null;
    }

    handleChangePhotoClick(e) {
        this.anchorEl = e.currentTarget;
        this.setState({ openPopperPhoto: true })
    }

    handleOnDropPhoto(acceptedFiles) {
        this.setState({ profilePhoto: acceptedFiles });
    }

    handleChangePhotProfile(e){
        this.props.handleOnAddPhoto(e,this.state.profilePhoto);
    }

    render() {
        if (!this.props.userData._id) {
            return (
                SkeletonLoadings()
            );
        }

        const { userData, classes } = this.props;
        return (
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={4}>
                            <Grid container direction="column" spacing={1} style={{ marginLeft: '10px' }}>


                                <Grid item>
                                    <Badge
                                        overlap="circle"
                                        badgeContent={
                                            <Button color="inherit" variant="contained" style={{ padding: '3px 1px', marginRight: 10 }} onClick={this.handleChangePhotoClick.bind(this)}><CameraAltIcon fontSize="small" /></Button>
                                        }

                                    >
                                        <div className={classes.photoProfile}>
                                            <Avatar variant="rounded" className={classes.profileImg} src={process.env.PUBLIC_URL + '/assets/upload/' + userData.biodata.photo}/>
                                        </div>
                                    </Badge>
                                    <Popper open={this.state.openPopperPhoto} anchorEl={this.anchorEl} transition placement="right-start">
                                        <Paper className={classes.popperContent}>
                                            <Grid container direction="column" spacing={0}>
                                                <Grid item><Typography variant="h4">Ganti foto Profil</Typography></Grid>
                                                <Grid item><Typography variant="caption" gutterBottom>Disarankan menggunakan rasio 1:1</Typography></Grid>
                                                <Grid item style={{ marginTop: 10 }}>
                                                    {this.state.profilePhoto.length === 0 ? (
                                                        <Dropzone className={classes.dragndropzone} onDrop={this.handleOnDropPhoto.bind(this)}>
                                                            {({ getRootProps, getInputProps }) => (
                                                                <Box {...getRootProps({ className: 'dropzone' })}>
                                                                    <Box className={classes.dragndropzone}>
                                                                        <input {...getInputProps()} />
                                                                        <PublishIcon /><br />
                                                                        <Typography variant="caption">Click atau drop foto anda disini.</Typography>
                                                                    </Box>
                                                                </Box>
                                                            )}
                                                        </Dropzone>
                                                    ) : (
                                                            <Grid
                                                                container
                                                                spacing={0}
                                                                direction="column"
                                                                alignItems="center"
                                                                justify="center"
                                                            >
                                                                <Grid item xs={12}>
                                                                    <img alt="MAMA" src={URL.createObjectURL(this.state.profilePhoto[0])} width="180px" height="180px" />

                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Button fullWidth variant="contained" color="inherit" size="small" onClick={this.handleChangePhotProfile.bind(this)}>Ganti Foto Profil</Button>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <a href=" " onClick={(e) => { e.preventDefault();this.setState({profilePhoto:[]}) }}>Batalkan dan ganti gambar</a>
                                                                </Grid>
                                                            </Grid>
                                                        )}
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Popper>
                                </Grid>
                                <br />
                                <Grid item>
                                    <Grid container direction="row" spacing={1}>
                                        <Grid item><CalendarTodayIcon fontSize="small" /></Grid>
                                        <Grid item><Typography variant="caption" component="h2" gutterBottom>Bergabung pada {dateFormat(userData.joinedOn, "dd mmm yyyy")}</Typography></Grid>
                                    </Grid>

                                    <Grid container direction="row" spacing={1}>
                                        <Grid item><LocationCityIcon fontSize="small" /></Grid>
                                        <Grid item><Typography variant="caption" component="h2" gutterBottom>Purwokerto, Jawa Tengah</Typography></Grid>
                                    </Grid>

                                    <Grid container direction="row" spacing={1}>
                                        <Grid item><ThumbUpAltIcon fontSize="small" /></Grid>
                                        <Grid item><Typography variant="caption" component="h2" gutterBottom>0 Rekomendasi</Typography></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={8}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} container>
                                    <Grid item xs={6}>
                                        <Typography variant="h3">
                                            {userData.auth ? '@' + userData.auth.username : '-'}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom style={{ flexGrow: 1 }}>{userData.fullName}</Typography>
                                    </Grid>

                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" >
                                        <TextField
                                            multiline
                                            rows={8}
                                            fullWidth
                                            variant="outlined"
                                            id="aboutProfiles"
                                            name="aboutProfiles"
                                            value={this.props.aboutProfiles}
                                            onChange={this.props.onChange}
                                        />
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} style={{ textAlign: 'right' }}>
                                    <Button variant="outlined" color="inherit" className={classes.editProfileBtn} onClick={this.props.toggleEditProfile}>Batal</Button>
                                    <Button variant="contained" color="primary" className={classes.editProfileBtn} onClick={this.props.onSubmit}>Simpan</Button>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(UserDetails);