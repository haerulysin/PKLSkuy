import React, { Component } from 'react';
import {
    Grid,
    withStyles,
    Avatar,
    Typography,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        background: '#fff',
        margin: '10px 5px',
    },




    chatContent: {
        background: '#FF7200',
        borderRadius: 5,
        color: '#fff',
        maxWidth: '70%',
        minWidth: 140


    },

    chatContent2: {
        padding: '2px 3px',
        background: '#444',
        borderRadius: 5,
        color: '#fff',
        maxWidth: '70%',
        minWidth: 140


    }
});

class ChatList extends Component {

    messageToLink(msg) {
        let whyperlink = msg.split('$project:');

        return (
            <React.Fragment>
                {whyperlink[0]}
                <Link to={"/proyek/"+whyperlink[1]}>{whyperlink[1]}</Link>
            </React.Fragment>
        )
    };


    render() {



        const { classes } = this.props;
        const isSender = this.props.isSender;
        let messagecontent;
        if (!isSender) {
            messagecontent = (
                <Grid container className={classes.root} spacing={1}>
                    <Grid item style={{ margin: '0px 10px' }}>
                        <Avatar src={process.env.PUBLIC_URL + '/assets/upload/' + this.props.fromPhoto} />
                    </Grid>

                    <Grid item className={classes.chatContent2}>
                        <Typography variant="body2" align="left" style={{ color: '#ddd', fontSize: 12 }}>{this.props.name}</Typography>

                        <Typography variant="body2">
                            {this.props.message.includes('$project') ? this.messageToLink(this.props.message) : this.props.message}

                        </Typography>
                        <div style={{ textAlign: 'right' }}>
                            <Typography variant="caption" style={{ color: '#ddd', fontSize: 11 }}>{this.props.sendtime}</Typography>
                        </div>
                    </Grid>
                </Grid>
            );
        } else {
            messagecontent = (

                <Grid container className={classes.root} spacing={1} direction="row-reverse">
                    <Grid item style={{ margin: '0px 10px' }}>
                        <Avatar src={process.env.PUBLIC_URL + '/assets/upload/' + this.props.fromPhoto} />
                    </Grid>
                    <Grid item className={classes.chatContent}>
                        <Typography variant="body2" align="right" style={{ color: '#ddd', fontSize: 12 }}>{this.props.name}</Typography>

                        <Typography variant="body1" align="right">
                            {this.props.message.includes('$project') ? this.messageToLink(this.props.message) : this.props.message}

                        </Typography>
                        <div style={{ textAlign: 'left' }}>
                            <Typography variant="caption" style={{ color: '#ddd', fontSize: 11 }}>{this.props.sendtime}</Typography>
                        </div>
                    </Grid>
                </Grid>
            );
        }


        return (
            <div>
                {messagecontent}
            </div>
        );
    }
}

export default withStyles(styles)(ChatList);