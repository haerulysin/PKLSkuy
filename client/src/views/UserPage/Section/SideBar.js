import React, { Component } from 'react';
import {
    withStyles,
    Grid,
    Tabs,
    Tab,
} from '@material-ui/core';

const styles = theme => ({
    root: {

    },
    sideBarBtn: {
        background: '#FF7200',
        width: '90%',
        textAlign: 'left',
        padding: '9px 18px',
        color: '#fff',
        borderRadius: 5

    },

    sideBarBtn2: {
        background: '',
        width: '90%',
        textAlign: 'left',
        padding: '9px 18px',
        color: '#FF7200',
        borderRadius: 5,
        '&:hover': {
            color:'#fc9c4e'
        }

    }
});
const SideBarTabs = withStyles({
    root: {
        marginRight:5
    },
    indicator: {
        background:'transparent'
    },
})(Tabs);

const SideBarTab = withStyles((theme) => ({
    root: {
        color: '#FF7200',
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        padding: '9px 18px',        
        '&:hover': {
            color: '#fc9c4e',
            opacity: 1,
        },
        '&$selected': {
            color: '#fff',
            background: '#FF7200',
            borderRadius:5,
            fontWeight: theme.typography.fontWeightMedium,
        },
        
    },
    selected: {},
    wrapper:{
        alignItems:'flex-start'
    }
}))((props) => <Tab disableRipple {...props} />);



class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            catValue: 0
        }
    }
    

    handleSideBarTabs(e, nVal){
        this.setState({catValue:nVal})
    }
    render() {
        return (
            <Grid container direction="column">
               <SideBarTabs
                    value={this.props.sectionValue}
                    onChange={this.props.handleSideBar}
                    orientation="vertical"
               >

                   <SideBarTab
                        label="Profile"
                   />

                    <SideBarTab
                        label="Email"
                    />

                    <SideBarTab
                        label="Password"
                    />

                    <SideBarTab
                        label="Verifikasi"
                    />

               </SideBarTabs>
            </Grid>
        );
    }
}

export default withStyles(styles)(SideBar);