import React, { Component } from 'react';
import ProfileContent from './Section/ProfileContent';
import PropTypes from "prop-types";

//MiddleWare
import { connect } from "react-redux";
import { updateUser} from '../../redux/actions/userActions';

class index extends Component {
    render() {
        return (
            <React.Fragment>
                <ProfileContent {...this.props}/>
                
            </React.Fragment>
        );
    }
}

index.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { updateUser}
)(index);