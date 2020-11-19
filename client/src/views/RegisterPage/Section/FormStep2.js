import React, { Component } from 'react';
import {
    withStyles,
    Card,
    CardContent,
    Grid,
    Typography,
    Button,
    Collapse


} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
//Logo
import Logo from '../../../components/Logo';
import Inputs from '../../../components/CustomizeComponents/Inputs';

const styles = theme => ({
    root: {
        maxWidth: 400,
        marginTop: 30,
        padding: 15

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


class FormStep2 extends Component {
    render() {
        const {
            values: {username},
            errors,
            touched,
            handleChange,
            isValid,
            setFieldTouched,
            handleSubmit,
            classes
        } = this.props;

        const change = (name,e) => {
            e.persist();
            handleChange(e);
            setFieldTouched(name,true,false);
        }
        return (
            <form onSubmit={handleSubmit}>
                <Grid container justify="center">
                    <Card className={classes.root}>
                        <CardContent>
                            <Grid container spacing={3} direction="column" justify="center">
                                <Grid item xs={12} container justify="center" alignItems="center">
                                    <Grid item style={{textAlign:'left'}}>
                                        A
                                    </Grid>
                                    <Grid item><Logo /></Grid>
                                </Grid>

                                <Grid item>
                                    <Typography variant="h4">Pilih username</Typography>
                                </Grid>

                                <Grid item>
                                    <Typography variant="subtitle2">Harap dicatat bahwa nama pengguna tidak dapat diubah setelah dipilih.</Typography>
                                </Grid>

                                <Grid item>
                                    <Collapse in={this.props.registerErrors?true:false}>
                                        <Alert
                                            severity="error"
                                        >{this.props.registerErrors}</Alert>


                                    </Collapse>
                                    <Inputs
                                        placeholder="Masukkan username"
                                        fullWidth
                                        name="username"
                                        id="username"
                                        autoComplete="username"
                                        autoFocus
                                        required
                                        helpertext={touched.username?errors.username:''}
                                        value={username}
                                        onChange={change.bind(null,'username')}
                                        error={(errors.username&&touched.username) ? true:false}
                                        
                                    />
                                </Grid>

                                <Grid item>
                                    <Button variant="contained" color="primary" fullWidth type="submit" disabled={!isValid}> Selanjutnya </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </form >
        );
    }
}

export default withStyles(styles)(FormStep2);