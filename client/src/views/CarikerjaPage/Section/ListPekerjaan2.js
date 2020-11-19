import React, { Component } from 'react';

//MaterialUI Core
import {
    Grid,
    Typography,
    withStyles,
    CircularProgress
} from '@material-ui/core';

import {
    Pagination
} from '@material-ui/lab'

import axios from 'axios';

//CustomComponent
import ListCard from './CustomComponent/ListPekerjaanCard';


const styles = theme => ({
    root: {
        background: '#fff',
    },
    headerList: {
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        borderBottom: '1px solid #ddd',

    },
});

class ListPekerjaan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectData: {
                data: []
            },

            isLoading: true,

            pageData: 1
        }
    }

    componentDidMount() {
        this.getListPekerjaan(1);
    }

    componentWillUnmount() {
        this.setState({ projectData: { data: [] } })
    }

    async getListPekerjaan(page) {
        await axios.get('/api/projectList/?page=' + page)
            .then(res => {
                this.setState({ projectData: res.data });
            })
            .catch(err => { return err });

        await this.setState({ isLoading: false })

    }

    handlePagesChange(e, values) {
        this.setState({ pageData: values, isLoading: true });
        this.getListPekerjaan(values);
    }

    render() {
        console.log(this.state.projectData)

        if (this.state.isLoading) {
            return (
                <div style={{ marginTop: 30, textAlign: 'center' }}>
                    <CircularProgress color="primary" />
                </div>
            );
        }
        const { classes } = this.props;
        const { projectData } = this.state;

        const pageSize = (parseInt(this.state.projectData.rows / 5) + 1);


        return (
            <Grid container className={classes.root}>
                <Grid item xs={12} className={classes.headerList}>
                    <div style={{ padding: '5px 8px' }}>
                        <Typography
                        >{projectData.rows} pekerjaan ditampilkan.
                    </Typography>
                    </div>
                </Grid>

                <Grid item xs={12} container direction="column" spacing={0}>
                    {this.state.projectData.data.map(item => (
                        <ListCard
                            key={item._id}
                            {...item}
                            {...this.props}
                        />
                    ))}

                    <Grid item style={{ display: 'flex', justifyContent: "center", padding: 14 }}>
                        {pageSize > 0 &&
                            <Pagination count={pageSize} page={this.state.pageData} variant="outlined" shape="rounded" showFirstButton showLastButton onChange={this.handlePagesChange.bind(this)} />
                        }
                    </Grid>
                </Grid>


            </Grid>

        );
    }
}

export default withStyles(styles)(ListPekerjaan);