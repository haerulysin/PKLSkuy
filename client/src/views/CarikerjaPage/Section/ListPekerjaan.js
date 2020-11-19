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
    render() {

        if (this.props.isLoading) {
            return (
                <div style={{ marginTop: 30, textAlign: 'center' }}>
                    <CircularProgress color="primary" />
                </div>
            );
        }

        const {
            classes,
            projectData,
            pageData,
        } = this.props;
        const pageSize = (parseInt(projectData.rows / 5) + 1);
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12} className={classes.headerList}>
                    <div style={{ padding: '5px 8px' }}>
                        <Typography
                        >{projectData.data.length} pekerjaan ditampilkan.
                    </Typography>
                    </div>
                </Grid>



                <Grid item xs={12} container direction="column">
                    <Grid item>
                        {projectData.data.map(item => (
                            <ListCard
                                key={item._id}
                                {...item}
                                {...this.props}
                            />
                        ))}
                    </Grid>
                    <Grid item style={{ display: 'flex', justifyContent: "center", padding: 14 }}>
                        {pageSize > 0 &&
                            <Pagination
                                count={pageSize}
                                page={pageData}
                                variant="outlined"
                                shape="rounded"
                                showFirstButton
                                showLastButton
                                onChange={this.props.handlePagesChange}
                            />
                        }
                    </Grid>
                </Grid>

            </Grid>
        );
    }
}

export default withStyles(styles)(ListPekerjaan);