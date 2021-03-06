import React, { useEffect, useState, cloneElement } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, InputBase,
MenuItem, Badge, Menu, Grid} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { ShoppingCart, PowerSettingsNew } from '@material-ui/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    display: 'table'
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    // position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'green',
  },
  inputRoot: {
    color: 'black',
    paddingLeft: 8,
    background: 'rgba(255, 255, 255, 0.5)',
    marginLeft: 24,
    borderRadius: 4,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    // display: 'none',
    // [theme.breakpoints.up('md')]: {
    //   display: 'flex',
    // },
  },
  sectionMobile: {
    display: 'none'
    // display: 'flex',
    // [theme.breakpoints.up('md')]: {
    //   display: 'none',
    // },
  },
}));

function PrimarySearchAppBar({ children }) {
  const router = useRouter();
  const [state, setState] = useState(null);
  useEffect(() => {
    const cookies = parseCookies();
    if (cookies && cookies.user) {
      console.log(router.pathname);
      const {token} = JSON.parse(cookies.user);
      axios.get(`/api/user/check/${token}`)
      .then(({data}) => setState(data))
      .catch(err => {
        console.log(err.response)
      });
    } else {
      setState(null);
    }
  }, [router.pathname])
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // console.log(state)
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logOut = () => {
    destroyCookie(null, 'user')
    router.push('/login')
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link href="/login">
        <a><MenuItem onClick={handleMenuClose}>Login</MenuItem></a>
      </Link>
      <Link href="/register">
        <a><MenuItem onClick={handleMenuClose}>Register</MenuItem></a>
      </Link>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Link href='/'>
            <a>
              <Typography className={classes.title} variant="h6" noWrap>
                E-Store
              </Typography>
            </a>
          </Link>
            <InputBase
              placeholder="Search???"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {
              state ? (
                <>
                <Link href="/cart">
                  <IconButton aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={state.cartCount} color="error">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </Link>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={logOut}
                >
                  <PowerSettingsNew />
                </IconButton>
            </>
              ) : (
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              )
            }
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {/* {cloneElement(children, state)} */}
      {children}
    </div>
  );
}


export default PrimarySearchAppBar;
