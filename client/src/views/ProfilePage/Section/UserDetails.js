import React, { Component } from 'react';
import{
    withStyles,
    Grid,
    Card,
    CardContent,
    Avatar,
    Typography,
    Divider,
    Button,
} from '@material-ui/core';

import {Rating,Skeleton} from '@material-ui/lab/';
//MaterialUI Icon
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import dateFormat from 'dateformat';

const styles = theme=>({
    root:{

    },

    photoProfile:{
        backgroud: '#ddd',
        position:'static',
    },
    profileImg: {
        height: '220px',
        width: '220px',
    },
    editProfileBtn:{
        padding:'3px 20px'
    },

    
});

function SkeletonLoadings() {
    return(
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
            openPopperPhoto: false
        }
        this.anchorEl = null;
    }
    
    handleChangePhotoClick(e){
        this.anchorEl = e.currentTarget;
        this.setState({openPopperPhoto:true})
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
                                    <div className={classes.photoProfile}>
                                        <Avatar variant="rounded" className={classes.profileImg} src={process.env.PUBLIC_URL + '/assets/upload/' + userData.biodata.photo} />
                                    </div>
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

                                    {this.props.auth.user.id===this.props.match.params.id &&
                                        <Grid item xs={6} style={{ textAlign: "right" }}>
                                            <Button variant="contained" color="primary" className={classes.editProfileBtn} onClick={this.props.toggleEditProfile}>Edit</Button>
                                        </Grid>
                                    }
                                    
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={1} style={{ alignItems: 'center' }}>
                                        <Grid item>
                                            <Typography variant="body1" style={{ background: '#999', color: '#fff', padding: '0px 8px' }} >0,0</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Rating
                                                value={3}
                                                readOnly
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body1">{0} Ulasan</Typography>

                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}> </Grid>
                                        <Grid item xs={6}>
                                            <Grid container>
                                                <Grid item xs={2}>
                                                    <Typography variant="h5" color="primary">{userData.reputation ? userData.reputation.worksCompleted : '0'}</Typography>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Typography variant="h5">Pekerjaan Selesai</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Grid container>
                                                <Grid item xs={2}>
                                                    <Typography variant="h5" color="primary">{userData.reputation ? userData.reputation.worksCompleted : "0"}%</Typography>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Typography variant="h5">Pekerjaan Tepat Waktu</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Divider />

                                </Grid>
                                <Grid item>
                                    <Typography variant="caption" >
                                        {userData.biodata.about}
                                    </Typography>
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