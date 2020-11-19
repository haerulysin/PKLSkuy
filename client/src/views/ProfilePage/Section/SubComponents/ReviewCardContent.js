import React, { Component } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Avatar,
    withStyles

} from '@material-ui/core';
import {Link} from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import moment from 'moment';

const styles = theme => ({
    root:{},
    judulProyek:{
        '&:hover':{
            color:'#FF7200',
            textDecoration:'underline'
        },
        color:'#000',
    }
});

class ReviewCardContent extends Component {
    render() {
        const {classes} = this.props;
        
        const diffReviewSubmitted = (moment(this.props.dateSubmitted,"YYYY-MM-DD").fromNow());
        const numberFormatter = new Intl.NumberFormat("es-ES");
        return (
            <Card style={{ borderRadius: '0px' }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={1} style={{ alignItems: 'center' }}>
                                <Grid item>
                                    <Typography variant="caption" style={{ background: '#FF7200', color: '#fff', padding: '2px 4px' }} >{parseFloat(this.props.rating.$numberDecimal).toFixed(1)}</Typography>
                                </Grid>
                                <Grid item style={{ flexGrow: 1 }}>
                                    <Rating
                                        precision={0.5}
                                        value={parseFloat(this.props.rating.$numberDecimal)}
                                        readOnly
                                        size="small"
                                        style={{ flexGrow: 1 }}
                                    />

                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        Rp. 
                                        {" "+numberFormatter.format(this.props.project.onProgress.proposalID.proposalBudget)}    
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Typography variant="h6" component={Link} to={"/proyek/"+this.props.project._id+"/details"} className={classes.judulProyek} target="_blank">
                                {this.props.project.projectName}
                            </Typography>
                            <Typography variant="body2">
                                {this.props.comments}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Avatar variant="rounded" style={{ width: 30, height: 30 }} src={process.env.PUBLIC_URL + '/assets/upload/'+this.props.from.biodata.photo}/>
                                </Grid>
                                <Grid item>
                                    <Grid container style={{ alignItems: 'flex-end', height: 30 }}>
                                        <Grid item><Typography variant="caption" style={{ marginRight: 5 }}>{this.props.from.fullName}</Typography></Grid>
                                        <Grid item><Typography variant="caption"> | {diffReviewSubmitted}</Typography></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card >
        );
    }
}

export default withStyles(styles)(ReviewCardContent);