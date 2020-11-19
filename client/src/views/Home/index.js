import React, { Component } from 'react';
import ContentHeader from './Section/ContentHeader';
import ContentBody from './Section/Content';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
class index extends Component {

    componentDidMount(){
        document.title= "PKLSkuy - Home";
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }
    render() {
        return (
            <React.Fragment>
                <ContentHeader/>
                <ContentBody/>
            </React.Fragment>
        );
    }
}



index.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
)(index);
