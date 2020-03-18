import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

import * as AuthActions from '../../store/modules/auth/actions';

import useStyles from './styles';

function Navbar() {
  const [drawer, setDrawer] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const name = useSelector(state => state.auth.name);

  function handleSignOut() {
    dispatch(AuthActions.signOut());
  }

  const toggleDrawer = event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawer(!drawer);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Sistema da Loja
          </Typography>
          <Typography>Bem-vindo {name}!</Typography>
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} open={drawer} onClose={toggleDrawer}>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List color="#3f51b5">
            <Link to="/dashboard">
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon htmlColor="#fff" />
                </ListItemIcon>
                <ListItemText primary="Dashboard" style={{ color: '#fff' }} />
              </ListItem>
            </Link>

            <Link to="/vendas">
              <ListItem button>
                <ListItemIcon>
                  <ShoppingCartIcon htmlColor="#fff" />
                </ListItemIcon>
                <ListItemText primary="Vendas" style={{ color: '#fff' }} />
              </ListItem>
            </Link>

            <Link to="/produtos">
              <ListItem button>
                <ListItemIcon>
                  <ListAltIcon htmlColor="#fff" />
                </ListItemIcon>
                <ListItemText primary="Produtos" style={{ color: '#fff' }} />
              </ListItem>
            </Link>

            <Link to="/clientes">
              <ListItem button>
                <ListItemIcon>
                  <GroupIcon htmlColor="#fff" />
                </ListItemIcon>
                <ListItemText primary="Clientes" style={{ color: '#fff' }} />
              </ListItem>
            </Link>

            <Link to="/usuarios">
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleIcon htmlColor="#fff" />
                </ListItemIcon>
                <ListItemText primary="Usuários" style={{ color: '#fff' }} />
              </ListItem>
            </Link>

            <ListItem button onClick={handleSignOut}>
              <ListItemIcon>
                <ExitToAppIcon htmlColor="#fff" />
              </ListItemIcon>
              <ListItemText primary="Desconectar" style={{ color: '#fff' }} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default Navbar;
