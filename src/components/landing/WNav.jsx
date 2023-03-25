import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import { tokens } from '../../theme';
const WNav = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<>
			<Outlet />
			<Box
				sx={{
					position: 'fixed',
					bottom: 16,
					left: 'calc(50% - 190px )',
					width: '380px',
					color: colors.grey[300],
				}}
			>
				<Typography sx={{ fontSize: '10px' }}>
					COPYRIGHT © 2023 TACLOBAN WINNER MARKETING CORPORATION. ALL RIGHTS
					RESERVED
				</Typography>
			</Box>
		</>
	);
};

export default WNav;

// import { Outlet } from 'react-router';

// export default () => <Outlet />;
