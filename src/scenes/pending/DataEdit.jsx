import { Box, Chip, useTheme } from '@mui/material';
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
import { dataEditList } from '../../data/mockData';
import { tokens } from '../../theme';

import * as React from 'react';

const MyBox = styled(Box)((theme) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}));

const DataEdit = () => {
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
	const [deStatus, setDeStatus] = useState(null);

	const handleItemClick = (de, status) => {
		setSelectedItem(de);
		setDeStatus(status);
		handleClickOpen(true);
	};

	const [hoveredBox, setHoveredBox] = useState(null);

	const handleBoxHover = (id) => {
		setHoveredBox(id);
	};

	return (
		<>
			{dataEditList.map((de) => (
				<Box
					p="1em"
					sx={{
						background: colors.main[200],
						border: '1px solid',
						borderColor: colors.main[400],
					}}
					onMouseEnter={() => handleBoxHover(`${de.id}`)}
					onMouseLeave={() => handleBoxHover(null)}
					style={{
						transform: hoveredBox === `${de.id}` ? 'scale(1.05)' : 'scale(1)',
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
							{de.ticketNumber}
						</Typography>
						<Chip
							label={de.branch}
							color="warning"
							size="small"
							sx={{ fontWeight: 'bold' }}
						/>
					</Box>
					<MyBox>
						<Typography color={colors.redAccent[500]}></Typography>
						<Typography color={colors.grey[100]} align="right">
							{de.date}
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
									p: 1,
								}}
							>
								{de.pojonumber}
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
								{de.type}
							</Typography>
						</MyBox>
					</Box>

					<MyBox>
						<Typography>REASON:</Typography>
						<Typography color={colors.grey[100]} align="right">
							{de.reason}
						</Typography>
					</MyBox>

					<MyBox>
						<Typography>REQUESTED BY:</Typography>
						<Typography color={colors.grey[100]} align="right">
							{de.requestedBy}
						</Typography>
					</MyBox>
					<MyBox>
						<Typography>PRE-APPROVED BY:</Typography>
						<Typography color={colors.grey[100]} align="right">
							{de.preApprovedById}
						</Typography>
					</MyBox>

					<Stack
						spacing={2}
						direction="row"
						sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}
					>
						<Button
							variant="contained"
							size="small"
							color="error"
							sx={{ fontWeight: 'bold' }}
							key={de.id}
							onClick={() => handleItemClick(de, 'DECLINE')}
						>
							DECLINE
						</Button>
						<Button
							variant="contained"
							size="small"
							color="success"
							onClick={() => handleItemClick(de, 'APPROVE')}
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
					className={deStatus}
					sx={{
						fontWeight: 'bold',
					}}
					color={
						`${deStatus}` === 'APPROVE'
							? colors.greenAccent[500]
							: colors.redAccent[500]
					}
				>
					{deStatus}
					{' FUEL PURCHASE ORDER '}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to {deStatus} Fuel Purchase Order with number{' '}
						{selectedItem?.ticketNumber}?
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

export default DataEdit;
