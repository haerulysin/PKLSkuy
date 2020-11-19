import React, { Component } from 'react';
import {
    Grid,
    withStyles,
    OutlinedInput,
    InputAdornment,
    FormControl,
    NativeSelect,
    InputBase,
    Typography
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const BootstrapInput = withStyles((theme) => ({
    root: {
        width:'100%'
    },
    input: {
        width:'100%',
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        padding: '6px 14px',
        justifyContent:'center',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        
        '&:focus': {
            backgroundColor: theme.palette.background.paper,
        },
    },
}))(InputBase);



const styles = theme => ({
    root: {
        marginTop : 20,
        display: 'flex',
        alignItems: 'center'
    },
    searchInputWrapper: {
        marginLeft: 8,
        borderRadius: 0,
        background: '#ffff',
        fontSize: 14,
        width: '100%',
        
    },

    searchInput: {
        padding: '8px 0px'
    },
});

class MyProjectFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showData : 10,
        }
    }
    
    handleChangeData(e){
        this.setState({showData: e.target.value});
        console.log(e.target.value)
    }
    render() {
        const {classes} = this.props;
        return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={10} >
                    <OutlinedInput
                        placeholder="Cari kata kunci..."
                        classes={{ root: classes.searchInputWrapper, input: classes.searchInput }}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }

                        onKeyUp = {this.props.onKeyup}

                    />
                </Grid>
                
                <Grid item xs={2} container style={{display:'flex',alignItems:'center',float:"right"}}>
                    <Typography>Show :</Typography>
                    <FormControl style={{marginLeft:10}}>
                        <NativeSelect
                            id="demo-customized-select-native"
                            value={this.props.RowsPageValue}
                            onChange={this.props.onChangeRowsPage}
                            input={<BootstrapInput />}
                        >
                            <option value={5}>10</option>
                            <option value={15}>20</option>
                            <option value={100}>100</option>
                        </NativeSelect>
                    </FormControl>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(MyProjectFilter);