import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar:{
    color: 'white',
    backgroundColor:'#1E90FF',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

function Nav(props) {

  // const handleSubmit=(e)=>{
  //   e.preventDefault();
  //   props.yTSearch()
  // }

  const classes = useStyles();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // const handleChange = event => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar style={{height:'80px'}}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" component={Link} to={'/'}>
            <HomeIcon />
          </IconButton>
          {/* <Button component={Link} to={'/'} className={classes.title}>
            <Typography variant="h6" className={classes.title}>
              <b>會員系統</b>
            </Typography>
          </Button> */}
          <Typography variant="h6" className={classes.title}>
            <b>會員系統</b>
          </Typography>
          <Button component={Link} to={'/datatable'} color="inherit"><b>資料查詢</b></Button>
          {auth ? <Button component={Link} to={'/login'} color="inherit"><b>登入</b></Button> : (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    // input: state.songlistReducer.input,
    // list: state.songlistReducer.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    // inputTerm,
    // yTSearch,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)