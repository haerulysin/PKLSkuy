import React, { Component } from 'react';
import {
    withStyles,
    Grid,
    Container,
    Typography,
    Button,
    OutlinedInput,
} from '@material-ui/core';
import ChatList from './CustomComponent/ChatList';
import SendIcon from '@material-ui/icons/Send';
import moment from 'moment';
import {Link} from 'react-router-dom';
const styles = theme => ({
    root: {
        background: '#fff',
        minHeight: '93vh',
    },

    noMessageContainer: {
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center'
    },

    messageContent: {
        paddingRight: '20px',
        gridArea: "main",
        maxHeight: '83vh',
        minHeight: '83vh',
        overflowY: 'scroll',
    },
    sendMessageBtn: {
        padding: '8px 15px',
        borderRadius: 0
    },

    messageForm: {
        background: 'transparent',
        justifyContent: 'center',
        padding: '0px 7px',
        gridArea: 'footer',
    }


});

function NoMessageList() {

    
    return(
        <Grid container justify="center" direction="column" spacing={3} alignContent="center" alignItems="center" style={{height:'100%'}}>
            <Grid item>
                <img
                    src={require("../../../assets/img/chatlistbg.png")}
                    width="210px"
                    alt="noReviews"

                />
            </Grid>
            <Grid item>
                <Typography variant="h4">Selamat datang di pesan anda.</Typography>
            </Grid>

            <Grid item>
                <Typography variant="caption">Saling terhubung satu sama lain. </Typography>
                <Typography variant="caption" component={Link} to="/carikerja" target="_blank">Cari Proyek </Typography>
                <Typography variant="caption">Atau </Typography>
                <Typography variant="caption" component={Link} to="/posting" target="_blank">Posting Proyek </Typography>
            </Grid>

        </Grid>
    );
    
}

class PesanContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessage: ''
        }

        this.bottomRef = React.createRef();

        this.handleNewMessage.bind(this);

    }

    static getDerivedStateFromProps(props, state) {
        if (props.messagesList){

            
            
        }

        return null;
    }

    componentDidUpdate(){
        this.scrolltoBottom();
    }

    handleNewMessage(v) {
        this.setState({ newMessage: v });
    }

    handleonSubmitMessage() {
        this.props.handleSendMessage(this.state.newMessage);
        this.setState({newMessage:''})
    }

    scrolltoBottom(){
        this.bottomRef.current.scrollIntoView({behavior:'smooth'})
    }

    

    render() {
        const {
            classes,
            messagesList
        } = this.props;
        
        return (
            <Grid container className={classes.root}>
                <Container className={classes.noMessageContainer}>
                    <NoMessageList/>
                </Container>

                <Grid item container direction="column" className={classes.messageContent}>
                    <Grid item xs={12}>
                        {messagesList.length ?(
                            messagesList.map((item, index) => (
                                <ChatList
                                    key={index}
                                    message={item.body}
                                    name={item.fromObj[0].fullName}
                                    fromPhoto={item.fromObj[0].biodata.photo}
                                    toPhoto={item.toObj[0].biodata.photo}
                                    isSender={this.props.auth.user.id === item.from}
                                    sendtime={moment(parseInt(item.date)).format('DD-MM-YYYY hh:mm')}
                                />
                            ))
                        ):(<NoMessageList/>)}

                        <div ref={this.bottomRef}/>
                    </Grid>

                </Grid>

                {messagesList.length ?(
                <Grid item xs={12} container className={classes.messageForm}>
                    <Grid item xs={10}>
                        <OutlinedInput
                            fullWidth
                            margin="dense"
                            placeholder="Ketik pesan disini"
                            value={this.state.newMessage}
                            onChange={(e) => this.handleNewMessage(e.target.value)}
                            
                        />
                    </Grid>
                

                    <Grid item xs={2}>
                        <Button
                            fullWidth
                            variant="text"
                            color="primary"
                            className={classes.sendMessageBtn}
                            onClick={this.handleonSubmitMessage.bind(this)}
                        >
                            <SendIcon />
                            Kirim
                        </Button>
                    </Grid>
                </Grid>)
                : ''
                }
            </Grid>
        );
    }
}

export default withStyles(styles)(PesanContent);