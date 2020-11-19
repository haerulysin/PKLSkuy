import React, { Component } from 'react';
import PropTypes from 'prop-types';
//MaterialUI
import {Grid} from '@material-ui/core';
//Section COmponent
import Header from './Section/HeaderMyProyek';

//redux
import {connect} from 'react-redux'


class index extends Component {
    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }
    }


    render() {
        return (
            <React.Fragment>
                <Grid container spacing={0} direction="column">
                    <Grid item xs={12}>
                        <Header {...this.props}/>
                    </Grid>
                    
                </Grid>
            </React.Fragment>
        );
    }
}

index.propTypes = {
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,

});
export default connect(mapStateToProps)(index);