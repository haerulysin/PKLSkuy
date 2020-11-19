import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Avatar,
    Typography,
    Box,
    Link,
} from '@material-ui/core';



const StyledButton = withStyles({
    root: {
        width: '100%',
        background: '#FF7200',
        borderRadius: '0',
        textAlign: 'left',
        padding: 5,
        height: 52,
        position: 'relative',
        display: 'block',
        color: '#fff',
        borderBottom: '0.3px solid #fff',
    },
})(Link);

export default function ClassesShorthand(props) {


    return (
        <StyledButton href="" component="button" underline="none" onClick={props.onClick}>
            <Grid container spacing={1} direction="row">
                <Grid item xs={2}>

                    <Avatar
                        alt={props.nama}
                        src={process.env.PUBLIC_URL+'/assets/upload/'+props.photo}
                    />
                </Grid>
                <Grid item xs={6} container direction="column">
                    <Grid item>
                        <Typography align="left">{props.nama}</Typography>
                    </Grid>
                    <Grid item container>
                        
                        <Grid item style={{display:'flex',flexGrow:1}}>
                            <Typography variant="subtitle2" style={{ color: '#ddd' }}>
                                {props.previewChat.length>=10?
                                (props.previewChat.substring(0,10)+"...")
                                :props.previewChat    
                            }
                            </Typography>
                        </Grid>

                        
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Box >{props.lastMessagetime} hari yang lalu</Box>
                </Grid>
            </Grid>
        </StyledButton>
    );
}