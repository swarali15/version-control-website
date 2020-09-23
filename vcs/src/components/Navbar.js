import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login';
import Register from './Register'
import Repo from './RepositoryPage'

import { AuthProvider } from "../Auth";
import PrivateRoute from "../PrivateRoute";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'black',
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Version Control Website
          </Typography>
          
          <Link to ="/login"><Button color="white">Login</Button>
          </Link>

          <Link to ="/register"><Button color="white">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <AuthProvider>
      <Router>
        <div>
          <Route exact path="/" component={Repo} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
      </Router>
    </AuthProvider>
      
    </div>
  );
}
