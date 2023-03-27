import {
	Box,
	Button,
	colors,
	Paper,
	Typography,
	useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { Route, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import { tokens } from '../../theme';
//import axios from 'axios';
import { useSnackbar } from 'notistack';
import axiosInstance from '../../api/axios';

const ApprovedFuel = () => {
	const { id } = useParams();
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { enqueueSnackbar } = useSnackbar();

	const QrValue = 'this is a test';

	const [details, setdetails] = useState([])
	const currentDate = new Date()
	const twoDaysLater = new Date()
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	twoDaysLater.setDate(currentDate.getDate() + 2)


		useEffect(()=>{

			axiosInstance.get(`POFuel/PoFuelDetails/${id}`).
		then((res) =>{

			setdetails(res.data)


		}).catch((err) =>{
			console.log(err)
				const variant = 'error';
				enqueueSnackbar('Unable to get PO Details ', {
					variant,
				});
		})
	},[])
	
	const Print = () => {
		let printContents = document.getElementById('printablediv').innerHTML;
		let originalContents = document.body.innerHTML;
		document.body.innerHTML = printContents;
		window.print();
		document.body.innerHTML = originalContents;
	};

	return (
		<>
			<Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						fontFamily: 'Tahoma, sans-serif',
					}}
				>
					<Button
						onClick={Print}
						color="info"
						variant="contained"
						sx={{ fontWeight: 'bold', width: '8cm', mb: 1 }}
					>
						PRINT
					</Button>
				</Box>

				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Box
						sx={{
							width: '8cm',
							p: 2,
							backgroundColor: 'white',
							color: 'black',
						}}
						component={Paper}
						elevation={20}
						id="printablediv"
					>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								ml: '1cm',
								mr: '1cm',
							}}
						>
							<Box>
								<img
									src="..\..\assets\logo.png"
									style={{ width: '30px' }}
									alt="logo"
								></img>
							</Box>
							<Box>
								<Typography
									sx={{
										ml: 1,
										mr: 1,
										textAlign: 'center',
										fontSize: '9px',
										fontFamily: 'Tahoma, sans-serif',
										color: 'black',
									}}
								>
									TACLOBAN WINNER MARKETING CORP.
								</Typography>
								<Typography
									sx={{
										ml: 1,
										mr: 1,
										fontWeight: 'bold',
										textAlign: 'center',
										fontSize: '12px',
										fontFamily: 'Tahoma, sans-serif',
										color: 'black',
									}}
								>
									DIESEL REQUEST
								</Typography>
							</Box>
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								mt: 1,
								fontFamily: 'Tahoma, sans-serif',
								color: 'black',
								ml: '1cm',
								mr: '1cm',
							}}
						>
							<Typography
								sx={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}
							>
								PO # :{' '}
							</Typography>
							<Typography
								sx={{
									fontWeight: 'bold',
									color: 'red',
									fontFamily: 'Tahoma, sans-serif',
								}}
								variant="h5"
							>
								{details.poNumber}
							</Typography>
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								fontFamily: 'Tahoma, sans-serif',
								ml: '1cm',
								mr: '1cm',
								fontSize: '11px',
							}}
						>
							<Typography
								sx={{
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
									fontSize: '11px',
								}}
							>
								PO DATE :{' '}
							</Typography>
							<Typography
								sx={{
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
									fontSize: '11px',
									fontWeight: 'bold',
								}}
							>
								{details.date}
							</Typography>
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								fontFamily: 'Tahoma, sans-serif',
								color: 'black',
								ml: '1cm',
								mr: '1cm',
							}}
						>
							<Typography
								sx={{
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
									fontSize: '11px',
								}}
							>
								SUPPLIER :{' '}
							</Typography>
							<Typography
								sx={{
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
									fontSize: '11px',
									fontWeight: 'bold',
								}}
							>
									{details.supplierName}
							</Typography>
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								fontFamily: 'Tahoma, sans-serif',
								color: 'black',
								ml: '1cm',
								mr: '1cm',
							}}
						>
							<Typography
								sx={{
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
									fontSize: '11px',
								}}
							>
								PLATE NO. :{' '}
							</Typography>
							<Typography
								sx={{
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
									fontSize: '11px',
									fontWeight: 'bold',
								}}
							>
								{details.plateNo}
							</Typography>
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								mt: 1,
								border: '1px solid',
								borderColor: colors.primary[100],
								p: 1,
								fontFamily: 'Tahoma, sans-serif',
								ml: '1cm',
								mr: '1cm',
							}}
						>
							<Box
								sx={{
									width: '100%',
									textAlign: 'center',
								}}
							>
								<Typography
									variant="h3"
									sx={{
										fontWeight: 'bold',
										fontFamily: 'Tahoma, sans-serif',
										color: 'black',
									}}
								>
									{details.fuel}
								</Typography>

								<Typography
									variant="p"
									sx={{ fontFamily: 'Tahoma, sans-serif', color: 'black' }}
								>
									TYPE
								</Typography>
							</Box>

							<Box
								sx={{
									width: '100%',
									textAlign: 'center',
									fontWeight: 'bold',
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
								}}
							>
								<Typography
									variant="h3"
									sx={{
										fontWeight: 'bold',
										fontFamily: 'Tahoma, sans-serif',
										color: 'black',
									}}
								>
									{details.noLiters}
								</Typography>
								<Typography
									sx={{ fontFamily: 'Tahoma, sans-serif', color: 'black' }}
								>
									LITRES
								</Typography>
							</Box>
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								mt: 1,
								fontFamily: 'Tahoma, sans-serif',
								color: 'black',
								ml: '1cm',
								mr: '1cm',
							}}
						>
							<Typography
								sx={{
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
									fontSize: '11px',
								}}
							>
								ROUTE :{' '}
							</Typography>
							<Typography
								sx={{
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
									fontSize: '11px',
									fontWeight: 'bold',
								}}
							>
								{details.route}
							</Typography>
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								fontFamily: 'Tahoma, sans-serif',
								color: 'black',
								ml: '1cm',
								mr: '1cm',
							}}
						>
							<Typography
								sx={{
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
									fontSize: '11px',
								}}
							>
								NO. OF BAGS :{' '}
							</Typography>
							<Typography
								sx={{
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
									fontSize: '11px',
									fontWeight: 'bold',
								}}
							>
								{details.noBags} 
							</Typography>
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								fontFamily: 'Tahoma, sans-serif',
								color: 'black',
								ml: '1cm',
								mr: '1cm',
							}}
						>
							<Typography
								sx={{
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
									fontSize: '11px',
								}}
							>
								REQUESTED BY :{' '}
							</Typography>
							<Typography
								sx={{
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
									fontSize: '11px',
									fontWeight: 'bold',
								}}
							>
								{details.requestor} 
							</Typography>
						</Box>
						{''}
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								mt: 1,
								pt: 1,
								pb: 1,
								fontFamily: 'Tahoma, sans-serif',
								color: 'black',
								ml: '1cm',
								mr: '1cm',
							}}
						>
							<Box
								sx={{
									width: '100%',
									textAlign: 'center',
									mt: 1,
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
								}}
							>
								<Box sx={{ position: 'relative' }}>
									<img
										src={`../../assets/esignature/${details.preparedBy}.png`}
										alt=""
										height="50px"
										style={{
											position: 'absolute',
											bottom: '-25px',
											left: '-20px',
										}}
									/>
								</Box>

								<Typography
									variant="p"
									sx={{
										fontWeight: 'bold',
										fontFamily: 'Tahoma, sans-serif',
										color: 'black',
										fontSize: '11px',
									}}
								>
									{details.preparer} 
								</Typography>

								<Typography
									sx={{
										fontFamily: 'Tahoma, sans-serif',
										color: 'black',
										fontSize: '11px',
									}}
								>
									PREPARED BY
								</Typography>
							</Box>

							<Box
								sx={{
									width: '100%',
									textAlign: 'center',
									mt: 1,
								}}
							>
								<Box sx={{ position: 'relative' }}>
									<img
										src={`../../assets/esignature/${details.apprvdBy}.png`}
										alt=""
										width="130px"
										style={{
											position: 'absolute',
											bottom: '-25px',
											left: '-5px',
										}}
									/>
								</Box>
								<Typography
									variant="p"
									sx={{
										fontWeight: 'bold',
										fontFamily: 'Tahoma, sans-serif',
										color: 'black',
										fontSize: '11px',
									}}
								>
									{details.aprvby} 
								</Typography>
								<Typography
									sx={{
										fontSize: '11px',
										fontFamily: 'Tahoma, sans-serif',
										color: 'black',
									}}
								>
									APPROVED BY
								</Typography>
							</Box>
						</Box>

						<Box sx={{ border: '1px solid red', ml: '1cm', mr: '1cm' }}>
							<Typography
								sx={{
									textAlign: 'center',
									fontSize: '10px',
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
								}}
							>
								This is a computer-generated document. Any alteration or erasure
								will render this void and invalid.
							</Typography>
							<Typography
								sx={{
									textAlign: 'center',
									fontSize: '10px',
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
								}}
							>
								Date Generated: {currentDate.toLocaleDateString('en-US', options)} 
							</Typography>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
								}}
							>
								<QRCode value={QrValue} size={60} />
							</Box>
							<Typography
								sx={{
									textAlign: 'center',
									fontSize: '10px',
									fontFamily: 'Tahoma, sans-serif',
									color: 'black',
								}}
							>
								*** Valid Until: {twoDaysLater.toLocaleDateString('en-US', options)} ONLY ***
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default ApprovedFuel;
