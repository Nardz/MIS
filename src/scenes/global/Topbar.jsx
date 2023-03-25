import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';

import { Box, IconButton, useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import React, { useContext, useState } from 'react';
import { ColorModeContext, tokens } from '../../theme';

import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { dataEditList, JOVehicleList, poFuel } from '../../data/mockData';

import { Link } from 'react-router-dom';
const Topbar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);

	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<Box display="flex" justifyContent="space-between" p={2}>
			{/* SEARCH BAR */}

			<Box
				display="flex"
				backgroundColor={colors.primary[400]}
				borderRadius="3px"
			>
				<InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
				<IconButton type="button" sx={{ p: 1 }}>
					<SearchIcon />
				</IconButton>
			</Box>

			{/* ICONS */}
			<Box display="flex">
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === 'dark' ? (
						<DarkModeOutlinedIcon />
					) : (
						<LightModeOutlinedIcon />
					)}
				</IconButton>
				<IconButton
					aria-label="show 17 new notifications"
					component={Link}
					to="/pending"
				>
					<Badge
						badgeContent={
							poFuel.length + JOVehicleList.length + dataEditList.length
						}
						color="error"
					>
						<NotificationsOutlinedIcon />
					</Badge>
				</IconButton>

				<IconButton
					aria-label="account of current user"
					aria-haspopup="true"
					onClick={handleMenu}
					color="inherit"
				>
					<PersonOutlinedIcon />
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
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose}>My Account</MenuItem>
					<MenuItem onClick={handleClose}>Sign Out</MenuItem>
				</Menu>
			</Box>
		</Box>
	);
};

export default Topbar;
