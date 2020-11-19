import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
//Views Components
import Home from './views/Home';
import RegisterPage from './views/RegisterPage';
import CariKerjaPage from './views/CarikerjaPage';
import LoginPage from './views/LoginPage';
import ProfilePage from './views/ProfilePage';
import ProyekPage from './views/ProyekPage';
import PesanPage from './views/PesanPage';
import MyProyekPage from './views/MyProyekPage';
import UserPage from './views/UserPage';
import PostingProyekPage from './views/PostingProyekPage';
import RegisterStep2 from './views/RegisterPage/step2';
const routes = (props) => {
    const { auth } = props;
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/u/:id' exact component={ProfilePage} />
            <Route path='/register' exact component={RegisterPage} />
            <Route path='/register/step2' exact component={RegisterStep2} />
            <Route path='/carikerja' exact component={CariKerjaPage} />
            <Route path='/login' exact component={LoginPage} />
            <Route path='/proyek/:id/:pages' exact component={ProyekPage} />
            <Route path='/mymessage' exact component={PesanPage} />
            <Route path='/dashboard/:pages' exact component={MyProyekPage} />
            <Route path='/dashboard' exact component={MyProyekPage} />
            <Route path='/user/setting' exact render={() => (auth.isAuthenticated ? <UserPage /> : (<Redirect to="/" />))} />


            <Route path='/posting/proyek' exact component={PostingProyekPage} />

            <Redirect path="/u" exact to="/" />
            <Redirect path='/posting' exact to="/posting/proyek" />
            <Redirect path='/user' exact to="/user/setting" />
            <Redirect path='/proyek/:id' exact to="/proyek/:id/details" />

        </Switch>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(routes);