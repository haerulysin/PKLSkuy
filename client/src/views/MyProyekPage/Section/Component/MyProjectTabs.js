import React, { Component } from 'react';
import {
    withStyles,
    Tabs,
    Tab
} from '@material-ui/core';
const styles = theme => ({
    root: {

    }
});

const MyTabs = withStyles({
    root: {
        color: '#000',

    },

})(Tabs);


const MyTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        paddingRight: 20,
        '&:hover': {
            borderBottom: '2.5px solid #aaa',
        },
        '&$selected': {

            fontWeight: theme.typography.fontWeightMedium,
        },

    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);


class MyProjectTabs extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <MyTabs
                    variant="scrollable"
                    scrollButtons="off"
                    value={this.props.pageVal}
                    onChange = {this.props.onChange}
                    indicatorColor="primary"
                    textColor="primary"
                >

                    <MyTab label="Proyek Saya" />
                    <MyTab label="Proposal Saya" />
                    <MyTab label="Proyek Berjalan" />
                    <MyTab label="Proyek Selesai" />

                </MyTabs>


            </div>
        );
    }
}

export default withStyles(styles)(MyProjectTabs);