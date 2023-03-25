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
import React from 'react';
import * as yup from 'yup';
import Header from '../../../components/header/Header';
import { branches, POFUEL, TicketTypes } from '../../../data/mockData';
import { tokens } from '../../../theme';

const DateEdit = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { enqueueSnackbar } = useSnackbar();

	const handleFormSubmit = async (values, actions) => {
		console.log(values);
		//console.log(actions);

		await new Promise((resolve) => setTimeout(resolve, 1000));
		actions.resetForm();
		const variant = 'warning';
		enqueueSnackbar('TICKET# DE-0000001 has been successfully created', {
			variant,
		});
	};

	const checkoutSchema = yup.object().shape({
		branch: yup.string().required('Required'),
		reason: yup.string().required('Required'),
		ticketType: yup.string().required('Required'),
		ponum: yup.string().required('Required'),
	});
	const initialValues = {
		branch: '',
		reason: '',
		ticketType: '',
		ponum: '',
	};

	return (
		<Box m="20px" sx={{ maxHeight: '500px' }}>
			<Header title="DATA EDIT" subtitle="Create Ticket for Data Edit." />

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
									TICKET# : DE-0000001
								</Typography>
							</Box>
							<FormControl
								variant="filled"
								sx={{ gridColumn: 'span 2' }}
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
								error={!!touched.ponum && !!errors.ponum}
								helperText={touched.ponum && errors.ponum}
								size="small"
								color="secondary"
							>
								<InputLabel id="demo-simple-select-standard-label">
									PO / JO NUMBER
								</InputLabel>
								<Select
									labelId="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									name="ponum"
									value={values.ponum}
									onBlur={handleBlur}
									onChange={handleChange}
									label="ponum"
								>
									{POFUEL.map((polist) => (
										<MenuItem key={polist.id} value={polist.value}>
											{polist.label}
										</MenuItem>
									))}
								</Select>
								<Typography
									color="error"
									sx={{ fontSize: '10px', mt: '5px', ml: '12px' }}
								>
									{touched.ponum && errors.ponum}
								</Typography>
							</FormControl>
							<FormControl
								variant="filled"
								sx={{ gridColumn: 'span 1' }}
								error={!!touched.ticketType && !!errors.ticketType}
								size="small"
								color="secondary"
								name="ticketType"
							>
								<InputLabel id="demo-simple-select-standard-label">
									Ticket Type
								</InputLabel>
								<Select
									labelId="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									value={values.ticketType}
									onBlur={handleBlur}
									onChange={handleChange}
									label="ticketType"
									name="ticketType"
								>
									{TicketTypes.map((TicketType) => (
										<MenuItem key={TicketType.id} value={TicketType.value}>
											{TicketType.label}
										</MenuItem>
									))}
								</Select>
								<Typography
									color="error"
									sx={{ fontSize: '10px', mt: '5px', ml: '12px' }}
								>
									{touched.ticketType && errors.ticketType}
								</Typography>
							</FormControl>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Reason"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.reason}
								name="reason"
								size="small"
								error={!!touched.reason && !!errors.reason}
								helperText={touched.reason && errors.reason}
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
								CREATE TICKET
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

export default DateEdit;
