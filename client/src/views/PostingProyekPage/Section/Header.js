import React, { Component } from 'react';
import{
    Grid, Typography
} from '@material-ui/core';
import Logo from '../../../components/LogoWhite';
class Header extends Component {
    render() {
        return (
            <Grid container style={{ paddingTop: 20, background: 'linear-gradient(55deg,#ff7200,#f5b27a)', paddingBottom:200}}>
                
                <Grid item xs={1} md={3} />

                <Grid item xs={10} md={6} spacing={1} container direction="column">
                    <Grid item>
                        <Logo width="120px"/>
                        
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h3" color="secondary">
                            Beritahu apa saja yang anda butuhkan
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="body2" gutterBottom color="secondary">
                            Hubungi pekerja terampil dalam beberapa menit. Lihat profil, rating dan segera mengobrol dengan mereka. Bayar pekerja jika proyek anda telah selesai 100%.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={1} md={3} />

            </Grid>
        );
    }
}

export default Header;