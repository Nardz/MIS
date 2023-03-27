import { Box, Chip, TextField, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { poFuel, userTypes } from '../../data/mockData';
import { tokens } from '../../theme';

import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

const MyBox = styled(Box)((theme) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}));

const PoFuel = () => {
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { enqueueSnackbar } = useSnackbar();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedItem(null);
	};

	const [selectedItem, setSelectedItem] = useState(null);
	const [poStatus, setPoStatus] = useState(null);

	const handleItemClick = (po, status) => {
		setSelectedItem(po);
		setPoStatus(status);
		handleClickOpen(true);
	};

	const [hoveredBox, setHoveredBox] = useState(null);

	const handleBoxHover = (id) => {
		setHoveredBox(id);
	};

	const [approvedFuel, setApprovedFuel] = useState(0);

  const handleApprovedFuelChange = (event) => {
    setApprovedFuel(parseInt(event.target.value));
  };

	const [remark, setRemark] = useState('');

  const handleRemarkChange = (event) => {
    setRemark(event.target.value);
  };

	const empId = parseInt(sessionStorage.getItem("empId"))
  const userType = parseInt(sessionStorage.getItem("userType"))
  const branchId = parseInt(sessionStorage.getItem("branch"))


	
	var FuelLiters = approvedFuel

	const ApprvFuel = () => {

		if (approvedFuel == null || approvedFuel == 0) {
			FuelLiters = selectedItem.noLiters
		}
		const url = 'https://localhost:7010/api/POFuel/ApprovePOFuel'
		const data = {
			"fuelRequestId": selectedItem.id,
			"ponum": selectedItem.poNumber,
			"preAprvby": null,
			"preDate": null,
			"preAprvNumLiters": null,
			"preAprvNotes": null,
			"aprvBy": empId,
			"aprvDate": null,
			"aprvNumLiters": FuelLiters,
			"notes": "",
			"status": 3
		}

		axios.post(url,data)
			.then((res)=> {

				const variant = 'success';
				enqueueSnackbar('Po Number: ' + selectedItem.poNumber + 'successfully added!', {
					variant,
				});

				setApprovedFuel(0)
			
			handleClose()
			}).catch((error) => {
				console.log(error.response.data)
				const variant = 'error';
				enqueueSnackbar('Unable to Add Po Number: ' + selectedItem.poNumber, {
					variant,
				});
				handleClose()
			})
		
	}

	const DecFuel = () => {

		if (remark == '' || remark == null) {
			const variant = 'error';
				enqueueSnackbar('Remarks is required before declining PO Number: ' + selectedItem.poNumber, {
					variant,
				});
		}else{

			const url = 'https://localhost:7010/api/POFuel/ApprovePOFuel'
		const data = {
			"fuelRequestId": selectedItem.id,
			"ponum": selectedItem.poNumber,
			"preAprvby": null,
			"preDate": null,
			"preAprvNumLiters": null,
			"preAprvNotes": null,
			"aprvBy": empId,
			"aprvDate": null,
			"aprvNumLiters": null,
			"notes": remark,
			"status": 4
		}

		axios.post(url,data)
			.then((res)=> {

				const variant = 'success';
				enqueueSnackbar('Po Number: ' + selectedItem.poNumber + ' successfully declined!', {
					variant,
				});

				setRemark('')
			
			handleClose()
			}).catch((error) => {
				console.log(error.response.data)
				const variant = 'error';
				enqueueSnackbar('Unable to decline Po Number: ' + selectedItem.poNumber, {
					variant,
				});
				handleClose()
			})

		}
		
	}

	const CxlFuel = () => {

		if (remark == '' || remark == null) {
			const variant = 'error';
				enqueueSnackbar('Remarks is required before cancelling PO Number: ' + selectedItem.poNumber, {
					variant,
				});
		}else{

			const url = `https://localhost:7010/api/POFuel/CxlPOFuel/${selectedItem.id}`
		const data = {
			"fuelRequestId": 0,
			"poNumber": "",
			"remarks": remark
		}

		axios.put(url,data)
			.then((res)=> {

				const variant = 'success';
				enqueueSnackbar('Po Number: ' + selectedItem.poNumber + ' successfully canceled!', {
					variant,
				});

				setRemark('')
			
			handleClose()
			}).catch((error) => {
				console.log(error.response.data)
				const variant = 'error';
				enqueueSnackbar('Unable to cancel Po Number: ' + selectedItem.poNumber, {
					variant,
				});
				handleClose()
			})

		}
		
	}


	

	const  [pending, setPending] = useState([])
	
	


	useEffect(() =>{


		var url = ''
		
		userType == 1 || userType == 2  || userType == 3 ?
		url = 'https://localhost:7010/api/POFuel/PoFuelDetailsPending' 
		: url = `https://localhost:7010/api/POFuel/PoFuelDetailsPending/${branchId}`

		const intervalid = setInterval(() =>{
			axios.get(url).
			then((res)=>{
			
					setPending(res.data)
				
			}).catch((err) =>{
				console.log(err)
			})


		},1000)

		return () => clearInterval(intervalid)
		
	},[])

	return (
		<>
			{
			
			
					pending.map((po)=>(
						<Box key={po.id}
					p="1em"
					sx={{
						background: colors.main[200],
						border: '1px solid',
						borderColor: colors.main[400],
					}}
					onMouseEnter={() => handleBoxHover(`${po.id}`)}
					onMouseLeave={() => handleBoxHover(null)}
					style={{
						transform: hoveredBox === `${po.poNumber}` ? 'scale(1.05)' : 'scale(1)',
						transition: 'transform 0.2s ease-in-out',
					}}
				>
					<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography
							color="secondary"
							variant="h4"
							sx={{
								fontWeight: 'bold',
							}}
						>
							{po.poNumber}
						</Typography>
						<Chip
							label={po.branch}
							color="warning"
							size="small"
							sx={{ fontWeight: 'bold' }}
						/>
					</Box>

					<MyBox>
						<Typography color={colors.redAccent[500]}> </Typography>
						<Typography color={colors.grey[100]} align="right">
							{po.date}
						</Typography>
					</MyBox>
					<MyBox>
						<Typography>SUPPLIER:</Typography>
						<Typography color={colors.grey[100]} align="right">
							{po.supplierName}
						</Typography>
					</MyBox>
					<MyBox>
						<Typography>PLATE#:</Typography>
						<Typography color={colors.grey[100]} align="right">
							{po.plateNo}
						</Typography>
					</MyBox>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-around',
							alignItems: 'center',
						}}
					>
						<MyBox>
							<Typography
								variant="h4"
								sx={{
									fontWeight: 'Bolder',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								{po.fuel}
							</Typography>
						</MyBox>

						<MyBox>
							<Typography
								variant="h4"
								sx={{
									fontWeight: 'Bolder',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								{po.noLiters}
							</Typography>
						</MyBox>
					</Box>

					<MyBox>
						<Typography>ROUTE:</Typography>
						<Typography color={colors.grey[100]} align="right">
							{po.route}
						</Typography>
					</MyBox>
					<MyBox>
						<Typography>NO. OF BAGS:</Typography>
						<Typography color={colors.grey[100]} align="right">
							{po.noBags}
						</Typography>
					</MyBox>
					<MyBox>
						<Typography>REQUESTED BY:</Typography>
						<Typography color={colors.grey[100]} align="right">
							{po.requestor}
						</Typography>
					</MyBox>
					<MyBox>
						<Typography>PREPARED BY:</Typography>
						<Typography color={colors.grey[100]} align="right">
							{po.preparer}
						</Typography>
					</MyBox>
					<MyBox>
						<Typography>REMARKS:</Typography>
						<Typography color={colors.grey[100]} align="right">
							{po.remarks}
						</Typography>
					</MyBox>

					<Stack
						spacing={2}
						direction="row"
						sx={{ display: 'flex', justifyContent: 'center' }}
					>
						
						{empId == po.emp ? (
								<>
									<Button
										variant="contained"
										size="small"
										color="error"
										sx={{ fontWeight: 'bold' }}
										key={po.poNumber}
										onClick={() => handleItemClick(po, 'CANCEL')}
									>
										CANCEL
									</Button>
								</>
							) : userType == 1 || userType == 2  || userType == 3 ? (
								<>
								<Button
									variant="contained"
									size="small"
									color="error"
									sx={{ fontWeight: 'bold' }}
									key={po.poNumber							}
									onClick={() => handleItemClick(po, 'DECLINE')}
								>
									DECLINE
								</Button>
								<Button
									variant="contained"
									size="small"
									color="success"
									onClick={() => handleItemClick(po, 'APPROVE')}
									sx={{ color: colors.primary, fontWeight: 'bold' }}
								>
									APPROVE
								</Button> 
								</>
							): null
							}
						{/* <Button
							variant="contained"
							size="small"
							color="error"
							sx={{ fontWeight: 'bold' }}
							key={po.poNumber							}
							onClick={() => handleItemClick(po, 'DECLINE')}
						>
							DECLINE
						</Button>
						<Button
							variant="contained"
							size="small"
							color="success"
							onClick={() => handleItemClick(po, 'APPROVE')}
							sx={{ color: colors.primary, fontWeight: 'bold' }}
						>
							APPROVE
						</Button> */}
					</Stack>
				</Box>
					))
			
		}

			<Dialog
				open={open}
				keepMounted
				onClose={handleClose}
				aria-describedby="FUEL PURCHASE ORDER"
			>
				<DialogTitle
					id="FUEL PURCHASE ORDER"
					className={poStatus}
					sx={{
						fontWeight: 'bold',
					}}
					color={
						`${poStatus}` === 'APPROVE'
							? colors.greenAccent[500]
							: colors.redAccent[500]
					}
				>
					{poStatus}
					{' FUEL PURCHASE ORDER '}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to {poStatus} Fuel Purchase Order with number{' '}
						{selectedItem?.poNumber}?
					</DialogContentText>
					{/* <TextField
						fullWidth
						variant="filled"
						size="small"
						type="text"
						label="Remarks"
						name="encumberedTo"
						color="secondary"
						required
						sx={{ mt: 1 }}
					/> */}

					{poStatus === 'APPROVE' ? (
						<TextField
							fullWidth
							variant="filled"
							size="small"
							type="text"
							label="Change No. of Liters"
							name="approvedFuel"
							color="secondary"
							sx={{ mt: 1 }}
							value={approvedFuel}
							onChange={handleApprovedFuelChange}
						/>
					) : (
						<TextField
							fullWidth
							variant="filled"
							size="small"
							type="text"
							label="Remarks"
							name="remarks"
							color="secondary"
							sx={{ mt: 1 }}
							value={remark}
							onChange={handleRemarkChange}
						/>
					)}
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						onClick={handleClose}
						color="error"
						variant="outlined"
						sx={{ color: colors.primary, fontWeight: 'bold' }}
					>
						NO
					</Button>
					<Button
						onClick={poStatus === 'APPROVE' ? ApprvFuel : poStatus === 'DECLINE' ? 
					DecFuel : CxlFuel}
						autoFocus
						variant="outlined"
						color="success"
						sx={{ color: colors.primary, fontWeight: 'bold' }}
					>
						YES
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default PoFuel;
