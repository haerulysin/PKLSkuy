import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import SideNav from './Section/SideNav';
import PesanContent from './Section/PesanContent';
import {
    sendMessage,
    getMessage,
    getConversationsList
} from './Services/chatServices';
import { Scrollbars } from 'react-custom-scrollbars';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessage: '',
            messagesList: [],
            receiverSelected: '',
            activeReceiverchat: '',
            conversationList: [],
        }
    }


    componentDidMount() {
        this.loadConversationList();
    }
    static getDerivedStateFromProps(props, state) {
        if (props.auth) {
        }
        return null
    }

    loadMessage(values) {
        getMessage(values)
            .then(res => {
                this.setState({ messagesList: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    loadConversationList() {
        getConversationsList()
            .then(res => {
                this.setState({ conversationList: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    

    async handleSendMessage(v) {
        let chatData = {
            to: this.state.receiverSelected,
            body: v,
        }
        this.setState({ newMessage: '' });
        let socket = socketIOClient('/');

        await sendMessage(chatData);

        await socket.on('messages', data => {
            this.loadMessage({u1:data.from,u2:data.to});
            this.setState({ newMessage: '' })
            this.loadConversationList();
        });

    }

    handleSetActiveReceiver(u1, u2) {
        let from = u1 === this.props.auth.user.id ? u1 : u2;
        let to = u1 !== this.props.auth.user.id ? u1 : u2;
        this.setState({ receiverSelected: to })
        const user = {
            u1: from,
            u2: to,
        }
        this.loadMessage(user);
    }


    render() {
        return (
            <React.Fragment>
                <Grid container >

                    <Grid item xs={4} sm={4} lg={2} >
                        <Scrollbars>
                            <SideNav
                                {...this.props}
                                conversationList={this.state.conversationList}
                                handleSetActiveReceiver={this.handleSetActiveReceiver.bind(this)}
                            />
                        </Scrollbars>
                    </Grid>
                    <Grid item xs={8} sm={8} lg={10} >
                        <PesanContent
                            {...this.props}
                            {...this.state}
                            handleSendMessage={this.handleSendMessage.bind(this)}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

index.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,

});
export default connect(
    mapStateToProps
)(index);