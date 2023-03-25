import { Box } from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Header from '../../components/header/Header';
import { dataEditList, JOVehicleList, poFuel } from '../../data/mockData';

import * as React from 'react';
import DataEdit from './DataEdit';
import JOVehicles from './JOVehicles';
import PoFuel from './PoFuel';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		right: -11,
		top: 8,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
	},
}));

const Approved = () => {
	const [value, setValue] = useState(0);
	// const theme = useTheme();
	// const colors = tokens(theme.palette.mode);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box m="20px" sx={{ maxHeight: '500px' }}>
			<Header title="APPROVED REQUESTS" subtitle="List of approved requests." />

			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={value}
					onChange={handleChange}
					textColor="secondary"
					indicatorColor="secondary"
					aria-label="basic tabs example"
				>
					<Tab
						label={
							<StyledBadge badgeContent={poFuel.length} color="secondary">
								PO FUEL
							</StyledBadge>
						}
						{...a11yProps(0)}
					/>

					<Tab
						sx={{ width: '100px' }}
						label={
							<StyledBadge
								badgeContent={JOVehicleList.length}
								color="secondary"
							>
								JOB ORDER
							</StyledBadge>
						}
						{...a11yProps(1)}
					/>

					<Tab
						label={
							<StyledBadge badgeContent={dataEditList.length} color="secondary">
								DATA EDIT
							</StyledBadge>
						}
						{...a11yProps(2)}
					/>
				</Tabs>
			</Box>

			<TabPanel value={value} index={0} sx={{}}>
				<Box
					// sx={{
					// 	display: 'grid',
					// 	gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
					// 	gap: '15px',
					// 	// maxHeight: '60vh',
					// 	// overflowY: 'auto',
					// 	// overflowZ: 'hidden',
					// 	// width: '100%',
					// }}
					sx={{ p: 0, m: 0 }}
				>
					<PoFuel />
				</Box>
			</TabPanel>

			<TabPanel value={value} index={1}>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
						gap: '15px',
						// maxHeight: '60vh',
						// overflowY: 'auto',
						// overflowZ: 'hidden',
						// width: '100%',
					}}
				>
					<JOVehicles />
				</Box>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
						gap: '15px',
						// maxHeight: '60vh',
						// overflowY: 'auto',
						// overflowZ: 'hidden',
						// width: '100%',
					}}
				>
					<DataEdit />
				</Box>
			</TabPanel>
		</Box>
	);
};

export default Approved;
