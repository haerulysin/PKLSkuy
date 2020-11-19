import React, { Component } from 'react';
import {
    withStyles,
    Grid,
    Divider,
    Typography

} from '@material-ui/core';
import ContactButton from './CustomComponent/SideNavContact';
import axios from 'axios';
import moment from 'moment';
const styles = theme => ({
    
    root: {
        minHeight: '93vh',
        background: '#fff',
        padding: '8px 0px',
        border:'0.3px solid #ddd'

    },

    searchInputWrapper: {
        borderRadius: 0,
        background: '#ffff',
        fontSize: 14,
        width: '90%'
    },

    searchInput: {
        padding: '8px 0px'
    },

    listContact:{
        maxHeight:'60vh',
    }


});
class SideNav extends Component {

    constructor(props){
        super(props);
        this.state = {
            sidenavcat : 1,
            userContactData: [],
        }
    }

    

    handleListChatCategory(event) {
        event.preventDefault();
        
    }
    componentDidMount(){
        this.getUserList();
    }
    getUserList(){
        axios.get('/api/users')
        .then(res => {
            this.setState({userContactData:res.data})
        })
        .catch(err => console.log(err))
    }


    render() {
        const { classes,  } = this.props;
        return (
            
            <section className={classes.root}>
                
                <Grid container spacing={2} direction="column">
                    <Grid item xs={12} style={{ textAlign: "left",paddingLeft:20}}>
                        <Typography variant="h4">Pesan Saya</Typography>
                    </Grid>

                    
                    <Divider variant="middle" />

                    <Grid item container className={classes.listContact}>
                        {this.props.conversationList.length > 0 ? (
                            this.props.conversationList.map(item => (
                                <Grid item xs={12} key={item._id} >
                                    <ContactButton
                                        key={item._id}
                                        nama={this.props.auth.user.id === item.recipientObj[1]._id ? item.recipientObj[0].fullName : item.recipientObj[1].fullName}
                                        photo={this.props.auth.user.id === item.recipientObj[1]._id ? item.recipientObj[0].biodata.photo : item.recipientObj[1].biodata.photo}
                                        previewChat={item.lastMessage}
                                        onClick={this.props.handleSetActiveReceiver.bind(this, item.recipientObj[0]._id, item.recipientObj[1]._id)}
                                        lastMessagetime={moment(new Date().getTime()).diff(parseInt(item.date), 'days')}
                                    />
                                </Grid>
                            ))
                        ) :

                        (<Typography style={{padding:5}} variant="caption">Tidak ada pesan masuk.</Typography>)
                        
                        
                        }
                        
                    </Grid>
                    
                </Grid>
            </section>

        );
    }
}

export default withStyles(styles)(SideNav);