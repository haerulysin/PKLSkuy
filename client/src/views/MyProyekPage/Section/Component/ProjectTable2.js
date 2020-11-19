import React, { Component } from 'react';
import { withStyles, Paper, Typography, } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
const columnsProject = [
    {
        name: "judulproyek",
        label: "Judul Proyek",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "jenisproyek",
        label: "Jenis Proyek",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "lokasipekerjaan",
        label: "Lokasi pekerjaan",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "aksi",
        label: "Aksi",
        options: {
            filter: true,
            sort: false,
            align: 'center'
        }
    },
];


const columnsProposal = [
    {
        name: "judulproyek",
        label: "Judul Proyek",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "pemilikproyek",
        label: "Pemilik Proyek",
        options: {
            filter: true,
            sort: true,
        }
    },



    {
        name: "lokasipekerjaan",
        label: "Lokasi pekerjaan",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: 'status',
        label: "Status",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "aksi",
        label: "Aksi",
        options: {
            filter: true,
            sort: false,
            align: 'center'
        }
    },

];


const styles = theme => ({
    root: {

    },

    papers: {
        padding: '80px 0px',
        width: '100%',
        textAlign: 'center'
    }
})

class ProjectTable2 extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { classes } = this.props;

        if (!this.props.data || !this.props.data.length) {
            return (
                <Paper className={classes.papers}>
                    <img
                        src={require('../../../../assets/img/2122931 1.png')}
                        alt="Gambar Dashboard"
                    />
                    <Typography variant="h4">Mulailah menawar sekarang di proyek-proyek yang sesuai keahlian Anda.</Typography>
                </Paper>
            );
        }
        const options = {
            filter: false,
            search: false,
            print: false,
            download: false,
            viewColumns: false,
            customToolbar: null,
            responsive: 'standard',
            searchText: this.props.searchText,
            rowsPerPage: this.props.rowsPerPage,
            selectableRows: "none",
        };

        return (
            <div>
                {this.props.data.length &&
                    <MUIDataTable
                        data={this.props.data}
                        columns={this.props.dataCat === "project" ? columnsProject : columnsProposal}
                        options={options}
                    />
                }

            </div>
        );
    }
}

export default withStyles(styles)(ProjectTable2);