import React, { Component } from 'react';
import { Grid, Container, Backdrop, CircularProgress, } from '@material-ui/core';

//form
import * as Yup from 'yup';
import { Formik } from 'formik';

//Component
import TentangPekerja from './TentangPekerja';
import PostingProyek from './PostingProposalProyek';
import MapProyek from './MapProyek'
import RincianProyek from './RincianProyek';
import ProjectLockedCard from './CustomComponent/ProjectLockedCard';


class contentProyek extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limitProposalPost: false,
            isLoading: false,
        }
    }

    componentDidMount() {
    }

    static getDerivedStateFromProps(props, state) {
        if (props.proposalData !== null) {
            let limits = false;
            props.proposalData.forEach((item) => {
                if (props.auth.user.id === item.proposalBy._id) {
                    limits = true
                }
            })

            return {
                limitProposalPost: limits,
            }
        }


        return null;
    }


    async handleSubmitProposal(values) {
        this.props.postProposal(values);
        this.props.getProposalByProjectID(this.props.match.params.id);
        this.props.history.push('/proyek/' + this.props.match.params.id + '/proposal')
    }

    async handleUpdateProposal(values) {
        await this.setState({ isLoading: true });
        await this.props.updateProposal(values);
        await this.setState({ isLoading: false });
        this.props.getProposalByProjectID(this.props.match.params.id);
        this.props.history.push('/proyek/' + this.props.match.params.id + '/proposal')

    }


    render() {
        if (!this.props.projectData._id) {
            return (
                <Backdrop open={true} style={{ zIndex: 1000, background: '#fff' }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )

        }
        const { projectBudget } = this.props.projectData;
        const numberFormatter = new Intl.NumberFormat("es-ES");
        let values = { projectID: this.props.projectData._id, proposalBudget: '', proposalDescription: '' }
        const validationSchema = Yup.object({
            proposalBudget: Yup.number().required('Biaya proyek wajib diisi').moreThan((projectBudget[0]) - 1, 'Biaya harus lebih atau sama dengan ' + numberFormatter.format(projectBudget[0])).lessThan(projectBudget[1] + 1, 'Biaya harus lebih atau sama dengan ' + numberFormatter.format(projectBudget[1])),
            proposalDescription: Yup.string().required('Deskripsi proposal wajib diisi').min(30, 'Deskripsi propsal minimal 30 karakter')
        });

        if (this.props.location.state !== undefined) {
            let locationState = this.props.location.state;
            values = locationState;
        }

        let visitorIsPosted = this.props.auth.user.id === this.props.projectData.postedBy._id ? true : false;
        return (
            <React.Fragment>
                <Container style={{ marginTop: 30 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} container spacing={1}>
                            <Grid item xs={12}>
                                <RincianProyek {...this.props} />
                            </Grid>
                            
                            {(this.state.limitProposalPost) && (this.props.auth.isAuthenticated && visitorIsPosted) ? '' : (

                                <Grid item xs={12}>
                                    <Formik
                                        initialValues={values}
                                        validationSchema={validationSchema}
                                        onSubmit={this.handleSubmitProposal.bind(this)}

                                    >
                                        {props =>
                                            <PostingProyek {...props} />
                                        }
                                    </Formik>
                                </Grid>)
                            }

                            {(this.props.projectData.onProgress.status && !visitorIsPosted) ?(
                                <Grid item xs={12}>
                                    <ProjectLockedCard />
                                </Grid>):(
                                    (this.state.limitProposalPost) && (this.props.auth.isAuthenticated && visitorIsPosted) &&
                                    <Grid item xs={12}>
                                        <Formik
                                            initialValues={values}
                                            validationSchema={validationSchema}
                                            onSubmit={this.handleSubmitProposal.bind(this)}

                                        >
                                            {props =>
                                                <PostingProyek {...props} />
                                            }
                                        </Formik>
                                    </Grid>
                                )
                            }



                            {this.props.location.state !== undefined && (
                                <Grid item xs={12}>
                                    <Formik
                                        initialValues={values}
                                        validationSchema={validationSchema}
                                        onSubmit={this.handleUpdateProposal.bind(this)}


                                    >
                                        {props =>
                                            <PostingProyek {...props} btnPlaceholder="Update Proposal" projectListState={this.state.isLoading} />
                                        }
                                    </Formik>
                                </Grid>
                            )

                            }

                        </Grid>

                        <Grid item xs={12} md={4} container spacing={1}>
                            <Grid item xs={12}>
                                <MapProyek {...this.props.projectData.location} />
                            </Grid>
                            <Grid item xs={12}>
                                <TentangPekerja {...this.props.projectData.postedBy} />
                            </Grid>


                        </Grid>

                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

export default contentProyek;