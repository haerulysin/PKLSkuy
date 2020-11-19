import React from 'react';
import {
    withStyles,
    InputLabel,
    NativeSelect,
    InputBase
} from '@material-ui/core';


const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(2),
            
        },

        width:'100%'
    },
    input: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 15,
        padding: '14px 5px',
        
        
        
    },
}))(InputBase);

const MyLabel = withStyles({
    root: {
        
        fontSize: 21,
        color: '#000',
        fontWeight: 700,
    },
    focused:{
        color:'#000'
    }
})(InputLabel);



function Selects(props) {
    return (
        <React.Fragment>
            <MyLabel>Pilih Jenis Proyek</MyLabel>
            <NativeSelect
                value={props.value}
                onChange={props.onChange}
                input={<BootstrapInput  />}
            >
                <option value={1}>Perbaikan dan Instalasi</option>
                <option value={2}>Renovasi dan Bangun</option>
                <option value={3}>Desain dan Perencanaan</option>
            </NativeSelect>
        </React.Fragment>
    );
}

export default Selects;