import React from 'react';
import {
    Button,
    Avatar,
    makeStyles,
    MenuItem,
    Typography,

} from '@material-ui/core';

import DropDown from './DropDown';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const useStyles = makeStyles((theme) => ({
    profileAvatar: {
        width: 30,
        height: 30,
        marginRight: 10
    },

}));




export default function LoginButton(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    return (
        <React.Fragment>
            <Button
                variant="contained"
                color="primary"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <Avatar className={classes.profileAvatar} src={process.env.PUBLIC_URL + '/assets/upload/' + props.auth.user.photoProfile}/>
                {props.auth.user? props.auth.user.fullName : ''}
                <ArrowDropDownIcon />
            </Button>

            <DropDown
                open={open}
                currentAnchor={anchorRef.current}
                handleClose={handleClose}
                handleListKeyDown={handleListKeyDown}

            >
                <MenuItem onClick={handleClose} component={Link} to={props.auth.user? '/u/'+props.auth.user.id :'/u'} >
                    <PersonIcon fontSize="small" />
                    <Typography variant="body1" style={{paddingLeft:3}}>Profile</Typography>
                </MenuItem>

                <MenuItem onClick={handleClose} component={Link} to="/user" >
                    <SettingsIcon fontSize="small" />
                    <Typography variant="body1" style={{ paddingLeft: 3 }}>User Setting</Typography>
                </MenuItem>
                <MenuItem onClick={props.handleLogout}>
                    <ExitToAppIcon fontSize="small" />
                    <Typography variant="body1" style={{ paddingLeft: 3 }}>Logout</Typography>
                </MenuItem>

                


            </DropDown>
        </React.Fragment>
    );

};