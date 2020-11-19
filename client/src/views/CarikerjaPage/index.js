import React, { Component } from 'react';
import PropTypes from 'prop-types';
//MaterialUI
import{
    Container,
    Grid,
} from '@material-ui/core'
//Component
import HeaderContent from './Section/HeaderSearchSection';
import ListPekerjaanContent from './Section/ListPekerjaan';
//Redux
import {connect} from 'react-redux';
//ProjectList Actions
import { getProjectList } from '../../redux/actions/projectListActions';

class index extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            projectData: {},
            isLoading:true,
            pageData:1,
            searchText: '',
            locationcoords:[0,0]
        }
    }
    
    componentDidMount(){
        this.getProjectData();
    }

    static getDerivedStateFromProps(props,state){
        if(props.projectListState.projectData.status){
            return{
                projectData : props.projectListState.projectData,
                isLoading: props.projectListState.isLoading
            }
        }
        return null
    }

    getProjectData(){
        this.props.getProjectList(this.state.pageData, this.state.searchText, this.state.locationcoords);
    }
    handlePagesChange(e,values){
        this.setState({pageData:values});
        this.getProjectData();
    }

    handleOnPlaceChanged(e){
        this.setState({
            locationcoords: [e.geometry.location.lng(), e.geometry.location.lat()]
        });

        this.getProjectData();



    }

    handleOnKeywordChange(e){
        this.setState({searchText:e.target.value});
    }

    handleOnSubmitSearch(){
        this.getProjectData();
    }


    render() {
        return (
            <React.Fragment>
                <Container style={{marginTop:30}}>
                    <Grid container direction={"column"} spacing={3}>
                        <Grid item xs={12}>
                            <HeaderContent
                                handleOnPlaceChanged={this.handleOnPlaceChanged.bind(this)}
                                handleOnKeywordChange = {this.handleOnKeywordChange.bind(this)}
                                handleOnSubmitSearch={this.handleOnSubmitSearch.bind(this)}
                            
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ListPekerjaanContent
                                {...this.state}
                                history = {this.props.history}
                                handlePagesChange = {this.handlePagesChange.bind(this)}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

index.propTypes = {
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProjectList: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    projectListState: state.projectListState
    

});
export default connect(
    mapStateToProps,
    {getProjectList}
)(index);