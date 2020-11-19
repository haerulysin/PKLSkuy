import React from 'react';
import {Link} from 'react-router-dom';
//MaterialUI Core
import { 
    Grid,
    Typography,
    Box,
    FormControl,
    makeStyles,
    Button,
    TextField,
    InputAdornment,
    Link as A,
    Hidden,
    Collapse,
    
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
//MaterialIcon
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

const styles = makeStyles(({
    pageBody: {
        paddingBottom: "100px"
    },
    formBox: {
        background: '#fff',
        border:'1px solid #FF7200',
        borderRadius: '10px',
        textAlign: "center",
        color: "#aaa",
        padding: '20px',
        paddingBottom:'50px',
        margin:'0px 40px'
    },

    registerBtn: {
        color: '#fff',
        width: '100%',
        margin: '2px 8px'
    }

}));
function ConstructionIMG() {
    return (
        <img
            alt="Logo"
            src={require("../../../assets/img/constructionImage.png")}
            width="80%"
        />
    );
}


const FormRegister = (props) => {
    const classes = styles();

    const{
        values: {fullName,regemail,password,password2},
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        handleSubmit
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
        
    };

    return (
        <React.Fragment>
            <Grid container className={classes.pageBody}>
                <Hidden xsDown>
                    <Grid item sm={6} style={{ textAlign: "center"}}>
                        <ConstructionIMG/>
                        <Typography color="primary" variant="h3">SOLUSI UNTUK MEMBANGUN IMPIANMU</Typography>
                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={6}>
                    <Box className={classes.formBox}>
                        <Typography></Typography>
                        <Typography>Sudah punya akun? <A component={Link} to="/login">Masuk</A></Typography>
                        <br/>
                        <form onSubmit={handleSubmit}>
                            <Collapse in={props.registerErrors?true:false}>
                                <Alert
                                    severity="error"
                                >{props.registerErrors}</Alert>


                            </Collapse>
                            <FormControl style={{ width: "80%", textAlign: "center" }}>
                                <TextField
                                    label="Nama Lengkap *"
                                    style={{ margin: 8 }}
                                    placeholder="Fadhel Habibi"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountBoxIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    autoFocus
                                    autoComplete="fullName"
                                    name="fullName"
                                    id="fullName"
                                    helperText = {touched.fullName?errors.fullName:''}
                                    value = {fullName}
                                    error = {(errors.fullName && touched.fullName) || props.registerErrors ? true : false}
                                    onChange = {change.bind(null,'fullName')}  
                                />

                                <TextField
                                    label="Email *"
                                    style={{ margin: 8 }}
                                    placeholder="Soped@gmail.com"
                                    fullWidth
                                    type="email"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MailOutlineIcon />
                                            </InputAdornment>
                                        ),
                                    }}

                                    autoComplete="regemail"
                                    name="regemail"
                                    id="regemail"
                                    helperText={touched.regemail ? errors.regemail : ''}
                                    value={regemail}
                                    error={(errors.regemail && touched.regemail) || props.registerErrors ? true : false}
                                    onChange={change.bind(null, 'regemail')}  

                                />

                                <TextField
                                    label="Password *"
                                    style={{ margin: 8 }}
                                    placeholder="Password"
                                    fullWidth
                                    type="password"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOpenIcon />
                                            </InputAdornment>
                                        ),
                                    }}

                                    autoComplete="password"
                                    name="password"
                                    id="password"
                                    helperText={touched.password ? errors.password : ''}
                                    value={password}
                                    error={(errors.password && touched.password) || props.registerErrors ? true : false}
                                    onChange={change.bind(null, 'password')}  
                                    
                                />

                                <TextField
                                    label="Konfirmasi Password *"
                                    style={{ margin: 8 }}
                                    placeholder="Konfirmasi Password"
                                    fullWidth
                                    type="password"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                    }}

                                    name="password2"
                                    id="password2"
                                    helperText={touched.password2 ? errors.password2 : ''}
                                    value={password2}
                                    error={(errors.password2 && touched.password2) || props.registerErrors ? true : false}
                                    onChange={change.bind(null, 'password2')}  
                                    
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.registerBtn}
                                    disabled = {!isValid||props.isLoading}
                                    type = 'submit'
                                >Daftar</Button>

                            </FormControl>
                        </form>
                    </Box>
                </Grid> 
            </Grid>
        </React.Fragment>
    );
};

export default FormRegister;