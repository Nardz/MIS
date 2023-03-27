import {
	Box,
	Button,
	Divider,
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

const Registration = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { enqueueSnackbar } = useSnackbar();

	// const login = () => {
	// 	localStorage.setItem('user', 'test');
	// 	navigate('/');
	// };
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const ErrMsg = (msg) =>{
		const variant = 'error';
		enqueueSnackbar(msg, {
			variant,
		});
	}

	

	const handleFormSubmit = (values) => {

		axiosInstance.get(`UserAuth/AuthKey/${values.securityCode}`)
		.then((result) =>{
					if (result.data.recStatus == 1) {
						
						axiosInstance.get(`Employee/EmpUserType/${result.data.empId}`)
						.then((res) =>{


							axiosInstance.get(`UserAuth/username/${values.username}`)
							.then((res)=>{
							
									ErrMsg('Username Already in Use!');
								
							}).catch((err)=>{
								const url = 'UserAuth/Register'
									const data = 
									{
										"empId": result.data.empId,
										"userTypeId": res.data.userTypeId,
										"username": values.username,
										"password": values.password
									}
			
									axiosInstance.post(url,data)
									.then((rslt) =>{
		
											 const url = 'UserAuth/Key'
											const data = 
											{
												 "empId": result.data.empId,
												 "uniqueKey": values.securityCode
											}
											axiosInstance.put(url,data)
											.then((res) =>{
												console.log(res)
											
												navigate('/login')
											}).catch((err)=>{
												console.log(err)

												ErrMsg('Unable to Update Security Code');
												
											})
									}).catch((err)=>{
										console.log(err)

										ErrMsg('Unable to Register User');
									
									})
							})
					
						}).catch((err)=>{
							console.log(err)
							ErrMsg('Unable to Get UserType');
							
						})
					}else{

						ErrMsg('User Already Registered!');
					
					}
		}).catch((error) =>{
			console.log(error)

			ErrMsg('Security Code Doesn\'t Exist');
			
		})

		// console.log(values);
		// localStorage.setItem('user', 'test');
		//navigate('/login');
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

		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Passwords didn`t match')
			.required('Required'),
		securityCode: yup.string().min(12).required('required'),
	});
	const initialValues = {
		username: '',
		password: '',
		confirmPassword: '',
		securityCode: '',
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
									Register
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
								<TextField
									fullWidth
									variant="outlined"
									type="password"
									label="Confirm Password"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.firstName}
									name="confirmPassword"
									error={!!touched.confirmPassword && !!errors.confirmPassword}
									helperText={touched.confirmPassword && errors.confirmPassword}
									color="secondary"
								/>
								<Box>
									<Divider>SECURITY CODE</Divider>
								</Box>

								<TextField
									fullWidth
									variant="outlined"
									type="text"
									label="Security Code"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.firstName}
									name="securityCode"
									error={!!touched.securityCode && !!errors.securityCode}
									helperText={touched.securityCode && errors.securityCode}
									color="secondary"
								/>
								<Box>
									<Typography>
										<Link
											to="/login"
											style={{
												textDecoration: 'none',
												color: colors.greenAccent[400],
												fontSize: 11,
											}}
										>
											Click here to Sign in.
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
									Create Account
								</Button>
							</Box>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

export default Registration;
