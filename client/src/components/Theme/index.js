import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';
import grid from './grid';

const theme = createMuiTheme({
    palette: {
        background: {
            dark: '#F4F6F8',
            default: colors.common.white,
            paper: colors.common.white
        },
        primary: {
            main: '#FF7200',
            contrastText: "#fff"
        },
        secondary: {
            main: '#fff'
        },
        
        text: {
            primary: '#000',
            secondary: colors.blueGrey[600]
        }
    },

    shadows,
    grid,
    typography,
    overrides:{
        MuiButton:{
            contained:{
                color:'#fff',
            }
        },
    },
    
});

export default theme;
