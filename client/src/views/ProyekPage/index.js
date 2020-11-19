import React, { Component } from 'react';
import ContentProyek from './Section/contentProyek';
import ListProposal from './Section/ListProposal';
import HeaderProyek from './Section/headerProyek';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjectByID, postProposal, updateProposal, getProposalByProjectID, updateProject } from '../../redux/actions/projectListActions';
import { getUserById } from '../../redux/actions/userActions';
import axios from 'axios';
import {
    sendMessage,
} from '../PesanPage/Services/chatServices';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectCategoryString: ['', 'Perbaikan dan Instalasi', 'Renovasi dan bangunan', 'Desain dan perencanaan'],
            projectData: {},
            userData: {},
            proposalData: [],
            tabsHeaderValue: 0,
        }
    }

    static getDerivedStateFromProps(props, state) {

        if (props.projectListState.projectData) {
            return {
                projectData: props.projectListState.projectData,
                proposalData: props.projectListState.proposalListData,

            }


        }

        if (props.projectListState.proposalListData) {
            return {
                proposalData: props.projectListState.proposalListData
            }
        }



        return null;
    }
    componentDidMount() {
        this.props.getProjectByID(this.props.match.params.id);
        this.props.getProposalByProjectID(this.props.match.params.id);
    }

    handleAcceptProposal(e, proposalID, postedID) {
        let projectData = {
            _id: this.state.projectData._id,
            onProgress: {
                status: true,
                proposalID: proposalID
            }
        }

        let proposalData = {
            proposalID: proposalID,
            proposalAcceptedStatus: true,
        }

        let chatData = {
            to: postedID,
            from: this.state.projectData.postedBy._id,
            body: "Saya telah menyetujui proposal anda di proyek $project:" + this.state.projectData._id,
        }
        console.log(this.state);

        console.log(chatData);
        sendMessage(chatData);


        this.props.updateProject(projectData);
        this.props.updateProposal(proposalData);
        window.location.reload();
    }

    async handleDeleteProposal(e, proposalID) {
        let projectData = await {
            _id: this.state.projectData._id,
            onProgress: {
                status: false,
                proposalID: ""
            }
        }
        await this.props.updateProject(projectData);
        await axios.delete('/api/proposal/?proposalID=' + proposalID)
            .then(res => window.location.reload())
            .catch(err => console.log(err));
    }


    render() {
        const { pages, id } = this.props.match.params;
        return (
            <div>
                <div style={{ minHeight: '76vh' }}>

                    <HeaderProyek pages={pages} id={id} {...this.props} />
                    {pages === 'details' && <ContentProyek {...this.props} {...this.state} />}
                    {pages === 'proposal' &&
                        <ListProposal
                            {...this.props}
                            {...this.state}
                            handleAcceptProposal={this.handleAcceptProposal.bind(this)}
                            handleDeleteProposal={this.handleDeleteProposal.bind(this)}
                        />
                    }
                </div>
            </div>

        );
    }
}

index.propTypes = {
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProjectByID: PropTypes.func.isRequired,
    getUserById: PropTypes.func.isRequired,
    postProposal: PropTypes.func.isRequired,
    updateProposal: PropTypes.func.isRequired,
    getProposalByProjectID: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    projectListState: state.projectListState,

});

export default connect(
    mapStateToProps,
    {
        getProjectByID,
        getUserById,
        postProposal,
        updateProposal,
        getProposalByProjectID,
        updateProject
    }
)(index);