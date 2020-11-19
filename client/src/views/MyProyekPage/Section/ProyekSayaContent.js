import React, { Component } from 'react';
import {
    withStyles,
    Grid,
    Typography,
} from '@material-ui/core';
import MyProjectTabs from './Component/MyProjectTabs';
import MyProjectFilter from './Component/MyProjectFilter';
import ProjectTable from './Component/ProjectTable2';
import TableButton from './Component/ProjectTableButton';
import TableButton2 from './Component/ProjectTableButton2';
import UserReviewDialog from './Component/UserReviewDialog';
import axios from 'axios';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {

    },

    MyProjectHeader: {
        marginBottom: 50
    },

    tableProjectName: {
        '&:hover': {
            color: '#fa9543',
            textDecoration: 'underline'
        },

        fontWeight: 500,
        color: '#FF7200'

    }


});


const kategoriProyekString = ['', 'Perbaikan dan Instalasi', 'Renovasi dan Bangun', 'Desain dan Perencanaan'];

class ProyekSayaContent extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            rowsPage: 10,
            pageVal: 0,
            projectData: [],
            proposalData: [],
            openReviewUserDialog: false,
            workersProjectData: [],
        }
    }

    componentDidMount() {
        if (this.props.auth) {
            this.getInitData();
        }
    }

    componentWillUnmount() {
        this.setState({ projectData: [] })
    }

    async getInitData() {
        await axios.get('/api/projectList/byCurrentUser')
            .then(data => this.setState({ projectData: data.data }))
            .catch(err => console.log(err));

        await axios.get('/api/proposal/byCurrentUser')
            .then(data => this.setState({ proposalData: data.data.data }))
            .catch(err => console.log(err));
    }

    handleChangeTable(e, nValue) {
        this.setState({ pageVal: nValue });
    }

    handleSearchForm(e) {
        this.setState({ searchText: e.target.value });
    }
    handleChangeRowsPage(e) {
        this.setState({ rowsPage: e.target.value });
        console.log(this.state.rowsPage);
    }


    handleDeleteProject(e) {
        console.log(e)
    }


    async handleGiveReviewBtn(e, values) {

        let propsData = [];
        await this.state.projectData.forEach(item => {
            if (item._id === values) {
                propsData = item;
            }
        });
        await axios.get('/api/proposal/getByID/' + propsData.onProgress.proposalID._id)
            .then(res => {
                this.setState({ workersProjectData: res.data.data });
            })
            .catch(err => console.log(err));

        await this.setState({ openReviewUserDialog: true });
    }

    handleCloseReview() {
        this.setState({ openReviewUserDialog: false });
    }

    async handleSubmitReview(values) {
        await this.handleCloseReview();
        let postReviewData = await {
            to: this.state.workersProjectData.proposalBy._id,
            from: this.props.auth.user.id,
            comments: values.commentReview,
            rating: values.ratingValue,
            project: this.state.workersProjectData.projectID._id
        };
        let projectUpdateData = await {
            _id: this.state.workersProjectData.projectID._id,
            projectDoneStatus: true,
        }
        await axios.post('/api/userReview', postReviewData)
            .then(res => {
                axios.patch('/api/projectList/', projectUpdateData)
                    .then(res => { window.location.reload() })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));




    }

    handleChatButton(e) {
        console.log(e)
    }


    render() {
        const { classes } = this.props;
        const projectData = [];
        const listProjectOnProgress = [];
        const listProjectDone = [];
        this.state.projectData.forEach(pdata => {
            if (!pdata.onProgress.status && !pdata.projectDoneStatus) {
                projectData.push({
                    judulproyek: <Link to={"/proyek/" + pdata._id} target="_blank" className={classes.tableProjectName}>{pdata.projectName}</Link>,
                    jenisproyek: kategoriProyekString[pdata.projectCategory],
                    lokasipekerjaan: pdata.location.address[1],
                    aksi: <TableButton2 projectId={pdata._id} handleGiveReviewBtn={this.handleGiveReviewBtn.bind(this)} />
                });
            } else if (pdata.projectDoneStatus) {
                listProjectDone.push({
                    judulproyek: <Link to={"/proyek/" + pdata._id} target="_blank" className={classes.tableProjectName}>{pdata.projectName}</Link>,
                    jenisproyek: kategoriProyekString[pdata.projectCategory],
                    lokasipekerjaan: pdata.location.address[1],
                    aksi: <TableButton2 projectId={pdata._id} handleGiveReviewBtn={this.handleGiveReviewBtn.bind(this)} />
                });
            } else {
                listProjectOnProgress.push({
                    judulproyek: <Link to={"/proyek/" + pdata._id} target="_blank" className={classes.tableProjectName}>{pdata.projectName}</Link>,
                    jenisproyek: kategoriProyekString[pdata.projectCategory],
                    lokasipekerjaan: pdata.location.address[1],
                    aksi: <TableButton projectId={pdata._id} handleGiveReviewBtn={this.handleGiveReviewBtn.bind(this)} />
                });
            }
        });
        const proposalStatus = (propsData) => {

            if (propsData.proposalAcceptedStatus) {
                return "Proposal disetujui";
            } else if (!propsData.proposalAcceptedStatus && propsData.projectID.onProgress.status) {
                return "Proposal ditolak"
            } else if (!propsData.projectID.onProgress.status) {
                return "Menunggu Konfirmasi";
            }

        };
        const proposalData = [];


        this.state.proposalData.forEach(pdata => {
            proposalData.push({
                judulproyek: <Link to={'/proyek/' + pdata.projectID._id} target="_blank" className={classes.tableProjectName}>{pdata.projectID.projectName}</Link>,
                pemilikproyek: <Link to={'/u/' + pdata.proposalBy._id} target="_blank" className={classes.tableProjectName}>{pdata.proposalBy.fullName}</Link>,
                lokasipekerjaan: pdata.projectID.location.address[1],
                status: proposalStatus(pdata),
                aksi: <TableButton2 handleChatButton={this.handleChatButton.bind(this)} />
            })
        });


        const renderDataSwitch = (values) => {
            switch (values) {
                case 0:
                    return projectData;
                case 1:
                    return proposalData;
                case 2:
                    return listProjectOnProgress;
                case 3:
                    return listProjectDone;
                default:
                    return null;
            }
        }


        return (
            <React.Fragment>
                <Grid container direction="column" >
                    <Grid item className={classes.MyProjectHeader}>
                        <Typography variant="h2" gutterBottom>Proyek dan Proposal</Typography>
                    </Grid>

                    <Grid item style={{ background: '#' }}>
                        <MyProjectTabs
                            pageVal={this.state.pageVal}
                            onChange={this.handleChangeTable.bind(this)}
                        />
                    </Grid>

                    <Grid item xs={12} style={{ background: '#' }}>
                        <MyProjectFilter
                            onKeyup={this.handleSearchForm.bind(this)}
                            onChangeRowsPage={this.handleChangeRowsPage.bind(this)}
                            RowsPageValue={this.state.rowsPage}

                        />
                    </Grid>
                    <Grid item style={{ background: '#' }}>
                        <ProjectTable
                            searchText={this.state.searchText}
                            rowsPerPage={this.state.rowsPage}
                            data={renderDataSwitch(this.state.pageVal)}
                            dataCat={this.state.pageVal === 1 ? "proposal" : "project"}
                        />
                    </Grid>





                </Grid>
                <UserReviewDialog
                    openDialog={this.state.openReviewUserDialog}
                    handleCloseReview={this.handleCloseReview.bind(this)}
                    workersData={this.state.workersProjectData}
                    handleSubmitReview={this.handleSubmitReview.bind(this)}
                />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ProyekSayaContent);