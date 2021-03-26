import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';

import WithAuth from './middleware/WithAuth'
import Guest from './middleware/Guest'
import AppHeader from './components/AppHeader';
import Home from './pages/Home';
import Cameras from './pages/cameras/Cameras';
import CameraView from './pages/cameras/CameraView';
import LogIn from './pages/auth/LogIn';
import SignUp from './pages/auth/SignUp';

const styles = theme => ({
  main: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
});

const App = ({ classes }) => (
    <Fragment>
      <CssBaseline />
      <AppHeader />
      <main className={classes.main}>
          <Route exact path="/" component={WithAuth(Home)} />
          <Route exact path="/cameras" component={WithAuth(Cameras)} />
          <Route exact path="/camera-view/:id" component={WithAuth(CameraView)} />
          <Route exact path="/login" component={Guest(LogIn)} />
          <Route exact path="/signup" component={Guest(SignUp)} />
      </main>
    </Fragment>
);

export default withStyles(styles)(App);
