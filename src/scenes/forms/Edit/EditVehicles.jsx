import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Route, useParams } from 'react-router-dom';
import * as yup from 'yup';
import Header from '../../../components/header/Header';
import {
	bodyTypes,
	branches,
	brands,
	denomination,
	employees,
	fuelMatrixList,
	vehicles,
} from '../../../data/mockData';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { tokens } from '../../../theme';
const checkoutSchema = yup.object().shape({
	branch: yup.string().required('required'),
	plateNum: yup.string().required('required'),
	mvNumber: yup.string().required('required'),
	engineNumber: yup.string().required('required'),
	fuelMatrixCode: yup.string().required('required'),
	chasisNumber: yup.string().required('required'),
	bagsCapacity: yup.string().required('required'),

	//branch: yup.string().required('required'),
});
const initialValues = {
	branch: '',
	plateNum: '',
	useengineNumberrType: '',
	mvNumber: '',
	fuelMatrixCode: '',
	engineNumber: '',
	bagsCapacity: '',
	chasisNumber: '',
};
const EditVehicle = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const { id } = useParams();
	const handleFormSubmit = (values) => {
		console.log(values);
	};

	const [expanded, setExpanded] = React.useState('panel1');

	const handleChangeNew = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<Box m="20px">
			<Header title="VEHICLE INFORMATION" subtitle="Vehicle Details." />

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
						<Accordion
							expanded={expanded === 'panel1'}
							onChange={handleChangeNew('panel1')}
							sx={{ backgroundColor: 'transparent' }}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1bh-content"
								id="panel1bh-header"
							>
								<Typography sx={{ flexShrink: 0, fontWeight: 'bold' }}>
									REQUIRED FIELDS
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Box
									display="grid"
									gap="30px"
									gridTemplateColumns="repeat(4, minmax(0, 1fr))"
									sx={{
										'& > div': {
											gridColumn: isNonMobile ? undefined : 'span 4',
										},
									}}
								>
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
											onChange={handleChange}
											label="branch"
											name="branch"
										>
											{branches.map((branch) => (
												<MenuItem key={branch.id} value={branch.value}>
													{branch.label}
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
												<MenuItem key={vehicle.id} value={vehicle.value}>
													{vehicle.label}
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
									<TextField
										fullWidth
										variant="filled"
										size="small"
										type="text"
										label="MV Number"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.mvNumber}
										name="mvNumber"
										error={!!touched.mvNumber && !!errors.mvNumber}
										helperText={touched.mvNumber && errors.mvNumber}
										sx={{ gridColumn: 'span 1' }}
										color="secondary"
									/>

									<TextField
										fullWidth
										variant="filled"
										size="small"
										type="text"
										label="Engine Number"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.engineNumber}
										name="engineNumber"
										error={!!touched.engineNumber && !!errors.engineNumber}
										helperText={touched.engineNumber && errors.engineNumber}
										sx={{ gridColumn: 'span 1' }}
										color="secondary"
									/>

									<TextField
										fullWidth
										variant="filled"
										size="small"
										type="text"
										label="Chasis Number"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.chasisNumber}
										name="chasisNumber"
										error={!!touched.chasisNumber && !!errors.chasisNumber}
										helperText={touched.chasisNumber && errors.chasisNumber}
										sx={{ gridColumn: 'span 1' }}
										color="secondary"
									/>
									<FormControl
										variant="filled"
										sx={{ gridColumn: 'span 1' }}
										error={!!touched.fuelMatrixCode && !!errors.fuelMatrixCode}
										helperText={touched.fuelMatrixCode && errors.fuelMatrixCode}
										size="small"
										color="secondary"
									>
										<InputLabel id="demo-simple-select-standard-label">
											Fuel Matrix Code
										</InputLabel>
										<Select
											labelId="demo-simple-select-standard-label"
											id="demo-simple-select-standard"
											name="fuelMatrixCode"
											value={values.fuelMatrixCode}
											onBlur={handleBlur}
											onChange={handleChange}
											label="fuelMatrixCode"
										>
											{fuelMatrixList.map((fuelMatrix) => (
												<MenuItem key={fuelMatrix.id} value={fuelMatrix.value}>
													{fuelMatrix.label}
												</MenuItem>
											))}
										</Select>
										<Typography
											color="error"
											sx={{ fontSize: '10px', mt: '5px', ml: '12px' }}
										>
											{touched.fuelMatrixCode && errors.fuelMatrixCode}
										</Typography>
									</FormControl>
									<TextField
										fullWidth
										variant="filled"
										size="small"
										type="text"
										label="Bags Capacity"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.bagsCapacity}
										name="bagsCapacity"
										error={!!touched.bagsCapacity && !!errors.bagsCapacity}
										helperText={touched.bagsCapacity && errors.bagsCapacity}
										sx={{ gridColumn: 'span 1' }}
										color="secondary"
									/>
								</Box>
							</AccordionDetails>
						</Accordion>

						<Accordion
							expanded={expanded === 'panel2'}
							onChange={handleChangeNew('panel2')}
							sx={{ backgroundColor: 'transparent' }}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1bh-content"
								id="panel1bh-header"
							>
								<Typography sx={{ flexShrink: 0, fontWeight: 'bold' }}>
									ASSIGNED DRIVER
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Box
									display="grid"
									gap="30px"
									gridTemplateColumns="repeat(4, minmax(0, 1fr))"
									sx={{
										'& > div': {
											gridColumn: isNonMobile ? undefined : 'span 4',
										},
									}}
								>
									<FormControl
										variant="filled"
										sx={{ gridColumn: 'span 1' }}
										error={!!touched.assignedDriver && !!errors.assignedDriver}
										helperText={touched.assignedDriver && errors.assignedDriver}
										size="small"
										color="secondary"
									>
										<InputLabel id="demo-simple-select-standard-label">
											Assigned Driver
										</InputLabel>
										<Select
											labelId="demo-simple-select-standard-label"
											id="demo-simple-select-standard"
											name="assignedDriver"
											value={values.assignedDriver}
											onBlur={handleBlur}
											onChange={handleChange}
											label="Plate Number"
										>
											{employees.map((employee) => (
												<MenuItem key={employee.id} value={employee.value}>
													{employee.label}
												</MenuItem>
											))}
										</Select>
										<Typography
											color="error"
											sx={{ fontSize: '10px', mt: '5px', ml: '12px' }}
										>
											{touched.assignedDriver && errors.assignedDriver}
										</Typography>
									</FormControl>

									<TextField
										fullWidth
										variant="filled"
										size="small"
										type="date"
										label="Start Date"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.dStartDate}
										name="dStartDate"
										error={!!touched.dStartDate && !!errors.dStartDate}
										helperText={touched.dStartDate && errors.bagsCapacity}
										sx={{ gridColumn: 'span 1' }}
										color="secondary"
									/>
								</Box>
							</AccordionDetails>
						</Accordion>

						<Accordion
							expanded={expanded === 'panel3'}
							onChange={handleChangeNew('panel3')}
							sx={{ backgroundColor: 'transparent' }}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1bh-content"
								id="panel1bh-header"
							>
								<Typography
									sx={{
										flexShrink: 0,
										fontWeight: 'bold',
									}}
								>
									OTHER INFORMATION
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Box
									display="grid"
									gap="30px"
									gridTemplateColumns="repeat(4, minmax(0, 1fr))"
									sx={{
										'& > div': {
											gridColumn: isNonMobile ? undefined : 'span 4',
										},
									}}
								>
									<FormControl
										variant="filled"
										sx={{ gridColumn: 'span 1' }}
										error={!!touched.denomination && !!errors.denomination}
										size="small"
										color="secondary"
										name="denomination"
									>
										<InputLabel id="demo-simple-select-standard-label">
											Denomination
										</InputLabel>
										<Select
											labelId="demo-simple-select-standard-label"
											id="demo-simple-select-standard"
											value={values.denomination}
											onBlur={handleBlur}
											onChange={handleChange}
											label="denomination"
											name="denomination"
										>
											{denomination.map((list) => (
												<MenuItem key={list.id} value={list.value}>
													{list.label}
												</MenuItem>
											))}
										</Select>
										<Typography
											color="error"
											sx={{ fontSize: '10px', mt: '5px', ml: '12px' }}
										>
											{touched.denomination && errors.denomination}
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
											label="Plate Number"
										>
											<MenuItem>DIESEL</MenuItem>
											<MenuItem>GASOLINE [UNLEADED]</MenuItem>
											<MenuItem>GASOLINE [PREMIUM]</MenuItem>
										</Select>
									</FormControl>
									<FormControl
										variant="filled"
										sx={{ gridColumn: 'span 1' }}
										error={!!touched.make && !!errors.make}
										helperText={touched.make && errors.make}
										size="small"
										color="secondary"
									>
										<InputLabel id="demo-simple-select-standard-label">
											Make
										</InputLabel>
										<Select
											labelId="demo-simple-select-standard-label"
											id="demo-simple-select-standard"
											name="make"
											value={values.make}
											onBlur={handleBlur}
											onChange={handleChange}
											label="Make"
										>
											{brands.map((brand) => (
												<MenuItem key={brand.id} value={brand.value}>
													{brand.label}
												</MenuItem>
											))}
										</Select>
									</FormControl>

									<FormControl
										variant="filled"
										sx={{ gridColumn: 'span 1' }}
										error={!!touched.bodyType && !!errors.bodyType}
										helperText={touched.bodyType && errors.bodyType}
										size="small"
										color="secondary"
									>
										<InputLabel id="demo-simple-select-standard-label">
											Body Type
										</InputLabel>
										<Select
											labelId="demo-simple-select-standard-label"
											id="demo-simple-select-standard"
											name="bodyType"
											value={values.bodyType}
											onBlur={handleBlur}
											onChange={handleChange}
											label="Body Type"
										>
											{bodyTypes.map((bodyType) => (
												<MenuItem key={bodyType.id} value={bodyType.value}>
													{bodyType.label}
												</MenuItem>
											))}
										</Select>
									</FormControl>
									<TextField
										fullWidth
										variant="filled"
										size="small"
										type="text"
										label="Vehicle Model"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.vehicleModel}
										name="vehicleModel"
										error={!!touched.vehicleModel && !!errors.vehicleModel}
										helperText={touched.vehicleModel && errors.vehicleModel}
										sx={{ gridColumn: 'span 1' }}
										color="secondary"
									/>

									<TextField
										fullWidth
										variant="filled"
										size="small"
										type="text"
										label="Year Model"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.yearModel}
										name="yearModel"
										error={!!touched.yearModel && !!errors.yearModel}
										helperText={touched.yearModel && errors.yearModel}
										sx={{ gridColumn: 'span 1' }}
										color="secondary"
									/>

									<TextField
										fullWidth
										variant="filled"
										size="small"
										type="text"
										label="Gross Weight"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.grossWeight}
										name="grossWeight"
										error={!!touched.grossWeight && !!errors.grossWeight}
										helperText={touched.grossWeight && errors.grossWeight}
										sx={{ gridColumn: 'span 1' }}
										color="secondary"
									/>
									<TextField
										fullWidth
										variant="filled"
										size="small"
										type="text"
										label="Net Capacity"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.netCapacity}
										name="netCapacity"
										error={!!touched.netCapacity && !!errors.netCapacity}
										helperText={touched.netCapacity && errors.netCapacity}
										sx={{ gridColumn: 'span 1' }}
										color="secondary"
									/>
									<FormControl
										variant="filled"
										sx={{ gridColumn: 'span 1' }}
										error={!!touched.classification && !!errors.classification}
										helperText={touched.classification && errors.classification}
										size="small"
										color="secondary"
									>
										<InputLabel id="demo-simple-select-standard-label">
											Classification
										</InputLabel>
										<Select
											labelId="demo-simple-select-standard-label"
											id="demo-simple-select-standard"
											name="classification"
											value={values.classification}
											onBlur={handleBlur}
											onChange={handleChange}
											label="fuelMatrixCode"
										>
											<MenuItem>Brand New</MenuItem>
											<MenuItem>Second Hand</MenuItem>
											<MenuItem>Surplus</MenuItem>
										</Select>
									</FormControl>
									<TextField
										fullWidth
										variant="filled"
										size="small"
										type="text"
										label="Owner's Name"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.ownersName}
										name="ownersName"
										error={!!touched.ownersName && !!errors.ownersName}
										helperText={touched.ownersName && errors.ownersName}
										sx={{ gridColumn: 'span 1' }}
										color="secondary"
									/>
									<TextField
										fullWidth
										variant="filled"
										size="small"
										type="text"
										label="Encumbered To:"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.encumberedTo}
										name="encumberedTo"
										error={!!touched.encumberedTo && !!errors.encumberedTo}
										helperText={touched.encumberedTo && errors.encumberedTo}
										sx={{ gridColumn: 'span 1' }}
										color="secondary"
									/>
								</Box>
							</AccordionDetails>
						</Accordion>

						<Box display="flex" justifyContent="end" sx={{ mt: 2 }}>
							<Button
								type="submit"
								color="secondary"
								variant="contained"
								sx={{ fontWeight: 'bold ', mb: 15 }}
							>
								MODIFY
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

export default EditVehicle;
