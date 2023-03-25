import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import { mockDataContacts } from '../../data/mockData';
import { tokens } from '../../theme';

const Users = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const columns = [
		{ field: 'id', headerName: 'ID', flex: 0.5 },
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			cellClassName: 'name-column--cell',
			headerAlign: 'center',
		},

		{
			field: 'status',
			headerName: 'Status',
			type: 'text',
			headerAlign: 'center',
			align: 'center',
			renderCell: ({ row: { status } }) => {
				return (
					<>
						<Chip
							color={status === 'active' ? 'success' : 'error'}
							label={status}
							variant="outlined"
						/>
					</>
				);
			},
		},

		{
			field: 'accessLevel',
			headerName: 'Access Level',
			flex: 1,
			headerAlign: 'center',
			align: 'center',
			renderCell: ({ row: { userType } }) => {
				return (
					<>
						<Chip
							avatar={
								userType === 'admin' ? (
									<AdminPanelSettingsOutlinedIcon />
								) : userType === 'manager' ? (
									<SecurityOutlinedIcon />
								) : (
									userType === 'user' && <LockOpenOutlinedIcon />
								)
							}
							label={userType}
						/>
					</>
				);
			},
		},

		{
			field: 'view',
			headerName: 'View Details',
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
							to={`/employees/${id}`}
						>
							VIEW
						</Button>
					</>
				);
			},
		},
	];

	return (
		<Box m="20px">
			<Header title="Employees" subtitle="List of Employees" />
			<Box
				m="40px 0 0 0"
				height="70vh"
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
					rows={mockDataContacts}
					columns={columns}
					components={{ Toolbar: GridToolbar }}
				/>
			</Box>
		</Box>
	);
};

export default Users;
