import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//MaterialUI Core
import {
    Button,
    Grid,
    TextField,
    withStyles,
    Collapse,
    CircularProgress
} from '@material-ui/core';
//MaterialUI Labs
import{
    Alert
} from '@material-ui/lab';

const styles = theme => ({
    loginForm: {
        padding: '0px 30px',
        marginTop: theme.spacing(1),
    },
});
class LoginForm extends Component {
    render() {
        const {
            classes,
            values: {email,password},
            errors,
            touched,
            handleChange,
            isValid,
            setFieldTouched,
            handleSubmit,
            isLoading
        } = this.props;

        const change = (name,e) => {
            e.persist();
            handleChange(e);
            setFieldTouched(name,true,false);
        }
        return (
            <form className={classes.loginForm} onSubmit={handleSubmit}>
                <Collapse in={this.props.responseAuthData.success===false?true:false}>
                <Alert
                    severity="error"

                    >{this.props.responseAuthData.message}</Alert>
                </Collapse>
                <TextField
                    variant="outlined"
                    margin="normal"
                    label="Email/Username"
                    name="email"
                    id="email"
                    type="text"
                    autoComplete="email"
                    autoFocus
                    fullWidth
                    onChange={change.bind(null, 'email')}
                    helperText = {touched.email?errors.email:""}
                    value={email}
                    error = {(errors.email&&touched.email)?true:false}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    autoFocus
                    fullWidth
                    required
                    onChange = {change.bind(null,'password')}
                    helperText={touched.password ? errors.password : ""}
                    value={password}
                    error={(errors.password && touched.password) ? true : false}
                />

                
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    className={classes.loginBtn}
                    disabled={!isValid || isLoading}
                >
                    {isLoading ? <CircularProgress size={30} /> : 'Masuk'}
                </Button>
                <Grid container>
                    <Grid item xs>

                    </Grid>
                    <Grid item>
                        <br />
                        <Link to="/forgotpassword" variant="body2">Lupa Password?</Link>                            </Grid>
                </Grid>
            </form>

                

        );
    }
}

export default withStyles(styles)(LoginForm);