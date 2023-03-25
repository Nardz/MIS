import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import React, { forwardRef } from 'react';

const myAlert = forwardRef(function Alert(props, ref) {
	return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MySnackBar = ({ open, onClose, severity, message, title }) => {
	return (
		<>
			{/* <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
				<Alert
					onClose={onClose}
					severity={severity}
					variant="filled"
					sx={{ color: 'white' }}
				>
					<AlertTitle sx={{ fontWeight: 'bold' }}>{title}</AlertTitle>
					{message}
				</Alert>
			</Snackbar> */}
		</>
	);
};

export default MySnackBar;
