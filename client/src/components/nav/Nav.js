import React, { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Hidden, Box } from '@mui/material';
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Nav = ({ token }) => {
  const auth = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center" flexGrow={1}>
          {/* Burger menu on small screens */}
          <Hidden mdUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Fake Item</MenuItem>
            </Menu>
          </Hidden>
  
          <Hidden smDown>
            <Typography variant="h6" component="div" sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
              <NavLink to="#fakeItem" style={{ textDecoration: "none", color: "white" }}>
                Stuff Made Here
              </NavLink>
            </Typography>
          </Hidden>
        </Box>
  
        {auth.isLoggedIn ? (
          <>
            <MenuItem color="inherit" onClick={auth.logout}>
              Logout
            </MenuItem>
          </>
        ) : (
          <NavLink to="/login" style={{ textDecoration: "none" }}>
            <MenuItem color="inherit">Login</MenuItem>
          </NavLink>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
