import { Box, Chip, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';
import { JOVehicleList } from '../../data/mockData';
import { tokens } from '../../theme';

const MyBox = styled(Box)((theme) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}));

const JOVehicles = () => {
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedItem(null);
	};

	const [selectedItem, setSelectedItem] = useState(null);
	const [joStatus, setJOStatus] = useState(null);

	const handleItemClick = (jo, status) => {
		setSelectedItem(jo);
		setJOStatus(status);
		handleClickOpen(true);
	};

	const [hoveredBox, setHoveredBox] = useState(null);

	const handleBoxHover = (id) => {
		setHoveredBox(id);
	};

	return (
		<>
			{JOVehicleList.map((jo) => (
				<Box
					p="1em"
					sx={{
						background: colors.main[200],
						border: '1px solid',
						borderColor: colors.main[400],
					}}
					onMouseEnter={() => handleBoxHover(`${jo.id}`)}
					onMouseLeave={() => handleBoxHover(null)}
					style={{
						transform: hoveredBox === `${jo.id}` ? 'scale(1.05)' : 'scale(1)',
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
							{jo.jonum}
						</Typography>

						{jo.branch === 'TACLOBAN' ? (
							<Chip
								label={jo.branch}
								size="small"
								sx={{
									fontWeight: 'bold',
									backgroundColor: colors.leySamAccent,
								}}
							></Chip>
						) : jo.branch === 'SOGOD' ? (
							<Chip
								label={jo.branch}
								color="success"
								size="small"
								sx={{ fontWeight: 'bold' }}
							></Chip>
						) : (
							<Chip
								label={jo.branch}
								color="error"
								size="small"
								sx={{ fontWeight: 'bold' }}
							></Chip>
						)}
					</Box>

					<MyBox>
						<Typography color={colors.redAccent[500]}></Typography>
						<Typography color={colors.grey[100]} align="right">
							{jo.jodate}
						</Typography>
					</MyBox>
					<MyBox>
						<Typography>Supplier:</Typography>
						<Typography color={colors.grey[100]} align="right">
							{jo.supplier}
						</Typography>
					</MyBox>
					<MyBox>
						<Typography>Service Type:</Typography>
						<Typography
							color={colors.grey[100]}
							align="right"
							sx={{ fontWeight: 'bold' }}
						>
							{jo.serviceType}
						</Typography>
					</MyBox>
					<MyBox>
						<Typography>Specification:</Typography>
						<Typography
							color={colors.grey[100]}
							align="right"
							sx={{ fontWeight: 'bold' }}
						>
							{jo.specification}
						</Typography>
					</MyBox>
					<MyBox>
						<Typography>Target Start Date:</Typography>
						<Typography color={colors.grey[100]} align="right">
							{jo.tStartDate}
						</Typography>
					</MyBox>
					<MyBox>
						<Typography>Target End Date:</Typography>
						<Typography color={colors.grey[100]} align="right">
							{jo.tEndtDate}
						</Typography>
					</MyBox>
					<MyBox>
						<Typography>Payment Schedule</Typography>
						<Typography color={colors.grey[100]} align="right">
							{jo.paySchedule}
						</Typography>
					</MyBox>

					<MyBox>
						<Typography>Requested By: </Typography>
						<Typography color={colors.grey[100]} align="right">
							{jo.requestedBy}
						</Typography>
					</MyBox>
					<MyBox>
						<Typography>Prepared By: </Typography>
						<Typography color={colors.grey[100]} align="right">
							{jo.preparedBy}
						</Typography>
					</MyBox>
					<MyBox>
						<Typography sx={{ fontWeight: 'bold' }} variant="h3">
							Total Amount
						</Typography>
						<Typography
							color={colors.grey[100]}
							align="right"
							sx={{ fontWeight: 'bold' }}
							variant="h3"
						>
							₱&nbsp;{jo.totalAmount}
						</Typography>
					</MyBox>
					<MyBox>
						<TableContainer
							component={Paper}
							sx={{ mt: 1, mb: 1, backgroundColor: colors.main[300] }}
						>
							<Table
								sx={{ overflowX: 'hidden' }}
								size="small"
								aria-label="a dense table"
							>
								<TableHead>
									<TableRow>
										<TableCell align="center" sx={{ fontWeight: 'bold' }}>
											SCOPE
										</TableCell>
										<TableCell align="center" sx={{ fontWeight: 'bold' }}>
											QUANTITY
										</TableCell>
										<TableCell align="center" sx={{ fontWeight: 'bold' }}>
											AMOUNT
										</TableCell>
										<TableCell align="center" sx={{ fontWeight: 'bold' }}>
											VEHICLE
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{jo.details.map((row) => (
										<TableRow
											key={row.id}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{row.scope}
											</TableCell>
											<TableCell align="center">{row.quantity}</TableCell>
											<TableCell align="center">{row.amount}</TableCell>
											<TableCell align="center">{row.platenum}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</MyBox>

					<Stack
						spacing={2}
						direction="row"
						sx={{ display: 'flex', justifyContent: 'center' }}
					>
						<Button
							variant="contained"
							size="small"
							color="error"
							sx={{ fontWeight: 'bold' }}
							key={jo.id}
							onClick={() => handleItemClick(jo, 'DECLINE')}
						>
							DECLINE
						</Button>
						<Button
							variant="contained"
							size="small"
							color="success"
							onClick={() => handleItemClick(jo, 'APPROVE')}
							sx={{ color: colors.primary, fontWeight: 'bold' }}
						>
							APPROVE
						</Button>
					</Stack>
				</Box>
			))}

			<Dialog
				open={open}
				keepMounted
				onClose={handleClose}
				aria-describedby="FUEL PURCHASE ORDER"
			>
				<DialogTitle
					id="FUEL PURCHASE ORDER"
					className={joStatus}
					sx={{
						fontWeight: 'bold',
					}}
					color={
						`${joStatus}` === 'APPROVE'
							? colors.greenAccent[500]
							: colors.redAccent[500]
					}
				>
					{joStatus}
					{' JOB ORDER '}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to {joStatus} Fuel Purchase Order with number{' '}
						{selectedItem?.jonum}?
					</DialogContentText>
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
						onClick={handleClose}
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

export default JOVehicles;
