import React, { Component } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Slide,
    TextField,
    Grid,
    Typography,
    Avatar,
    withStyles, DialogActions, Button

} from '@material-ui/core';

import Rating from '@material-ui/lab/Rating';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const styles = theme => ({
    root: {
    },

    formWrapper: {
        width: 350,
    }
});

class UserReviewDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentReview: '',
            ratingValue: 5,
        }

    }

    handleCommentChange(e) {
        this.setState({ commentReview: e.target.value })
    }

    handleStarChange(e) {
        this.setState({ ratingValue: parseFloat(e.target.value) })
    }

    handleSubmitReview() {
        this.props.handleSubmitReview(this.state);
    }
    render() {
        console.log(this.props.workersData)
        if (!this.props.workersData.proposalBy) {
            return null;
        }
        const {
            classes,
            openDialog,
            handleCloseReview,
            workersData
        } = this.props

        return (
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseReview}
            >

                <DialogTitle>{"Umpan Balik pekerja"}</DialogTitle>
                <DialogContent >
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignContent="center"
                        alignItems="center"
                        spacing={1}

                    >
                        <Grid item xs={12}>
                            <Avatar
                                style={{ width: 70, height: 70 }}
                                src={
                                    !workersData.proposalBy.biodata ? '' :
                                        process.env.PUBLIC_URL + "/assets/upload/" + workersData.proposalBy.biodata.photo

                                }

                            />

                        </Grid>
                        <Grid item style={{ textAlign: 'center' }}>
                            <Typography variant="h4" color="primary">{workersData.proposalBy.fullName}</Typography>
                            <Typography variant="caption" color="inherit" gutterBottom>Berikan rating kepada pekerja ini.</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Rating
                                name="ratingUser"
                                defaultValue={5} size="large"
                                precision={0.5}
                                onChange={this.handleStarChange.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.formWrapper}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                variant="outlined"
                                placeholder="Berikan komentar"
                                onChange={this.handleCommentChange.bind(this)}
                            />
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={handleCloseReview}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={this.handleSubmitReview.bind(this)}
                    >
                        Simpan
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(UserReviewDialog);