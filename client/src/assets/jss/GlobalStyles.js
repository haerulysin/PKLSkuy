import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
    '@global': {
        '*': {
            
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
        },
        html: {
            height: '100%',
            width: '100%'
        },
        body: {
            backgroundColor: '#ddd',
            height: '100%',
            width: '100%'
        },
        a: {
            textDecoration: 'none'
        },
        '#root': {
            height: '100%',
            width: '100%'
        },


    }
}));

const GlobalStyles = () => {
    useStyles();

    return null;
};

export default GlobalStyles;
