import {
	Box,
	Button,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import Header from '../../../components/header/Header';
// import {
// 	//branches,
// 	employees,
// 	suppliers,
// 	vehicles,
// } from '../../../data/mockData';
import { tokens } from '../../../theme';
import axios from 'axios';

const Fuel = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { enqueueSnackbar } = useSnackbar();

	const handleFormSubmit =  (values, actions) => {
		console.log(values);
		//console.log(actions);

		const url = 'https://localhost:7010/api/POFuel/NewPOFuel'
		const data = {
					"branchId": values.branch,
					"supplierId": values.supplier,
					"vehicleId": values.plateNum,
					"poNumber": poNumber,
					"fuelType": values.fuelType,
					"noLiters": parseInt(values.numLitres),
					"routeId": values.route,
					"noBags": parseInt(values.numBags),
					"requestedBy": values.requestdBy,
					"preparedBy": empId,
					"remarks": values.remarks,
					"recStatus": 1,
					"status": 1
		}

		axios.post(url,data).
		then((res) => {
			
			actions.resetForm();
			setPoNumber('')
			const variant = 'success';
			enqueueSnackbar('PO Number ' + poNumber + ' has been successfully created', {
				variant,
			});

		}).catch((err)=>{
			console.log(err)
			const variant = 'error';
		enqueueSnackbar('Unable to add  PO Number ' + poNumber, {
			variant,
		});
		})
	};


	const [poNumber,setPoNumber] = useState('')
	const [branches,setbranches] = useState([])
	const [employees,setemployees] = useState([])
	const [suppliers,setsuppliers] = useState([])
	const [vehicles,setvehicles] = useState([])
	const [routes,setroutes] = useState([])
	const [fuelType,setfuelType] = useState([])
	const empId = parseInt(sessionStorage.getItem("empId"))
    const userType = parseInt(sessionStorage.getItem("userType"))
  //  const userType = 4
   const branchId = parseInt(sessionStorage.getItem("branch"))
  // const branchId = 5

	useEffect(() =>{
		
		var url = 'https://localhost:7010/api/Branch'
		
		// userType == 1 || userType == 2  || userType == 3 ?
		// url = 'https://localhost:7010/api/Branch' 
		// : url = `https://localhost:7010/api/Branch/branch/${branchId}`
		
		axios.get(url).
		then((res)=> {
			
			
			setbranches(res.data)
			//console.log(res.data)

		}).catch((err)=>{
			console.log(err)
			const variant = 'error';
		enqueueSnackbar('Unable to retrieve branches', {
			variant,
		});
		
		})
		
	},[])

	const getPoNumber = (id) =>{
		axios.get(`https://localhost:7010/api/POFuel/PONumber/${id}`).
		then((res)=>{
				setPoNumber(res.data)
		}).catch((err) =>{
			console.log(err)
			const variant = 'error';
		enqueueSnackbar('Unable to retrieve Po Number', {
			variant,
		});
		})
	}

	const getRoute = (id) =>{
		axios.get(`https://localhost:7010/api/Route/route/${id}`).
		then((res)=>{
				setroutes(res.data)
		}).catch((err) =>{
			console.log(err)
			const variant = 'error';
		enqueueSnackbar('Unable to retrieve Routes', {
			variant,
		});
		})
	}


	const getVehicle = (id) =>{
		axios.get(`https://localhost:7010/api/Vehicle/vehiclebranch/${id}`).
		then((res)=>{
				setvehicles(res.data)
		}).catch((err) =>{
			console.log(err)
			const variant = 'error';
		enqueueSnackbar('Unable to retrieve Vehicles', {
			variant,
		});
		})
	}

	const getFuelType = () =>{
		axios.get(`https://localhost:7010/api/FuelType/fueltype`).
		then((res)=>{
			setfuelType(res.data)
		}).catch((err) =>{
			console.log(err)
			const variant = 'error';
		enqueueSnackbar('Unable to retrieve Fuel Type', {
			variant,
		});
		})
	}


	const getSupplier = (id) =>{
		axios.get(`https://localhost:7010/api/Supplier/supplier/${id}`).
		then((res)=>{
			setsuppliers(res.data)
		}).catch((err) =>{
			console.log(err)
			const variant = 'error';
		enqueueSnackbar('Unable to retrieve Supplier', {
			variant,
		});
		})
	}

	const getEmployees = (id) =>{
		axios.get(`https://localhost:7010/api/EmployeeBranch/employeebranch/${id}`).
		then((res)=>{
			setemployees(res.data)
		}).catch((err) =>{
			console.log(err)
			const variant = 'error';
		enqueueSnackbar('Unable to retrieve Employee\'s Branch', {
			variant,
		});
		})
	}

	const branchSelect = (id) => {
		getPoNumber(id)
		getRoute(id)
		getVehicle(id)
		getFuelType()
		getSupplier(id)
		getEmployees(id)
	}

	const checkoutSchema = yup.object().shape({
		branch: yup.string().required('Required'),

		route: yup.string().required('Required'),
		numBags: yup.number().integer().required('Required'),
		plateNum: yup.string().required('Required'),
		numLitres: yup.number().positive().integer().required('Required'),
		fuelType: yup.string().required('Rrequired'),
		supplier: yup.string().required('Required'),
		requestdBy: yup.string().required('Required'),
		remarks: yup.string(),
	});
	const initialValues = {
		branch: '',
		route: '',
		numBags: 0,
		plateNum: '',
		fuelType: '',
		numLitres: 0,
		supplier: '',
		requestdBy: '',
		remarks: '',
	};

	return (
		<Box m="20px" sx={{ maxHeight: '500px' }}>
			<Header title="PO FUEL" subtitle="Create new PO for Fuel." />

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
					isSubmitting,
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
							<Box>
								<Typography
									variant="h4"
									sx={{ color: colors.redAccent[500], fontWeight: 'bold' }}
								>
									{poNumber}
								</Typography>
							</Box>
							<FormControl
								variant="filled"
								sx={{ gridColumn: 'span 1' }}
								error={!!touched.branch && !!errors.branch}
								size="small"
								color="secondary"
								name="branch"
							>
								<InputLabel id="demo-simple-select-standard-label">
									Branch
								</InputLabel>
								<Select
									labelId="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									value={values.branch}
									onBlur={handleBlur}
									onChange={(e) => {
										handleChange(e);
										branchSelect(e.target.value)
									}}
									label="branch"
									name="branch"
								>
									{branches.map((branch) => (
										<MenuItem key={branch.branchId
										} value={branch.branchId}>
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

							<FormControl
								variant="filled"
								sx={{ gridColumn: 'span 1' }}
								error={!!touched.route && !!errors.route}
								helperText={touched.route && errors.route}
								size="small"
								color="secondary"
							>
								<InputLabel id="demo-simple-select-standard-label">
									Route
								</InputLabel>
								<Select
									labelId="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									name="route"
									value={values.route}
									onBlur={handleBlur}
									onChange={handleChange}
									label="route"
								>
									{routes.map((route) => (
										<MenuItem key={route.routeId
										} value={route.routeId}>
											{route.route1}
										</MenuItem>
									))}
								</Select>
								<Typography
									color="error"
									sx={{ fontSize: '10px', mt: '5px', ml: '12px' }}
								>
									{touched.route && errors.route}
								</Typography>
							</FormControl>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="No. of Bags"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.numBags}
								name="numBags"
								size="small"
								error={!!touched.numBags && !!errors.numBags}
								helperText={touched.numBags && errors.numBags}
								sx={{ gridColumn: 'span 1' }}
								color="secondary"
							/>

							<FormControl
								variant="filled"
								sx={{ gridColumn: 'span 1' }}
								error={!!touched.plateNum && !!errors.plateNum}
								helperText={touched.plateNum && errors.plateNum}
								size="small"
								color="secondary"
							>
								<InputLabel id="demo-simple-select-standard-label">
									Plate Number
								</InputLabel>
								<Select
									labelId="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									name="plateNum"
									value={values.plateNum}
									onBlur={handleBlur}
									onChange={handleChange}
									label="Plate Number"
								>
									{vehicles.map((vehicle) => (
										<MenuItem key={vehicle.id} value={vehicle.id}>
											{vehicle.plateNo}
										</MenuItem>
									))}
								</Select>
								<Typography
									color="error"
									sx={{ fontSize: '10px', mt: '5px', ml: '12px' }}
								>
									{touched.plateNum && errors.plateNum}
								</Typography>
							</FormControl>

							<FormControl
								variant="filled"
								sx={{ gridColumn: 'span 1' }}
								error={!!touched.fuelType && !!errors.fuelType}
								helperText={touched.fuelType && errors.fuelType}
								size="small"
								color="secondary"
							>
								<InputLabel id="demo-simple-select-standard-label">
									Fuel Type
								</InputLabel>
								<Select
									labelId="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									name="fuelType"
									value={values.fuelType}
									onBlur={handleBlur}
									onChange={handleChange}
									label="fuelType"
								>
								{fuelType.map((fueltype) => (
										<MenuItem key={fueltype.fueldId} value={fueltype.fueldId}>
											{fueltype.description}
										</MenuItem>
									))}
								</Select>
								<Typography
									color="error"
									sx={{ fontSize: '10px', mt: '5px', ml: '12px' }}
								>
									{touched.fuelType && errors.fuelType}
								</Typography>
							</FormControl>

							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="No. of Litres"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.numLitres}
								name="numLitres"
								size="small"
								error={!!touched.numLitres && !!errors.numLitres}
								helperText={touched.numLitres && errors.numLitres}
								sx={{ gridColumn: 'span 1' }}
								color="secondary"
							/>
							<FormControl
								variant="filled"
								sx={{ gridColumn: 'span 1' }}
								error={!!touched.supplier && !!errors.supplier}
								helperText={touched.supplier && errors.supplier}
								size="small"
								color="secondary"
							>
								<InputLabel id="demo-simple-select-standard-label">
									Supplier
								</InputLabel>
								<Select
									labelId="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									name="supplier"
									value={values.supplier}
									onBlur={handleBlur}
									onChange={handleChange}
									label="supplier"
								>
									{suppliers.map((supplier) => (
										<MenuItem key={supplier.supplierId} value={supplier.supplierId}>
											{supplier.supplierName}
										</MenuItem>
									))}
								</Select>
								<Typography
									color="error"
									sx={{ fontSize: '10px', mt: '5px', ml: '12px' }}
								>
									{touched.supplier && errors.supplier}
								</Typography>
							</FormControl>

							<FormControl
								variant="filled"
								sx={{ gridColumn: 'span 1' }}
								error={!!touched.requestdBy && !!errors.requestdBy}
								helperText={touched.requestdBy && errors.requestdBy}
								size="small"
								color="secondary"
							>
								<InputLabel id="demo-simple-select-standard-label">
									Requested By
								</InputLabel>
								<Select
									labelId="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									name="requestdBy"
									value={values.requestdBy}
									onBlur={handleBlur}
									onChange={handleChange}
									label="requestdBy"
								>
									{employees.map((employee) => (
										<MenuItem key={employee.empId} value={employee.empId}>
											{employee.name}
										</MenuItem>
									))}
								</Select>
								<Typography
									color="error"
									sx={{ fontSize: '10px', mt: '5px', ml: '12px' }}
								>
									{touched.requestdBy && errors.requestdBy}
								</Typography>
							</FormControl>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Remarks"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.remarks}
								name="remarks"
								size="small"
								error={!!touched.remarks && !!errors.remarks}
								helperText={touched.remarks && errors.remarks}
								sx={{ gridColumn: 'span 3' }}
								color="secondary"
							/>
						</Box>
						<Box display="flex" justifyContent="end" mt="20px">
							<Button
								type="submit"
								color="secondary"
								variant="contained"
								sx={{ fontWeight: 'bold' }}
								disabled={isSubmitting}
							>
								SUBMIT
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

export default Fuel;
