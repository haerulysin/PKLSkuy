import React, { Component } from 'react';

import {
    Button,
    ButtonGroup,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Popper,
    withStyles,
    Paper,

} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {

    },

    parentButton: {
        padding: '0px 30px',
    },

    arrowButton: {
        padding: '3px 0px',
    },

    dropdownMenu: {
        border: 0,
        borderRadius: 0,
    }
});

class ProjectTableButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopper: false,
        }

        this.myRef = React.createRef();
    }

    handleMenuClick(e) {
        this.setState({ openPopper: !this.state.openPopper });
    }


    handleMenuClose() {
        this.setState({ openPopper: false })
    }

    handleMenuItemClick(e) {
        console.log(e.target.value)
        this.handleMenuClose();
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <ButtonGroup ref={this.myRef} variant="contained" color="primary" size="small">
                    <Button className={classes.parentButton} component={Link} to="/mymessage/" target="_blank" >Chat</Button>
                    <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        className={classes.arrowButton}
                        onClick={this.handleMenuClick.bind(this)}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>

                <Popper
                    open={this.state.openPopper}
                    anchorEl={this.myRef.current}
                    transition
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >


                            <Paper className={classes.dropdownMenu}>
                                <ClickAwayListener onClickAway={this.handleMenuClose.bind(this)}>
                                    <MenuList>
                                        <MenuItem
                                            component={Link}
                                            to={"/proyek/" + this.props.projectId}
                                            target="_blank"
                                        >Lihat Proyek</MenuItem>

                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}


                </Popper>

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ProjectTableButton);