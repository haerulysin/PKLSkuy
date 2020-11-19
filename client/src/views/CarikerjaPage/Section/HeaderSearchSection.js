import React, { Component } from 'react';
import{
    withStyles,
    Grid,
    Button,
} from '@material-ui/core';
//Custom TextField
import HeaderInput from './CustomComponent/HeaderInput';
//MaterialUI Icon
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = theme => ({
    headerSearchbtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '0px 2px'

    }
});
class HeaderSearchSection extends Component {
    constructor(props) {
        super(props);
        this.placeInput = React.createRef();
        this.googleAutocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    }

    componentDidMount(){
        this.googleAutocomplete = new window.google.maps.places.Autocomplete(
            this.placeInput.current,
            { "types": ["(cities)"],
            componentRestrictions: { country: "ID" }
            },
        );
        this.googleAutocomplete.addListener('place_changed',this.handlePlaceChanged);
    }

    handlePlaceChanged(){
        const place = this.googleAutocomplete.getPlace();
        this.props.handleOnPlaceChanged(place);
    }


    render() {
        const {classes} = this.props;
        return (
            <Grid container style={{ background: '#fff' }}>
                <Grid item xs={12} md={5}>
                    <HeaderInput
                        icons={<SearchIcon />}
                        placeholder="Cari kata kunci..."
                        onChange={this.props.handleOnKeywordChange}

                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <HeaderInput
                        icons={<LocationOnIcon />}
                        id="autocomplete"
                        placeholder="Enter your address"
                        type="text"
                        inputRef={this.placeInput}
                        
                    />

                </Grid>
                <Grid item xs={12} md={2}>
                    <div className={classes.headerSearchbtn}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            style={{ borderRadius: 3 }}
                            onClick={this.props.handleOnSubmitSearch}
                        >Cari</Button>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(HeaderSearchSection);