import React, { Component } from 'react';
import LoginDialog from '../../components/MainLayout/Section/LoginDialog';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: true,
        }
    }
    render() {
        return (
            <div style={{background:'#fff'}}>
                <LoginDialog {...this.state} handleCloseModal={this.handleCloseModal} />
            </div>
        );
    }
}

export default index;