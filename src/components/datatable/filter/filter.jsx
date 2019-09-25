import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField';
import { createMuiTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';

import {pagerDataTable} from '../../../actions/axios'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

function FilterPanel(props){
	const classes = useStyles();

  const [values, setValues] = React.useState({
		page: 0,
		count: 0
	});

	const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
	};

	const theme = createMuiTheme({
		palette: {
			primary: green,
		},
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('handleSubmit!');
		console.log('pagexx:',e.target[0].value);
		console.log('countxx:',e.target[2].value);
		console.log('page:',values.page);
		console.log('count:',values.count);
		props.pagerDataTable(values.page, values.count)
	}
	return(
		<div>
			<p>搜索條件</p>
			<form className={classes.form} noValidate onSubmit={(e)=>handleSubmit(e)}>
				<TextField
					id="standard-number"
					label="Page"
					value={values.page}
					onChange={handleChange('page')}
					type="number"
					className={classes.textField}
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>
				<TextField
					id="standard-number"
					label="Count"
					value={values.count}
					onChange={handleChange('count')}
					type="number"
					className={classes.textField}
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>
				<ThemeProvider theme={theme}>
					<Button 
						variant="contained" 
						color="primary" 
						className={classes.button}
						type="submit"
					>
						搜索
					</Button>	
				</ThemeProvider>
			</form>
		</div>
	)
}

const mapStateToProps = (state) => {
  return {
    columns: state.dataTableReducer1.columns,
    tableColumnExtensions: state.dataTableReducer1.tableColumnExtensions,
    rows: state.dataTableReducer1.rows,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    pagerDataTable,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel)