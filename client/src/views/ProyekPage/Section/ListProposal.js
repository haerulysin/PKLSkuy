import React, { Component } from 'react';
import {
    withStyles,
    Grid,
    Container,
    Card,
    CardContent,
    Button,
    Typography,
    CircularProgress
} from '@material-ui/core';

//Card
import ListProposalCard from './ListProposalCard';
import ProposalSummary from './ProposalSummary';

import {Link} from 'react-router-dom';

const styles = theme => ({
    root: {
        marginTop: 40,
    }
});

function ZeroProposal() {
    return (
        <Card style={{ height: 320, display: "flex", alignItems: "center", alignContent: "center", justifyContent: "center" }}>
            <CardContent style={{}}>
                <div style={{ textAlign: "center" }}>
                    <img
                        src={require("../../../assets/img/noreviewspict.png")}
                        width="100px"
                        alt="noReviews"
                    />
                    <br />
                    <Typography variant="h5" color="primary">Tidak ada proposal untuk proyek ini</Typography>
                </div>
            </CardContent>
        </Card>
    );
}

class ListProposal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPostProposal: false,
        }
    }

    handlePostingProposalDialog() {
        this.setState({ openPostProposal: !this.state.openPostProposal });
    }

    

    render() {
        if(!this.props.projectData._id){
            return(
                <div style={{display:'flex',justifyContent:'center',marginTop:200}}>
                    <CircularProgress />
                </div>
            )
        }
        const { classes, proposalData, auth } = this.props;
        const currentUserProposal = [];
        const otherProposal = [];
        const acceptedProposal = [];
        proposalData.forEach(prop => {
            if (prop.proposalBy._id === auth.user.id) {
                currentUserProposal.push(prop);
            }else if(prop.proposalAcceptedStatus){
                acceptedProposal.push(prop)
            }else {
                otherProposal.push(prop);
            }
        });
        return (
            <Container className={classes.root}>
                <Grid container spacing={4}>

                    <Grid item xs={12} md={9} container spacing={1} direction="column">
                        {acceptedProposal.length !== 0 && <Grid item><Typography variant="h4" gutterBottom>Proposal yang diterima</Typography></Grid>}
                        {acceptedProposal.length !== 0 ? (
                            acceptedProposal.map(proposal => (<Grid item key={proposal._id}><ListProposalCard key={proposal._id} handleAcceptProposal={this.props.handleAcceptProposal} {...this.props.projectData} {...proposal} history={this.props.history} match={this.props.match} /></Grid>))
                        ) : ''}


                        {currentUserProposal.length !== 0 && <Grid item><Typography variant="h4" gutterBottom>Proposal Saya</Typography></Grid>}
                        {currentUserProposal.length!==0?(
                            currentUserProposal.map(proposal => (
                            <Grid item key={proposal._id}>
                                <ListProposalCard 
                                    key={proposal._id}
                                    {...proposal}
                                    withEdit={true} 
                                    history={this.props.history} 
                                    match={this.props.match}
                                    handleAcceptProposal={this.props.handleAcceptProposal}
                                    handleDeleteProposal={this.props.handleDeleteProposal}
                                />
                            </Grid>))
                        ): ''}

                        <Grid item/>

                        {otherProposal.length !== 0 && <Grid item><Typography variant="h4" gutterBottom>Proposal Lainnya</Typography></Grid>}
                        {otherProposal.length!==0?(
                            otherProposal.map(proposal => (<Grid item key={proposal._id}><ListProposalCard key={proposal._id} handleAcceptProposal={this.props.handleAcceptProposal} {...this.props.projectData} {...proposal} history={this.props.history} match={this.props.match}/></Grid>))
                        ):''}
                        {(otherProposal.length === 0 && currentUserProposal.length === 0 && acceptedProposal.length === 0) && <ZeroProposal />}
                    </Grid>

                    <Grid item xs={12} md={3} container spacing={1} direction="column">
                        
                        {(this.props.projectData.postedBy._id!==this.props.auth.user.id) &&
                        
                            <Grid item>
                                <Card style={{ textAlign: 'center' }}>
                                    <CardContent>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            component={Link}
                                            to={'/proyek/'+this.props.projectData._id}

                                        
                                        >Ajukan Propsal</Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        }
                        

                        <Grid item>
                            <ProposalSummary {...this.props} />
                        </Grid>
                    </Grid>

                </Grid>
            </Container>
        );
    }
}

export default withStyles(styles)(ListProposal);