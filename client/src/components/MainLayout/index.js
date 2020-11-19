import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from './Section/NavBar';
import { getCurrentAuthenticated,logoutUser } from "../../redux/actions/authActions";
import {withRouter} from 'react-router-dom';
class index extends Component {
    
    componentDidMount(){
        if(!localStorage.jwtToken){
            //this.props.history.push('/')
        }else{
            this.props.getCurrentAuthenticated();
        }
    }

    async handleLogout(e){
        e.preventDefault();
        await this.props.logoutUser();
        await this.props.history.push('/');
    }

    render() {
        
        return (
            <React.Fragment>
                <Navbar
                {...this.props}
                    handleLogout={this.handleLogout.bind(this)}
                />
            </React.Fragment>
        );
    }
    
}

index.propTypes = {

};


index.propTypes = {
    auth: PropTypes.object.isRequired,
    getCurrentAuthenticated: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getCurrentAuthenticated,logoutUser}
)(withRouter(index));