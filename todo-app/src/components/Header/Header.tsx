import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

function Header() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' style={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color='inherit' component={Link} to={routes.Home}>
          Home
        </Button>
        <Button color='inherit' component={Link} to={routes.NewTodo}>
          New Todo
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
