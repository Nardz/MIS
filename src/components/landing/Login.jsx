import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { tokens } from '../../theme';
// import axios from 'axios';
import axiosInstance from '../../api/axios';
import { useSnackbar } from 'notistack';

const Login = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { enqueueSnackbar } = useSnackbar();

	const isNonMobile = useMediaQuery('(min-width:600px)');

	const handleFormSubmit = (values) => {


			const url = 'UserAuth/LogIn'
			const data = {
				"username" : values.username,
				"password" : values.password
			}
			axiosInstance.post(url,data)
			.then((result)=> {
				//console.log(result.data)
				sessionStorage.setItem("empId",result.data.empId)
				sessionStorage.setItem("userType",result.data.userTypeId)
				sessionStorage.setItem("name",result.data.name)
				sessionStorage.setItem("branch",result.data.branch)

				// console.log(sessionStorage.getItem("empId"))
				// console.log(sessionStorage.getItem("userType"))
				navigate('/');
			}).catch((error) => {
				console.log(error.response.data)
				const variant = 'error';
				enqueueSnackbar('Username or Password Incorrect!', {
					variant,
				});

			})

		// console.log(values);
		// localStorage.setItem('user', 'test');
		
	};
	const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
	const checkoutSchema = yup.object().shape({
		username: yup.string().min(3).required('Required'),
		password: yup
			.string()
			.min(6)
			.matches(passwordRules, {
				message:
					'Must contain 1 Upper Case, 1 Lower Case, 1 Numeric and 1 Special Character',
			})
			.required('Required'),
	});
	const initialValues = {
		username: '',
		password: '',
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
			}}
		>
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
					<form onSubmit={handleSubmit} style={{}}>
						<Box
							sx={{
								backgroundColor: colors.primary[400],
								boxShadow: '0px 2px 5px 0px #000',
								padding: 3,
								width: '370px',
							}}
						>
							<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
								<Typography variant="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
									Sign In
								</Typography>
								<img
									src="../../assets/logo.png"
									width="40px"
									height="40px"
									alt="logo"
								/>
							</Box>

							<Box
								display="grid"
								gap="20px"
								gridTemplateColumns="repeat(1, minmax(1, 1fr))"
								sx={{
									'& > div': { gridColumn: isNonMobile ? undefined : 'span 1' },
								}}
							>
								<TextField
									fullWidth
									variant="outlined"
									type="text"
									label="Username"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.lastName}
									name="username"
									error={!!touched.username && !!errors.username}
									helperText={touched.username && errors.username}
									color="secondary"
								/>

								<TextField
									fullWidth
									variant="outlined"
									type="password"
									label="Password"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.firstName}
									name="password"
									error={!!touched.password && !!errors.password}
									helperText={touched.password && errors.password}
									color="secondary"
								/>
								<Box>
									<Typography>
										<Link
											to="/reset"
											style={{
												textDecoration: 'none',
												color: colors.greenAccent[400],
												fontSize: 11,
											}}
										>
											Reset Password
										</Link>
									</Typography>
									<Typography>
										<Link
											to="/register"
											style={{
												textDecoration: 'none',
												color: colors.greenAccent[400],
												fontSize: 11,
											}}
										>
											Click here to register.
										</Link>
									</Typography>
								</Box>
							</Box>

							<Box display="flex" justifyContent="end" mt="20px">
								<Button
									type="submit"
									color="secondary"
									variant="contained"
									sx={{ fontWeight: 'bold' }}
								>
									Sign In
								</Button>
							</Box>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

export default Login;
