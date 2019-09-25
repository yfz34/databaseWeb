import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {login} from '../../actions/axios'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
	const handleClick = () => console.log('Clicked!');
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('handleSubmit!');
		console.log('帳號:',e.target[0].value);
		console.log('密碼:',e.target[2].value);
		props.login(e.target[0].value, e.target[2].value)
	}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          會員登入
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e)=>handleSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="id"
            label="帳號"
            name="id"
            autoComplete="id"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="密碼"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="記住我"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
						className={classes.submit}
						
          >
            登入
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                忘記密碼?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"還不是會員嗎?? 註冊新帳號"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
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
		login,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)