import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Formik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import Header from '../../../components/header/Header';

import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
//import { branches, userTypes, vehicles } from '../../../data/mockData';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import { useSnackbar } from 'notistack';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 200,
		},
	},
};

function getStyles(branch, branchName, theme) {
	return {
		fontWeight: [
			branchName.indexOf(branch) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightBold,
		],
	};
}

const checkoutSchema = yup.object().shape({
	firstName: yup.string().required('required'),
	lastName: yup.string().required('required'),
	userType: yup.string().required('required'),
	// branch: yup.string().required('required'),
});
const initialValues = {
	firstName: '',
	lastName: '',
	userType: '',
	vehicle: '',
	branchName: '',
};
const NewEmployee = () => {
	const theme = useTheme();
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const [branchName, setBranchName] = useState([]);
	const [branches, setBranches] = useState([]);
	const [userTypes, setuserTypes] = useState([]);
	
//	const [branchVal, set] = useState([]);

const bid = []

	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();

	const token = sessionStorage.getItem("token")
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	};
	function capitalizeString(str) {
		return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
	}
	
	const branchids = (branchName) => {
		
		branchName.map((branch) => (
			bid.push(branch.branchId)
		))
	}

	const addEmp = async (values) => {

		const url = 'Employee/NewEmployee'
		const data = {
			"firstname":capitalizeString(values.firstName),
			"lastname":capitalizeString(values.lastName),
			"usertype":values.userType,
			"branchId":bid,
		}

		await axiosInstance.post(url,data,config)
		.then((res) => {
			//console.log(res)
			const variant = 'success';
			enqueueSnackbar('Employee '+ values.firstName + " added successfully", {
			variant,
		});
		navigate(`/employees/${res.data}`)	
		}).catch((err) =>{
			console.log(err)
			const variant = 'error';
			enqueueSnackbar('Unable to add employee :' + err.response.data, {
			variant,
		});
		if (err.code == 'ERR_NETWORK' || err.response.status == 401) {
		 		sessionStorage.clear()
				navigate('/login');
		}
		})

	}

	const handleFormSubmit = (values) => {
		branchids(branchName)
		addEmp(values)


	};	
	


	

	const handleChangeBranch = (event) => {
		const {
			target: { value },
		} = event;
		setBranchName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	const getBranch = async () =>{
	await	axiosInstance.get('Branch',config)
		.then((res) =>{
			setBranches(res.data)
		}).catch((err) =>{
			console.log(err)
			const variant = 'error';
			enqueueSnackbar('Unable to retrieve branches', {
			variant,
		});
		if (err.code == 'ERR_NETWORK' || err.response.status == 401) {
		 		sessionStorage.clear()
				navigate('/login');
		}
		})
	}

	const getUserType = async () =>{
		await	axiosInstance.get('UserType',config)
			.then((res) =>{
				setuserTypes(res.data)
			}).catch((err) =>{
				console.log(err)
				const variant = 'error';
				enqueueSnackbar('Unable to retrieve Usertypes', {
				variant,
			});
			if (err.code == 'ERR_NETWORK'|| err.response.status == 401) {
					 sessionStorage.clear()
					navigate('/login');
			}
			})
		}

	useEffect(() => {
		getBranch()
		getUserType()
	},[branches,userTypes])



	return (
		<Box m="20px">
			<Header title="NEW EMPLOYEE" subtitle="Add New Employee Profile" />

			<Formik
				onSubmit={handleFormSubmit}
				initialValues={initialValues}
				validationSchema={checkoutSchema}
			>
				{({
					values,
					errors,
					touched,
					handleBlur,
					handleChange,
					handleSubmit,
				}) => (
					<form onSubmit={handleSubmit}>
						<Box
							display="grid"
							gap="30px"
							gridTemplateColumns="repeat(4, minmax(0, 1fr))"
							sx={{
								'& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
							}}
						>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								size="small"
								label="First Name"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.firstName}
								name="firstName"
								error={!!touched.firstName && !!errors.firstName}
								helperText={touched.firstName && errors.firstName}
								sx={{ gridColumn: 'span 2' }}
								color="secondary"
							/>
							<TextField
								fullWidth
								variant="filled"
								size="small"
								type="text"
								label="Last Name"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.lastName}
								name="lastName"
								error={!!touched.lastName && !!errors.lastName}
								helperText={touched.lastName && errors.lastName}
								sx={{ gridColumn: 'span 2' }}
								color="secondary"
							/>

							<FormControl
								variant="filled"
								sx={{ gridColumn: 'span 1' }}
								error={!!touched.userType && !!errors.userType}
								helperText={touched.userType && errors.userType}
								size="small"
								color="secondary"
							>
								<InputLabel id="1">Access Level</InputLabel>
								<Select
									labelId="1"
									id="1"
									name="userType"
									value={values.userType}
									onBlur={handleBlur}
									onChange={handleChange}
									label="userType"
								>
									{userTypes.map((userType) => (
										<MenuItem key={userType.userTypeId} value={userType.userTypeId}>
											{userType.description}
										</MenuItem>
									))}
								</Select>
								<Typography
									color="error"
									sx={{ fontSize: '10px', mt: '5px', ml: '12px' }}
								>
									{touched.userType && errors.userType}
								</Typography>
							</FormControl>

							{/* <FormControl
								variant="filled"
								sx={{ gridColumn: 'span 1' }}
								error={!!touched.vehicle && !!errors.vehicle}
								helperText={touched.vehicle && errors.vehicle}
								size="small"
								color="secondary"
							>
								<InputLabel id="demo-simple-select-standard-label">
									Vehicle
								</InputLabel>
								<Select
									labelId="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									name="vehicle"
									value={values.vehicle}
									onBlur={handleBlur}
									onChange={handleChange}
									label="vehicle"
								>
									{vehicles.map((vehicle) => (
										<MenuItem key={vehicle} value={vehicle}>
											{vehicle}
										</MenuItem>
									))}
								</Select>
								<Typography
									color="error"
									sx={{ fontSize: '10px', mt: '5px', ml: '12px' }}
								>
									{touched.vehicle && errors.vehicle}
								</Typography>
							</FormControl> */}
							{/* <TextField
								fullWidth
								variant="filled"
								size="small"
								type="text"
								label="Security Code"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.securityCode}
								name="securityCode"
								error={!!touched.securityCode && !!errors.securityCode}
								helperText={touched.securityCode && errors.securityCode}
								sx={{ gridColumn: 'span 2' }}
								color="secondary"
							/> */}

							<FormControl
								variant="outlined"
								sx={{ gridColumn: 'span 4' }}
								error={!!touched.branch && !!errors.branch}
								helperText={touched.branch && errors.branch}
								size="small"
								color="secondary"
								value={values.branch}
							>
								<InputLabel id="branch">Branch </InputLabel>
								<Select
									label="branchName"
									labelId="branchName"
									id="branchName"
									name="branchName"
									onBlur={handleBlur}
									multiple
									value={branchName}
									onChange={handleChangeBranch}
									input={
										<OutlinedInput id="select-multiple-chip" label="Chip" />
									}
									renderValue={(selected) => (
										<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
											{
											selected.map((value) => (
												<Chip key={value.branchId} label={value.description} />
												//<Chip key={value} label={value} />
											))}
										</Box>
									)}
									MenuProps={MenuProps}
								>
									{branches.map((branch) => (
										<MenuItem
											key={branch.branchId}
											value={branch}
											style={getStyles(branch, branchName, theme)}
										>
											{branch.description}
										</MenuItem>
									))}
								</Select>
								<Typography
									color="error"
									sx={{ fontSize: '10px', mt: '5px', ml: '12px' }}
								>
									{touched.branch && errors.branch}
								</Typography>
							</FormControl>
						</Box>
						<Box display="flex" justifyContent="end" mt="20px">
							<Button
								type="submit"
								color="secondary"
								variant="contained"
								sx={{ fontWeight: 'bold ' }}
							>
								ADD EMPLOYEE
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

export default NewEmployee;
