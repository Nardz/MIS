import BorderColorIcon from '@mui/icons-material/BorderColor';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import EditIcon from '@mui/icons-material/Edit';
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { Box, useTheme } from '@mui/material/';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { tokens } from '../../theme';

const fabLink = (to, children) => (
	<Link to={to} style={{ textDecoration: 'none', color: 'white' }}>
		{children}
	</Link>
);

const actions = [
	{
		icon: fabLink('/form-fuel', <LocalGasStationOutlinedIcon />),
		name: 'Fuel',
	},
	// { icon: fabLink('/form-IT', <DevicesOutlinedIcon />), name: 'IT' },
	{
		icon: fabLink('/form-JOVehicle', <WorkOutlineOutlinedIcon />),
		name: 'Job Order',
	},
	{
		icon: fabLink('/form-dateEdit', <BorderColorIcon />),
		name: 'Data Edit',
	},
];

export default function SpeedDialTooltipOpen() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<Box
			sx={{
				height: '100%',
				//transform: 'translateZ(0px)',
				flexGrow: 1,
				//width: '100%',
			}}
		>
			<Backdrop open={open} />
			<SpeedDial
				sx={{ position: 'fixed', bottom: 16, right: 16 }}
				ariaLabel="Add New"
				icon={<SpeedDialIcon openIcon={<EditIcon />} />}
				onClose={handleClose}
				onOpen={handleOpen}
				open={open}
				FabProps={{
					sx: {
						bgcolor: colors.redAccent[500],
						'&:hover': {
							bgcolor: colors.redAccent[600],
						},
					},
				}}
			>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						tooltipOpen
						onClick={handleClose}
						to={action.to}
						FabProps={{
							sx: {
								bgcolor: colors.redAccent[500],
								'&:hover': {
									bgcolor: colors.redAccent[600],
								},
							},
						}}
					/>
				))}
			</SpeedDial>
		</Box>
	);
}
