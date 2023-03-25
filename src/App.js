import { CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import Bar from './scenes/bar/Bar';
import Calendar from './scenes/calendar/Calendar';
import Dashboard from './scenes/dashboard';
import Users from './scenes/users';

import Login from './components/landing/Login';
import Registration from './components/landing/Registration';
import Reset from './components/landing/Reset';
import WNav from './components/landing/WNav';
import PrivateRoutes from './routes/PrivatRoutes';
import Approved from './scenes/approved';
import DateEdit from './scenes/forms/Create/DateEdit';
import Fuel from './scenes/forms/Create/Fuel';
import IT from './scenes/forms/Create/IT';
import JOVehicle from './scenes/forms/Create/JOVehicle';
import NewEmployee from './scenes/forms/Create/NewEmployee';
import Vehicle from './scenes/forms/Create/NewVehicle';
import EditEmployee from './scenes/forms/Edit/EditEmployee';
import EditVehicle from './scenes/forms/Edit/EditVehicles';
import Geography from './scenes/geography/Geography';
import Layout from './scenes/layout';
import Line from './scenes/line/Line';
import Pending from './scenes/pending';
import Pie from './scenes/pie/Pie';
import ApprovedFuel from './scenes/print/ApprovedFuel';
import Team from './scenes/team';
import Vehicles from './scenes/vehicles';
import { ColorModeContext, useMode } from './theme';


function App() {
	const [theme, colorMode] = useMode();
	const [isSidebar, setIsSidebar] = useState(true);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<div className="app">
					<Routes>
						<Route element={<WNav />}>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Registration />} />
							<Route path="/reset" element={<Reset />} />
						</Route>

						<Route element={<PrivateRoutes />}>
							<Route element={<Layout />}>
								<Route exact path="/" element={<Dashboard />} />

								<Route path="/team" element={<Team />} />

								<Route path="/employees" element={<Users />} />
								<Route path="/employees/:id" element={<EditEmployee />} />

								<Route path="/vehicles" element={<Vehicles />} />
								<Route path="/vehicles/:id" element={<EditVehicle />} />

								<Route path="/pending" element={<Pending />} />
								<Route path="/approved" element={<Approved />} />

								<Route path="/approvedFuel/:id" element={<ApprovedFuel />} />

								<Route path="/newEmployee" element={<NewEmployee />} />
								<Route path="/newVehicle" element={<Vehicle />} />
								<Route path="/bar" element={<Bar />} />
								<Route path="/pie" element={<Pie />} />
								<Route path="/line" element={<Line />} />
								<Route path="/calendar" element={<Calendar />} />
								<Route path="/geography" element={<Geography />} />

								<Route path="/form-fuel" element={<Fuel />} />
								<Route path="/form-IT" element={<IT />} />
								<Route path="/form-JOVehicle" element={<JOVehicle />} />
								<Route path="/form-dateEdit" element={<DateEdit />} />
							</Route>
						</Route>
					</Routes>
				</div>
				<CssBaseline />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
