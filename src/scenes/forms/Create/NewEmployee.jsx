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
import { branches, userTypes, vehicles } from '../../../data/mockData';

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
	//branch: yup.string().required('required'),
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

	const handleFormSubmit = (values) => {
		console.log(values);
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
										<MenuItem key={userType} value={userType}>
											{userType}
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

							<FormControl
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
							</FormControl>
							<TextField
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
							/>

							<FormControl
								variant="outlined"
								sx={{ gridColumn: 'span 4' }}
								error={!!touched.vehicle && !!errors.vehicle}
								helperText={touched.vehicle && errors.vehicle}
								size="small"
								color="secondary"
								value={values.vehicle}
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
											{selected.map((value) => (
												<Chip key={value} label={value} />
											))}
										</Box>
									)}
									MenuProps={MenuProps}
								>
									{branches.map((branch) => (
										<MenuItem
											key={branch.id}
											value={branch.value}
											style={getStyles(branch, branchName, theme)}
										>
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
