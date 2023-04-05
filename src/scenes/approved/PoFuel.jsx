import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
//import { appPoFuelList } from '../../data/mockData';
import { tokens } from '../../theme';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
//import axios from 'axios';
import axiosInstance from '../../api/axios';
import { useDispatch } from 'react-redux';
import { updatePO } from '../../redux/poSlice';
import { updateApprovedPO } from '../../redux/approvedPOSlice';



const columns = [
	{ field: 'id', headerName: 'ID', flex: 0.5 },
	{
		field: 'poNumber',
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
		field: 'date',
		headerName: 'DATE',
		type: 'text',
		headerAlign: 'center',
		align: 'center',
	},

	{
		field: 'plateNo',
		headerName: 'VEHICLE',
		flex: 1,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'fuel',
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
		field: 'noBags',
		headerName: 'NO. OF BAGS',
		flex: 1,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'aprvliters',
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
	const { enqueueSnackbar } = useSnackbar();

	// const empId = parseInt(sessionStorage.getItem("empId"))
  // const userType = parseInt(sessionStorage.getItem("userType"))
  // //const userType = 4
  // const branchId = parseInt(sessionStorage.getItem("branch"))
  //const branchId = 5

	const navigate = useNavigate();
	
	const token = sessionStorage.getItem("token")
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	};

	const [empId, setEmpId] = useState(0);
	const [userType, setuserType] = useState(0);
	const [branchId, setbranchId] = useState(0);


	const [appPoFuelList, setappPoFuelList] = useState([])

// useEffect(() =>{


// 	var url = ''
		
// 		userType == 1 || userType == 2  || userType == 3 ?
// 		url = 'POFuel/ApprovedPOFuelList' 
// 		: url = `POFuel/ApprovedPOFuelListBranch/${branchId}`


// 	const intervalid = setInterval(() => {
// 		axiosInstance.get(url).
// 	then((res)=>{

// 		setappPoFuelList(res.data)

// 	}).catch((err)=>{
// 		console.log(err)
// 			const variant = 'error';
// 		enqueueSnackbar('Unable to retrieve approved fuel list', {
// 			variant,
// 		});
// 	})
// 	}, 1000)

// 	return () => clearInterval(intervalid)

	

// },[])

const dispatch = useDispatch();
const url = userType === 1 || userType === 2 || userType === 3
				? 'POFuel/ApprovedPOFuelList'
				: `POFuel/ApprovedPOFuelListBranch/${branchId}`;


useEffect(() => {
	const fetchData = async () => {
		try {
			const res = await axiosInstance.get('UserAuth/Details',config)
						setEmpId(res.data.empid);
						setuserType(res.data.usertypeid);
						setbranchId(res.data.branch);
			try {	

				
				const res = await axiosInstance.get(url, config);
				dispatch(updateApprovedPO(res.data));
				setappPoFuelList(res.data)

			}catch (err) {
				console.log(err);
				if(err.response.status == 401){
					sessionStorage.clear()
					navigate('/login');
				}else {
							console.log(err)
							const variant = 'error';
						enqueueSnackbar('Unable to retrieve approved fuel list', {
							variant,
						});
				}
			}
			
		} catch (err) {
			console.log(err);
			const variant = 'error';
		enqueueSnackbar('Unable to retrieve user data', {
			variant,
		});
		}
	};

	fetchData();
}, [dispatch, url,appPoFuelList]);


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
