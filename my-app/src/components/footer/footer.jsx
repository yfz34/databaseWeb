import React from 'react'
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

function Footer() {
	return (
		<Box mt={8}>
			<Typography variant="body2" color="textSecondary" align="center">
				{'Copyright © '}
				<Link color="inherit" href="">
					Allen
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
    </Box>
	);
}

export default Footer