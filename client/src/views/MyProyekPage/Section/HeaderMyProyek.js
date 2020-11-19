import React, { Component } from 'react';
import {
    withStyles,
    AppBar,
    Tabs,
    Tab,
    Container,
    Grid
} from '@material-ui/core';

import {Link} from 'react-router-dom';
//Component
import MainSection from './MainSection';
import ProyekSaya from './ProyekSayaContent';
import ReviewSection from '../../ProfilePage/Section/UserReviews';

const styles = theme => ({

    root:{
        bacgkround:'#fff',
        display: 'block'
    },
    

    

    
});
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Grid
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
            style={{marginTop:20}}
            
        >
            {value === index && (
                <Container style={{background:''}}>
                    <Grid>{children}</Grid>
                </Container>
            )}
        </Grid>
    );
}


class HeaderMyProyek extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerNav : 1,
        }
    }
    
    handleNavChanges(e, nValue){
        this.setState({headerNav: nValue});
    }
    
    render() {
        const {classes} = this.props
        return (
            <Grid className={classes.root}>
                    <AppBar position="static" style={{paddingTop:30}}>
                        <Tabs
                            value={this.state.headerNav}
                            variant="scrollable"
                            scrollButtons="off"
                            onChange={this.handleNavChanges.bind(this)}
                            component={Container}
                            
                        >

                            <Tab label="Dashboard" style={{display:"none"}} />
                            <Tab label="Proyek & Proposal"/>
                            <Tab label="Umpan Balik" />
                            <Tab label="Kotak Masuk" component={Link} to="/mymessage" />

                        </Tabs>
                    </AppBar>
                
                <TabPanel value={this.state.headerNav} index={0}>
                    <MainSection/>
                </TabPanel>
                <TabPanel value={this.state.headerNav}  index={1}>
                    <ProyekSaya {...this.props}/>
                </TabPanel>
                <TabPanel value={this.state.headerNav} index={2}>
                    <ReviewSection userID={this.props.auth.user.id} />
                </TabPanel>
            </Grid>
        );
    }
}

export default withStyles(styles)(HeaderMyProyek);