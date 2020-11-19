import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
//MaterialUI Core
import { ThemeProvider } from '@material-ui/core';
//JSS
import GlobalStyles from './assets/jss/GlobalStyles';
import theme from './components/Theme';
//MainLayout
import MainLayout from './components/MainLayout';
//AuthRequire
import store from './store';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './redux/utils/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}
class App extends Component {
  render() {
    
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <BrowserRouter>
            <MainLayout/>
            <Routes />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;