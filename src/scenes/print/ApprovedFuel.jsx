import {
	Box,
	Button,
	colors,
	Paper,
	Typography,
	useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Route, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import { tokens } from '../../theme';

const ApprovedFuel = () => {
	const { id } = useParams();
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const QrValue = 'this is a test';

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
				{/* <Header title="PO DETAILS" subtitle="Purchase Order Details." /> */}
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Button
						onClick={Print}
						color="info"
						variant="contained"
						sx={{ fontWeight: 'bold', width: '7.6cm', m: 1 }}
					>
						PRINT
					</Button>
				</Box>

				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Box
						sx={{ width: '7.6cm', p: 2 }}
						component={Paper}
						elevation={20}
						id="printablediv"
					>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Box>
								<img
									src="..\..\assets\logo.png"
									style={{ width: '35px' }}
									alt="logo"
								></img>
							</Box>
							<Box>
								<Typography
									sx={{
										ml: 1,
										mr: 1,
										fontWeight: 'bold',
										textAlign: 'center',
										fontSize: '9px',
									}}
								>
									TACLOBAN WINNER MARKETING CORPORATION
								</Typography>
								<Typography
									sx={{
										ml: 1,
										mr: 1,
										fontWeight: 'bold',
										textAlign: 'center',
										fontSize: '14px',
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
							}}
						>
							<Typography>PO # : </Typography>
							<Typography
								sx={{ fontWeight: 'bold', color: 'red' }}
								variant="h4"
							>
								TAC-F001331
							</Typography>
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Typography>PO DATE : </Typography>
							<Typography>03/09/2023</Typography>
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Typography>SUPPLIER : </Typography>
							<Typography>SHELL ABUCAY</Typography>
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Typography>PLATE NO. : </Typography>
							<Typography>HAC 1234</Typography>
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
							}}
						>
							<Box
								sx={{
									width: '100%',
									textAlign: 'center',
								}}
							>
								<Typography variant="h2" sx={{ fontWeight: 'bold' }}>
									DIESEL
								</Typography>

								<Typography variant="p">TYPE</Typography>
							</Box>

							<Box
								sx={{
									width: '100%',
									textAlign: 'center',
									fontWeight: 'bold',
								}}
							>
								<Typography variant="h2" sx={{ fontWeight: 'bold' }}>
									120
								</Typography>
								<Typography>LITRES</Typography>
							</Box>
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								mt: 1,
							}}
						>
							<Typography>ROUTE : </Typography>
							<Typography>KALIBO</Typography>
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Typography>NO. OF BAGS : </Typography>
							<Typography>420</Typography>
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Typography>REQUESTED BY : </Typography>
							<Typography>JUAN DELA CRUZ</Typography>
						</Box>
						{''}
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								mt: 1,
								p: 1,
							}}
						>
							<Box
								sx={{
									width: '100%',
									textAlign: 'center',
									mt: 1,
								}}
							>
								<Box sx={{ position: 'relative' }}>
									<img
										src="../../assets/esignature/40.png"
										alt=""
										height="50px"
										style={{
											position: 'absolute',
											bottom: '-25px',
											left: '-20px',
										}}
									/>
								</Box>

								<Typography variant="p" sx={{ fontWeight: 'bold' }}>
									JUAN DELA CRUZ
								</Typography>

								<Typography sx={{ fontSize: '12px' }}>PREPARED BY</Typography>
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
										src="../../assets/esignature/2.png"
										alt=""
										width="130px"
										style={{
											position: 'absolute',
											bottom: '-25px',
											left: '-5px',
										}}
									/>
								</Box>
								<Typography variant="p" sx={{ fontWeight: 'bold' }}>
									JUAN DELA CRUZ
								</Typography>
								<Typography sx={{ fontSize: '12px' }}>APPROVED BY</Typography>
							</Box>
						</Box>

						<Box sx={{ border: '1px solid red' }}>
							<Typography sx={{ textAlign: 'center', fontSize: '10px' }}>
								This is a computer-generated document. Any alteration or erasure
								will render this void and invalid.
							</Typography>
							<Typography sx={{ textAlign: 'center', fontSize: '10px' }}>
								Date Generated: March 10, 2023
							</Typography>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<QRCode value={QrValue} size={60} />
							</Box>
							<Typography sx={{ textAlign: 'center', fontSize: '10px' }}>
								**** Valid Until: March 12, 2023 ONLY ***
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default ApprovedFuel;
