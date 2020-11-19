import React, { Component } from 'react';
import {
    withStyles,
    Grid,
    Card,
    CardContent,
    Avatar,
    Typography,
    Button,

} from '@material-ui/core';
//Rati
import Rating from '@material-ui/lab/Rating';

//MaterialUI ICOn
import MoreVertIcon from '@material-ui/icons/MoreVert';
import jwtDecode from 'jwt-decode';

const styles = theme => ({
    root: {},
    profilePictures: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    }
});
class ListProposalCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cUser: jwtDecode(localStorage.jwtToken)
        }
    }

    componentDidMount() {
    }
    handleEditClicked(e){
        e.preventDefault();
        this.props.history.push({
            pathname: '/proyek/'+this.props.match.params.id+'/details',
            state:{
                proposalID : this.props._id,
                proposalBudget: this.props.proposalBudget,
                proposalDescription: this.props.proposalDescription,
                proposalBy: this.props.proposalBy
            }
        })
    }
    render() {
        const {
            proposalBudget,
            proposalDescription,
            withEdit,
            classes

        } = this.props;
        const numberFormatter = new Intl.NumberFormat("es-ES");
        console.log(this.props)
        return (
            <Card>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={10} container spacing={1} direction="column">
                            <Grid item xs={12} container spacing={1}>
                                <Grid item>
                                    <Avatar className={classes.profilePictures} variant="rounded" />
                                </Grid>

                                <Grid item>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Grid container direction="row" spacing={1}>
                                                <Grid item>
                                                    <Typography variant="h5">{this.props.proposalBy.fullName}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item>
                                            <Grid container style={{ marginTop: 3 }}>
                                                <Grid item>
                                                    <Typography variant="caption" style={{ background: '#FF7200', color: '#fff', padding: '2px 8px' }} >0,0</Typography>
                                                </Grid>

                                                <Grid item>
                                                    <Rating
                                                        value={3.5}
                                                        precision={0.5}
                                                        size="small"
                                                        readOnly
                                                    />
                                                </Grid>

                                                <Grid item>
                                                    <Typography variant="caption"> (5 Reviews)</Typography>
                                                </Grid>

                                                <Grid item style={{ paddingLeft: 8 }} >
                                                    <Typography variant="caption" style={{ flexGrow: 1 }}> 100% Completion</Typography>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <Typography variant="body2">{proposalDescription}</Typography>

                            </Grid>
                        </Grid>

                        <Grid item xs={2} container direction="column" style={{ textAlign: 'right' }}>
                            <Grid item>
                                <MoreVertIcon fontSize="small" style={{ color: '#999' }} />
                            </Grid>

                            <Grid item>
                                <Typography variant="h5">Rp. {numberFormatter.format(proposalBudget)}</Typography>
                            </Grid>
                        </Grid>
                        {withEdit &&
                            <Grid item xs={12} container spacing={2}>
                                <div style={{ flexGrow: 1 }}></div>
                            <Grid item><Button variant="contained" color="inherit" size="small" onClick={(e) => this.props.handleDeleteProposal(e,this.props._id)} >Hapus Proposal</Button></Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" size="small"
                                        onClick={this.handleEditClicked.bind(this)}
                                    >
                                        Edit
                                    </Button>
                                </Grid>
                            </Grid>
                        }

                        {((this.state.cUser.id === this.props.projectID.postedBy) && !this.props.onProgress.status) &&
                            <Grid item xs={12} container>
                                <div style={{ flexGrow: 1 }}></div>
                            <Button variant="contained" color="primary" size="small" onClick={(e) => this.props.handleAcceptProposal(e, this.props._id, this.props.proposalBy._id)}>Setujui Proposal</Button>
                            </Grid>
                        }
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(ListProposalCard);