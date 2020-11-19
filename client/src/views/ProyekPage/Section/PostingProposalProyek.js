import React, { Component } from 'react';
import{
    withStyles,
    Grid,
    Typography,
    Card,
    CardContent,
    InputAdornment,
    TextField,
    InputLabel,
    Divider,
    Button
} from '@material-ui/core';

const styles = theme => ({
    root:{
        background : '#fff'
    }
});
class PostingProposalProyek extends Component {
    render() {
        const {
            values: { proposalDescription,proposalBudget},
            errors,
            touched,
            handleChange,
            isValid,
            setFieldTouched,
            handleSubmit,
            classes
        } = this.props;
        const change = (name, e) => {
            e.persist();
            handleChange(e);
            setFieldTouched(name, true, false);
        }
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12} style={{ padding: '14px 16px'}}>
                    <Typography variant="h4">Masukkan Proposal di Proyek ini</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Grid container direction="column" spacing={3}>
                                    <Grid item>
                                        <Typography variant="body1">Anda bisa mengubah proposal ini sampai Pekerja memilih proposal yang diinginkan.</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h5">Rincian Proposal</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container>
                                            <Grid item>
                                                <InputLabel>Biaya yang diperlukan</InputLabel>
                                                <TextField
                                                    id="input-with-icon-textfield"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Typography>Rp.</Typography>
                                                            </InputAdornment>
                                                        ),
                                                    }}

                                                    name="proposalBudget"
                                                    helperText={touched.proposalBudget ? errors.proposalBudget : ""}
                                                    value={proposalBudget}
                                                    onChange={change.bind(null, "proposalBudget")}
                                                    error={(errors.proposalBudget && touched.proposalBudget) ? true : false}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item>
                                        <Typography variant="h5">Deskripsi proposal</Typography>
                                        <br />
                                        <TextField
                                            id="outlined-multiline-static"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            placeholder="Deskripsikan detail proposal anda di bagian ini."
                                            fullWidth
                                            name="proposalDescription"
                                            helperText={touched.proposalDescription ? errors.proposalDescription : ""}
                                            value={proposalDescription}
                                            onChange={change.bind(null, "proposalDescription")}
                                            error={(errors.proposalDescription && touched.proposalDescription) ? true : false}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Divider />
                                    </Grid>
                                    <Grid item style={{ textAlign: 'right' }}>

                                        <Button variant="contained" color="primary" type="submit" disabled={!isValid || this.props.isLoading}>{this.props.btnPlaceholder ? this.props.btnPlaceholder :'Ajukan Proposal'}</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(PostingProposalProyek);