import React, { Component } from 'react';
import{
    withStyles,
} from '@material-ui/core';

const styles = theme => ({
    root:{
        background : '#fff',
        marginTop : 30,
        padding : 20
    }
});

class MainSection extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                Main Page
            </div>
        );
    }
}

export default withStyles(styles)(MainSection);