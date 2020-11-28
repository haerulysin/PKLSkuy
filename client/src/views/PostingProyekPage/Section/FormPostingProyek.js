import React, { Component } from 'react';

import {
    withStyles,
    Grid,
    Card,
    CardContent,
    Button,
    Divider,
    CircularProgress, Typography, InputAdornment,
    


} from '@material-ui/core';
import DragnDropPhoto from './CustomComponent/DragnDropPhoto';
import Inputs from './CustomComponent/Inputs';
import Selects from './CustomComponent/Selects';
import Autocomplete from 'react-google-autocomplete';
import { animateScroll } from "react-scroll";


const styles = theme => ({
    root: {
        marginTop: '-0px',
        marginBottom: '120px'
    },
    uploadPhotoWrapper: {
        border: '1px dashed #ddd',
        padding: '10px 13px',
        justifyContent: 'center',
        alignItems: 'center'
    },

    autocompleteInput: {
        '&:onblur': {
            border: '1px solid #000',
            borderRadius: 0,
        },
        width: '100%',
        borderRadius: 0,
        marginTop: '10px',
        border: '0.5px solid #bbb',
        fontSize: 15,
        padding: '12px 5px',
    }
});



class FormPostingProyek extends Component {
    constructor(props) {
        super(props);
        this.pageRef = React.createRef();
        this.state = {
            displayAddressForm: true,
        }
    }

    componentDidMount() {
    }



    handleClickOpenAddressForm(e) {
        this.setState({ displayAddressForm: true });
        animateScroll.scrollMore(150, {
            duration: 500,
            delay: 0,
            smooth: true,
        })

    }

    render() {
        const {
            values: { projectCategory, projectDescription, projectName, projectDeadline, projectBudgetmax, projectBudgetmin, addressFull, addressCity, addressProvince },
            errors,
            touched,
            handleChange,
            isValid,
            setFieldTouched,
            handleSubmit,
            isLoading,
            setFieldValue


        } = this.props;
        const change = (name, e) => {
            e.persist();
            handleChange(e);
            setFieldTouched(name, true, false);

        }

        const onPlaceSelected = (e) => {
            const componentForm = {
                street_number: "short_name",
                route: "long_name",
                administrative_area_level_2: "long_name",
                administrative_area_level_1: "long_name",
            };
            let addressValue = [];
            for (const component of e.address_components) {
                const addressType = component.types[0];
                console.log(component['route'])
                if (componentForm[addressType]) {
                    console.log(addressType)
                    addressValue[addressType] = component[[componentForm[addressType]]]

                }
            }

            if (!addressValue['street_number']) addressValue['street_number'] = '';
            setFieldValue('addressFull', addressValue['route'] + ' ' + addressValue['street_number']);
            setFieldValue('addressCity', addressValue['administrative_area_level_2']);
            setFieldValue('addressProvince', addressValue['administrative_area_level_1']);
            this.props.handleOnPlaceSelected(e);

        }
        const { classes } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Grid container className={classes.root}>
                    <Grid item xs={1} md={3} />
                    <Grid item xs={10} md={6}>
                        <Card>
                            <CardContent>
                                <Grid container direction="column" spacing={3}>

                                    <Grid item xs={12}>
                                        <Selects
                                            value={projectCategory}
                                            name='projectCategory'
                                            id='projectCategory'
                                            onChange={handleChange('projectCategory')}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Inputs
                                            labels="Beri judul proyek anda"
                                            placeholder="Contoh : Butuh proyek membangun Masjid"
                                            fullWidth
                                            name="projectName"
                                            id="projectName"
                                            value={projectName}
                                            onChange={change.bind(null, 'projectName')}
                                            error={(errors.projectName && touched.projectName) ? true : false}
                                            helpertext={touched.projectName ? errors.projectName : ""}

                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Inputs
                                            labels="Beritahu lengkap tentang proyek anda"
                                            placeholder="Contoh : Butuh proyek membangun Masjid"
                                            fullWidth
                                            keterangan="Deskripsikanlah sedikit tentang detail apa yang anda butuhkan, dan sertakan gambaran tentang proyek anda."
                                            multiline
                                            rows={4}
                                            name="projectDescription"
                                            id="projectDescription"
                                            value={projectDescription}
                                            onChange={change.bind(null, 'projectDescription')}
                                            error={(errors.projectDescription && touched.projectDescription) ? true : false}
                                            helpertext={touched.projectDescription ? errors.projectDescription : ""}
                                        />


                                    </Grid>

                                    <Grid item xs={12} container alignItems="center" spacing={0}>
                                        <Grid item xs={12}>
                                            <Typography variant="h4">Beri dana untuk proyek anda</Typography>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Inputs
                                                placeholder="300000"
                                                type="number"
                                                fullWidth
                                                name="projectBudgetmin"
                                                id="projectBudgetmin"
                                                startAdornment={<InputAdornment position="end">Rp.</InputAdornment>}
                                                value={projectBudgetmin}
                                                onChange={change.bind(null, 'projectBudgetmin')}
                                                error={(errors.projectBudgetmin && touched.projectBudgetmin) ? true : false}
                                                helpertext={touched.projectBudgetmin ? errors.projectBudgetmin : ""}

                                            />
                                        </Grid>
                                        <Grid item xs={2} >
                                            <Typography align="center">-</Typography>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Inputs
                                                placeholder="300000"
                                                fullWidth
                                                type="number"
                                                startAdornment={<InputAdornment position="end">Rp.</InputAdornment>}
                                                name="projectBudgetmax"
                                                id="projectBudgetmax"
                                                value={projectBudgetmax}
                                                onChange={change.bind(null, 'projectBudgetmax')}
                                                error={(errors.projectBudgetmax && touched.projectBudgetmax) ? true : false}
                                                helpertext={touched.projectBudgetmax ? errors.projectBudgetmax : ""}

                                            />
                                        </Grid>
                                    </Grid>


                                    <Grid item xs={12}>
                                        <Inputs
                                            labels="Beri waktu tenggang proyek anda"
                                            fullWidth
                                            type="date"
                                            name="projectDeadline"
                                            id="projectDeadline"
                                            value={projectDeadline}
                                            onChange={change.bind(null, 'projectName')}
                                            error={(errors.projectName && touched.projectName) ? true : false}
                                            helpertext={touched.projectName ? errors.projectName : ""}

                                        />
                                    </Grid>



                                    <Grid item>
                                        <DragnDropPhoto
                                            uploadPercentage={this.props.uploadPercentage}
                                            handleOnAddPhoto={this.props.handleOnAddPhoto}
                                            handleRemovePhoto={this.props.handleRemovePhoto}
                                        />
                                    </Grid>

                                    {!this.state.displayAddressForm &&
                                        <Grid item style={{ textAlign: 'right' }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={isLoading}
                                                onClick={this.handleClickOpenAddressForm.bind(this)}
                                            >
                                                {isLoading ? <CircularProgress color="secondary" size={26} /> : ''}Selanjutnya
                                        </Button>
                                        </Grid>
                                    }
                                    {this.state.displayAddressForm &&
                                        <Grid item xs={12} container spacing={1}>
                                            <Grid item xs={12}>
                                                <Typography variant="h4">Beritahu dimana proyek anda</Typography>
                                                <Typography variant="caption" color="inherit">Masukkan alamat lengkap atau/dan letakkan titik pada map.</Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Autocomplete
                                                    className={classes.autocompleteInput}
                                                    onPlaceSelected={onPlaceSelected.bind(this)}
                                                    types={['geocode']}
                                                     apiKey={"AIzaSyBpKP3xuaU6JYfzQKnDzs3HWOMCC7WFYlI"}
                                                    placeholder="Masukkan alamat lengkap"
                                                    componentRestrictions={{ country: "ID" }}
                                                />
                                            </Grid>

                                            {!this.props.manualAddressInput &&
                                                <Grid item xs={12}>
                                                    <a href="x" onClick={this.props.handleOnManualAddressInput}>Saya ingin input alamat secara manual.</a>
                                                </Grid>
                                            }



                                            {this.props.manualAddressInput &&
                                                <Grid item xs={12}>
                                                    <Inputs
                                                        placeholder="Masukkan nama jalan"
                                                        fullWidth
                                                        name="addressFull"
                                                        id="addressFull"
                                                        value={addressFull}
                                                        onChange={change.bind(null, 'addressFull')}
                                                        error={(errors.addressFull && touched.addressFull) ? true : false}
                                                        helpertext={touched.addressFull ? errors.addressFull : ""}
                                                    />
                                                </Grid>
                                            }

                                            {this.props.manualAddressInput &&

                                                <Grid item xs={6}>
                                                    <Inputs
                                                        placeholder="Masukkan Kota"
                                                        fullWidth
                                                        name="addressCity"
                                                        id="addressCity"
                                                        value={addressCity}
                                                        onChange={change.bind(null, 'addressCity')}
                                                        error={(errors.addressCity && touched.addressCity) ? true : false}
                                                        helpertext={touched.addressCity ? errors.addressCity : ""}
                                                    />
                                                </Grid>
                                            }
                                            {this.props.manualAddressInput &&


                                                <Grid item xs={6}>
                                                    <Inputs
                                                        placeholder="Masukkan Provinsi"
                                                        fullWidth
                                                        name="addressProvince"
                                                        id="addressProvince"
                                                        value={addressProvince}
                                                        onChange={change.bind(null, 'addressProvince')}
                                                        error={(errors.addressProvince && touched.addressProvince) ? true : false}
                                                        helpertext={touched.addressCity ? errors.addressProvince : ""}
                                                    />
                                                </Grid>
                                            }


                                        </Grid>
                                    }


                                    <br />
                                    <Divider variant="middle" />
                                    <Grid item style={{ textAlign: 'right' }}>
                                        <br />
                                        {this.state.displayAddressForm &&
                                            <Button variant="contained" color="primary" disabled={!isValid || isLoading} type="submit">{isLoading ? <CircularProgress color="secondary" size={26} /> : ''}Posting Proyek</Button>
                                        }
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={1} md={3} />
                </Grid>
            </form>

        );
    }
}

export default withStyles(styles)(FormPostingProyek);