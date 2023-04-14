import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link ,useNavigate} from 'react-router-dom';
import Header from '../../components/header/Header';
import { mockDataContacts } from '../../data/mockData';
import { tokens } from '../../theme';
import { useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const Users = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const token = sessionStorage.getItem("token")
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	};
	const [emplist, setEmplist] = useState([])
	//const [Pic, setPic] = useState('');

	const getEmpList = async () =>{
			await axiosInstance.get('Employee/Emplist',config)
			.then((res)=>{
				//console.log(res.data)
				setEmplist(res.data)
			//	console.log(emplist)

			}).catch((err) =>{
				console.log(err)
					const variant = 'error';
					enqueueSnackbar('Unable to get employee list ', {
					variant,
				});
				if (err.code == 'ERR_NETWORK' || err.response.status == 401) {
						sessionStorage.clear()
						navigate('/login');
				}
			})
	}

	useEffect(() => {
		getEmpList()
	},[])



	

	// function checkIfImageExists(url, callback) {
	// 	const img = new Image();
	// 	img.src = url;
		
	// 	if (img.complete) {
	// 		callback(true);
	// 	} else {
	// 		img.onload = () => {
	// 			callback(true);
	// 		};
			
	// 		img.onerror = () => {
	// 			callback(false);
	// 		};
	// 	}
	// }
	
		

		// const getImage =  (empId) =>{

		// 	const yourImage = process.env.PUBLIC_URL + `assets/user/${empId}.png`;
	     const defaultImage = process.env.PUBLIC_URL + `assets/user/user.png`;

		// checkIfImageExists(yourImage, (exists) => {
		// 	if (exists) {
		// 		setPic(yourImage)
		// 	} else {
		// 		setPic(defaultImage)
		// 	}
		// 	});
		// }
	const columns = [
		 //{ field: 'empId', headerName: 'ID', flex: 0.5 },
		{
			field: 'name',
			headerName: 'Name',
			flex: 2,
			cellClassName: 'name-column--cell',
			headerAlign: 'center',
			align: 'center',
			renderCell : (params) =>{
					return (
							<>
							
							<Chip
									 avatar={
									 <Avatar alt="Natacha" src={defaultImage} />
									}
									label={params.row.name }
									variant="outlined"
									
								/>
							
							</>
					);
			},
		},

		{
			field: 'stats',
			headerName: 'Status',
			type: 'number',
			headerAlign: 'center',
			align: 'center',
			// renderCell: ({ row: { status } }) => {
			// 	return (
			// 		<>
					
			// 			<Chip
			// 				color={status === "1" ? 'success' : 'error'}
			// 				label={status === "1" ? 'Active' : 'Inactive'}
			// 				variant="outlined"
			// 			/>
			// 		</>
			// 	);
			// },
			renderCell : (params) =>{
				return (
							<>
							
								<Chip
									color={params.row.stats === 1 ? 'success' : 'error'}
									label={params.row.stats === 1 ? 'Active' : 'Inactive'}
									variant="outlined"
								/>
							</>
						);
			},
		},

		{
			field: 'description',
			headerName: 'Access Level',
			flex: 1,
			headerAlign: 'center',
			align: 'center',
			// renderCell: ({ row: { userType } }) => {
			// 	return (
			// 		<>
			// 			<Chip
			// 				avatar={
			// 					userType === 'Super Admin' ? (
			// 						<AdminPanelSettingsOutlinedIcon />
			// 					) : userType === 'Admin' ? (
			// 						<SecurityOutlinedIcon />
			// 					) : (
			// 						userType === 'Read Only' && <LockOpenOutlinedIcon />
			// 					)
			// 				}
			// 				label={userType}
			// 			/>
			// 		</>
			// 	);
			// },

			renderCell : (params) =>{
				return (
					<>
						<Chip
							avatar={
								params.row.description === 'Super Admin' ? (
									<AdminPanelSettingsOutlinedIcon />
								) : params.row.description === 'Admin' ? (
									<SecurityOutlinedIcon />
								) : (
									params.row.description === 'Read Only' && <LockOpenOutlinedIcon />
								)
							}
							label={params.row.description}
						/>
					</>
				);
			},
		},

		{
			field: 'key',
			headerName: 'View Details',
			type: 'text',
			headerAlign: 'center',
			align: 'center',
			//renderCell: ({ row: { id } }) => {	
			renderCell: (params) => {
				return (
					<>
						<Button
							variant="contained"
							//id={id}
							id={params.row.key}
							startIcon={<VisibilityIcon />}
							color="info"
							sx={{ fontWeight: 'bold', borderRadius: '100px' }}
							component={Link}
							//to={`/employees/${id}`}
							to={`/employees/${params.row.key}`}
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
					rows={emplist}
					columns={columns}
					components={{ Toolbar: GridToolbar }}
					getRowId={(emplist) =>  emplist.empId}
				/>
			</Box>
		</Box>
	);
};

export default Users;
