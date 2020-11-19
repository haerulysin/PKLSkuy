import React from 'react';
import {
    Popper,
    Paper,
    MenuList,
    ClickAwayListener,
    withStyles
} from '@material-ui/core';


const PopperContent = withStyles({

    root: {
        '&::before': {
            content: '""',
            display: 'block',
            height: 16,
            width: 16,
            background: '#fff',
            transform: 'rotate(45deg)',
            position: 'absolute',
            right: 4,
            top: 4,
            zIndex: '-1000',
        },
        borderRadius: 0,
        marginTop: 12,
        boxShadow: '0 0 0px rgba(0,0,0,.16), 0 3px 5px rgba(0,0,0,.2)',
        minHeight: '20px',
        minWidth:300,
    }

})(Paper);



export default function DropDown(props) {

    return (
        <Popper placement="bottom-end" open={props.open} anchorEl={props.currentAnchor} role={undefined} transition disablePortal>

            <PopperContent>
                <ClickAwayListener onClickAway={props.handleClose}>
                    <MenuList autoFocusItem={props.open} id="menu-list-grow" onKeyDown={props.handleListKeyDown}>
                        {props.children}
                    </MenuList>
                </ClickAwayListener>
            </PopperContent>
        </Popper>
    );
};