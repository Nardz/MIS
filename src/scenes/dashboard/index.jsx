import { Box } from '@mui/material';
import Header from '../../components/header/Header';

const Dashboard = () => {
	return (
		<Box m="20px">
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Header
					title="DASHBOARD"
					subtitle="Welcome to your Dashboardasdasdasdasd"
				/>
			</Box>
		</Box>
	);
};

export default Dashboard;
