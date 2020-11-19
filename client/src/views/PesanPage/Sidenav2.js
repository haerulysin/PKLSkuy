import React, { Component } from 'react';
import {
    withStyles,
    Grid,
    OutlinedInput,
    InputAdornment,
    Divider,
    Link,
    Typography,

} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ContactButton from './CustomComponent/SideNavContact';
const styles = theme => ({
    root: {
        minHeight: '93vh',
        background: '#fff',
        padding: '8px 0px',
        border: '0.3px solid #ddd'

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


});
class SideNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidenavcat: 1,
        }
    }

    handleListChatCategory(event) {
        event.preventDefault();

    }


    render() {
        const { classes } = this.props;
        return (
            <section className={classes.root}>
                <Grid container spacing={2} direction="column">
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                        <OutlinedInput
                            placeholder="Cari nama orang..."
                            classes={{ root: classes.searchInputWrapper, input: classes.searchInput }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }

                        />
                    </Grid>

                    <Grid item xs={12} container spacing={1} style={{ justifyContent: 'center' }}>
                        <Grid item>
                            <Link href="" onClick={this.handleListChatCategory.bind(this)}>
                                <Typography variant="h6">ACTIVE</Typography>
                            </Link>
                        </Grid>

                        <Grid item>
                            <Link href="" onClick={this.handleListChatCategory.bind(this)}>
                                <Typography variant="subtitle2" >UNREAD (0)</Typography>
                            </Link>
                        </Grid>

                        <Grid item>
                            <Link href="" onClick={this.handleListChatCategory.bind(this)}>
                                <Typography variant="subtitle2">SUPPORT</Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="" onClick={this.handleListChatCategory.bind(this)}>
                                <Typography variant="subtitle2">ARCHIVED</Typography>
                            </Link>

                        </Grid>

                    </Grid>
                    <Divider variant="middle" />

                    <Grid item xs={12} container direction="column">
                        <ContactButton
                            nama="Fadhel Habibi"
                            previewChat="Halo..."
                            totalUnreadChat={3}
                            online={0}
                        />

                    </Grid>

                </Grid>
            </section>

        );
    }
}

export default withStyles(styles)(SideNav);