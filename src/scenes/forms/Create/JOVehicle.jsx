import DeleteIcon from '@mui/icons-material/Delete';
import {
	Box,
	Button,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import * as yup from 'yup';
import Header from '../../../components/header/Header';
import { branches, suppliers, vehicles } from '../../../data/mockData';
import { tokens } from '../../../theme';
const JOVehicle = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { enqueueSnackbar } = useSnackbar();

	const handleFormSubmit = async (values, actions) => {
		console.log(values);
		//console.log(actions);

		await new Promise((resolve) => setTimeout(resolve, 1000));
		actions.resetForm();
		const variant = 'success';
		enqueueSnackbar('Job Order TAC-V0000001 has been successfully created', {
			variant,
		});
	};

	const checkoutSchema = yup.object().shape({
		branch: yup.string().required('Required'),

		serviceType: yup.string().required('Required'),
		provider: yup.string().required('Required'),
		specification: yup.string().required('Required'),
		tStartDate: yup.date().required('Required'),
		tEndDate: yup.date().required('Required'),
		//paySchedule: yup.date().required('Required'),
		requestdBy: yup.string().required('Required'),
	});
	const initialValues = {
		branch: '',
		serviceType: '',
		provider: '',
		specification: '',
		tStardDate: '',
		tEndDate: '',
		paySchedule: '',
		requestdBy: '',
	};

	const [count, setCount] = useState(1);
	const [rows, setRows] = useState([]);

	const addRow = () => {
		setCount(count + 1);
		setRows([
			...rows,
			{ rowCount: count, scope: '', quantity: '', amount: '', plateNumber: '' },
		]);
	};

	const removeRow = (index) => {
		const newRows = [...rows];
		newRows.splice(index, 1);
		setRows(newRows);
	};

	const handleInputChange = (event, index, key) => {
		const newRows = [...rows];
		newRows[index][key] = event.target.value;
		setRows(newRows);
	};

	return (
		<Box m="20px" sx={{ maxHeight: '500px' }}>
			<Header
				title="JOB ORDER VEHICLE"
				subtitle="Create new Job Order for Vehicles."
			/>

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
									JO#: TAC-V000001
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
								<InputLabel id="branch">Branch</InputLabel>
								<Select
									labelId="branch"
									id="branch"
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
								sx={{ gridColumn: 'span 2' }}
								error={!!touched.serviceType && !!errors.serviceType}
								size="small"
								color="secondary"
								name="branch"
							>
								<InputLabel id="serviceType">Repair/Service Type</InputLabel>
								<Select
									labelId="serviceType"
									id="serviceType"
									value={values.serviceType}
									onBlur={handleBlur}
									onChange={handleChange}
									label="serviceType"
									name="serviceType"
								>
									<MenuItem value={1}>Tire Service</MenuItem>
									<MenuItem value={2}>Preventice Maintenance</MenuItem>
									<MenuItem value={3}>Mechanical Repair</MenuItem>
									<MenuItem value={4}>Electrical Repair</MenuItem>
									<MenuItem value={5}>Body Building</MenuItem>
									<MenuItem value={6}>Body Paint</MenuItem>
								</Select>
								<Typography
									color="error"
									sx={{ fontSize: '10px', mt: '5px', ml: '12px' }}
								>
									{touched.serviceType && errors.serviceType}
								</Typography>
							</FormControl>
							<FormControl
								variant="filled"
								sx={{ gridColumn: 'span 2' }}
								error={!!touched.provider && !!errors.provider}
								helperText={touched.provider && errors.provider}
								size="small"
								color="secondary"
							>
								<InputLabel id="provider">Provider</InputLabel>
								<Select
									labelId="provider"
									id="provider"
									name="provider"
									value={values.provider}
									onBlur={handleBlur}
									onChange={handleChange}
									label="Provider"
								>
									{suppliers.map((supplier) => (
										<MenuItem key={supplier.id} value={supplier.value}>
											{supplier.label}
										</MenuItem>
									))}
								</Select>
								<Typography
									color="error"
									sx={{ fontSize: '10px', mt: '5px', ml: '12px' }}
								>
									{touched.provider && errors.provider}
								</Typography>
							</FormControl>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Specification"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.specification}
								name="specification"
								size="small"
								error={!!touched.specification && !!errors.specification}
								helperText={touched.specification && errors.specification}
								sx={{ gridColumn: 'span 2' }}
								color="secondary"
							/>

							<TextField
								fullWidth
								variant="filled"
								label="Target Start Date"
								id="tStartDate"
								type="date"
								InputLabelProps={{
									shrink: true,
								}}
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.tStartDate}
								name="tStartDate"
								size="small"
								error={!!touched.tStartDate && !!errors.tStartDate}
								helperText={touched.tStartDate && errors.tStartDate}
								sx={{ gridColumn: 'span 1' }}
								color="secondary"
							/>
							<TextField
								fullWidth
								variant="filled"
								type="date"
								label="Target End Date"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.tEndDate}
								name="tEndDate"
								size="small"
								error={!!touched.tEndDate && !!errors.tEndDate}
								helperText={touched.tEndDate && errors.tEndDate}
								sx={{ gridColumn: 'span 1' }}
								color="secondary"
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="date"
								label="Payment Schedule"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.paySchedule}
								name="paySchedule"
								size="small"
								error={!!touched.paySchedule && !!errors.paySchedule}
								helperText={touched.paySchedule && errors.paySchedule}
								sx={{ gridColumn: 'span 1' }}
								color="secondary"
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Requested By"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.requestdBy}
								name="requestdBy"
								size="small"
								error={!!touched.requestdBy && !!errors.requestdBy}
								helperText={touched.requestdBy && errors.requestdBy}
								sx={{ gridColumn: 'span 1' }}
								color="secondary"
							/>
						</Box>
						<Box>
							<TableContainer
								component={Paper}
								sx={{ mt: '30px', backgroundColor: colors.main[300] }}
							>
								<Box display="flex" justifyContent="end" sx={{ p: 2 }}>
									<Button
										type="button"
										color="warning"
										variant="contained"
										onClick={addRow}
										sx={{ fontWeight: 'bold' }}
										size="small"
									>
										ADD ROW
									</Button>
								</Box>
								<Table size="small">
									<TableHead>
										<TableRow>
											<TableCell align="center" sx={{ fontWeight: 'bold' }}>
												Scope
											</TableCell>
											<TableCell align="center" sx={{ fontWeight: 'bold' }}>
												Quantity
											</TableCell>
											<TableCell align="center" sx={{ fontWeight: 'bold' }}>
												Amount
											</TableCell>
											<TableCell align="center" sx={{ fontWeight: 'bold' }}>
												Plate Number
											</TableCell>
											<TableCell align="center" sx={{ fontWeight: 'bold' }}>
												Remove
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{rows.map((row, index) => (
											<TableRow key={index}>
												<TableCell align="center">
													<TextField
														fullWidth
														variant="outlined"
														type="text"
														name="scope"
														size="small"
														color="secondary"
														value={row.scope}
														onChange={(event) =>
															handleInputChange(event, index, 'scope')
														}
													/>
												</TableCell>
												<TableCell align="center">
													<TextField
														fullWidth
														variant="outlined"
														type="number"
														name="scope"
														size="small"
														color="secondary"
														value={row.quantity}
														onChange={(event) =>
															handleInputChange(event, index, 'quantity')
														}
													/>
												</TableCell>
												<TableCell align="center">
													<TextField
														fullWidth
														variant="outlined"
														type="text"
														name="scope"
														size="small"
														color="secondary"
														value={row.amount}
														onChange={(event) =>
															handleInputChange(event, index, 'amount')
														}
													/>
												</TableCell>
												<TableCell align="center">
													<Select
														fullWidth
														name="platenumber"
														size="small"
														color="secondary"
														value={row.platenumber}
														onChange={(event) =>
															handleInputChange(event, index, 'platenumber')
														}
													>
														<MenuItem value="">
															<em>None</em>
														</MenuItem>
														{vehicles.map((vehicle) => (
															<MenuItem key={vehicle.id} value={vehicle.value}>
																{vehicle.label}
															</MenuItem>
														))}
													</Select>
												</TableCell>
												<TableCell align="center">
													<IconButton
														aria-label="delete"
														onClick={() => removeRow(index)}
														sx={{ color: 'red' }}
													>
														<DeleteIcon />
													</IconButton>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
						<Box display="flex" justifyContent="end" mt="20px">
							<Button
								type="submit"
								color="secondary"
								variant="contained"
								sx={{ fontWeight: 'bold', mb: 10 }}
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

export default JOVehicle;
