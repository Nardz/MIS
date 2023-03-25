import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import { appPoFuelList } from '../../data/mockData';
import { tokens } from '../../theme';

const columns = [
	{ field: 'id', headerName: 'ID', flex: 0.5 },
	{
		field: 'ponum',
		headerName: 'PO NUMBER',
		flex: 1,
		cellClassName: 'name-column--cell',
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'branch',
		headerName: 'BRANCH',
		flex: 1,
		cellClassName: 'name-column--cell',
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'podate',
		headerName: 'DATE',
		type: 'text',
		headerAlign: 'center',
		align: 'center',
	},

	{
		field: 'platenum',
		headerName: 'VEHICLE',
		flex: 1,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'fueltype',
		headerName: 'FUEL TYPE',
		flex: 1,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'route',
		headerName: 'ROUTE',
		flex: 1,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'bags',
		headerName: 'NO. OF BAGS',
		flex: 1,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'numblitres',
		headerName: 'NO. OF LITRES',
		flex: 1,
		headerAlign: 'center',
		align: 'center',
	},

	{
		field: 'view',
		headerName: 'VIEW DETAILS',
		type: 'text',
		headerAlign: 'center',
		align: 'center',
		renderCell: ({ row: { id } }) => {
			return (
				<>
					<Button
						variant="contained"
						id={id}
						startIcon={<VisibilityIcon />}
						color="info"
						sx={{ fontWeight: 'bold', borderRadius: '100px' }}
						component={Link}
						to={`/approvedFuel/${id}`}
					>
						VIEW
					</Button>
				</>
			);
		},
	},
];
const PoFuel = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<>
			<Box m="0" p="0" width="100%" height="55vh">
				<Box
					// m="40px 0 0 0"

					width="100%"
					height="60vh"
					sx={{
						'& .MuiDataGrid-root': {
							border: 'none',
						},
						'& .MuiDataGrid-cell': {
							borderBottom: 'none',
						},
						'& .name-column--cell': {
							color: colors.greenAccent[300],
						},
						'& .MuiDataGrid-columnHeaders': {
							backgroundColor: colors.greenAccent[700],
							borderBottom: 'none',
							padding: 0,
							margin: 0,
						},
						'& .MuiDataGrid-virtualScroller': {
							backgroundColor: colors.primary[400],
						},
						'& .MuiDataGrid-footerContainer': {
							borderTop: 'none',
							backgroundColor: colors.greenAccent[700],
						},
						'& .MuiCheckbox-root': {
							color: `${colors.greenAccent[200]} !important`,
						},
						'& .MuiDataGrid-toolbarContainer .MuiButton-text': {
							color: `${colors.grey[100]} !important`,
						},
						mb: 15,
					}}
				>
					<DataGrid
						rows={appPoFuelList}
						columns={columns}
						components={{ Toolbar: GridToolbar }}
					/>
				</Box>
			</Box>
		</>
	);
};

export default PoFuel;
