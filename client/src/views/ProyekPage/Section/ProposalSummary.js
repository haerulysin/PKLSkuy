import React, { Component } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography
} from '@material-ui/core';

import {Skeleton} from '@material-ui/lab';

class ProposalSummary extends Component {

    render() {
        const numberFormatter = new Intl.NumberFormat("es-ES");

        const pBudget = [];
        this.props.proposalData.forEach(e => {
            pBudget.push(e.proposalBudget);
        });

        let avgBudget = pBudget.length ? (pBudget.reduce((p, c) => c += p)) / pBudget.length : null;
        return (
            <Card >
                <CardContent style={{padding:25}}>
                    <Grid container spacing={3} direction="column">
                        <Grid item>
                            <Typography variant="h6">Budget</Typography>
                            <Typography variant="body1">
                                {this.props.projectData._id ?
                                    'Rp. ' + numberFormatter.format(this.props.projectData.projectBudget[0]) + ' - ' + numberFormatter.format(this.props.projectData.projectBudget[1])
                                    :
                                    <Skeleton />
                                }
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Typography variant="h6">Jumlah Proposal</Typography>
                            <Typography variant="body1">{this.props.proposalData.length}</Typography>
                        </Grid>

                        <Grid item>
                            <Typography variant="h6">Rata - rata pengajuan</Typography>
                            <Typography variant="body1">{avgBudget ? "Rp. " + numberFormatter.format(avgBudget) : '-'}</Typography>
                        </Grid>
                        
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default ProposalSummary;