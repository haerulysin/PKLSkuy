import React, { Component } from 'react';
import {
    withStyles,
    Grid,
    Container,
    Typography,
    Divider,
    Tabs,
    Tab
} from '@material-ui/core';
import {Link} from 'react-router-dom';
const styles = theme => ({
    root:{
        background: '#FF7200',
        color: '#fff'
    }
});
class headerProyek extends Component {
    constructor(props){
        super(props);
        this.state = {
            tabsHeaderValue: 0,
            pageNameIndex : ['about','contact'],
            myHistory : this.props.history,
            
        };

    }
    
    static getDerivedStateFromProps(props,state){
        const { pages } = props.match.params;
        if(pages){
            if(pages === "proposal"){
                return{
                    tabsHeaderValue:1
                }
            }
            if (pages === "details") {
                return {
                    tabsHeaderValue: 0
                }
            }
        }
        return null;
    }


    componentDidMount(){
        if(this.props.pages==='proposal'){
            this.setState({tabsHeaderValue:1})
        }


    }
    
    handleHeaderbtnChange(event,newValue){
        this.setState({tabsHeaderValue:newValue});
    }
    render() {
        const {classes} = this.props;
        return (
            <Grid container className={classes.root}>
                <Container style={{marginTop:'20px'}}>
                    <Grid container direction="column">
                        <Grid item>
                            <br/>
                            <Typography variant="h2">BUTUH TUKANG BUAT BANGUN MESJID</Typography>
                        </Grid>
                        <Grid item>
                            <br/>
                            <Divider light={true} style={{background:'#fff',height:2}} />
                            <br/>
                        </Grid>
                        <Grid item>
                            <Tabs
                                value = {this.state.tabsHeaderValue}
                                onChange={this.handleHeaderbtnChange.bind(this)}
                                indicatorColor="secondary"
                                textColor="secondary"
                            >
                                <Tab label="Detail" component={Link} to={"/proyek/"+this.props.id+"/details"}/>
                                <Tab label="Proposal" component={Link} to={"/proyek/" + this.props.id + "/proposal"} />
                            </Tabs>
                        </Grid>
                    </Grid>
                    </Container>
            </Grid>
        );
    }
}

export default withStyles(styles)(headerProyek);