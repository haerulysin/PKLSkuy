import React, { Component } from 'react';
import{
    Card,
    Grid,
    Typography,
    CardContent
} from '@material-ui/core';
import Leaflet from 'leaflet';
import{
    Map,
    TileLayer,
    Circle,
    Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
Leaflet.Icon.Default.imagePath =
    '../node_modules/leaflet'

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


class MapProyek extends Component {
    
    render() {
        const center = { lat: this.props.geoLocation[0].coordinates[1], lng: this.props.geoLocation[0].coordinates[0] }
        return (
            <Grid container direction="column" style={{background:'#fff'}}>
                <Grid item xs={12}>
                    <Grid container style={{ padding: '14px 16px' }}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Lokasi Proyek</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Map
                                center={center}
                                ref={ref => this.mapRef = ref}
                                zoom={14}
                                style={{ height: '400px' }}
                            >
                                <TileLayer
                                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Circle center={center} color="red" radius={500}>
                                    <Popup>Lokasi Proyek</Popup>
                                </Circle>
                                    
                            </Map>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default MapProyek;