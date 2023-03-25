import { CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Bar from './scenes/bar/Bar';
import Calendar from './scenes/calendar/Calendar';
import Contacts from './scenes/contacts';
import Dashboard from './scenes/dashboard';

import Form from './scenes/form';
import Geography from './scenes/geography/Geography';
// import SpeedDialTooltipOpen from './scenes/global/Fab';
import Sidebar from './scenes/global/Sidebar';
import Topbar from './scenes/global/Topbar';
import Line from './scenes/line/Line';
import Pending from './scenes/pending';
import Pie from './scenes/pie/Pie';
import Team from './scenes/team';
import { ColorModeContext, useMode } from './theme';

import Landing from './components/landing';
import PrivateRoutes from './routes/PrivatRoutes';

const Main = () => {
	return (
		<>
			<Routes>
				<Route exact path="/login" element={<Landing />} />

				<Route element={<PrivateRoutes />}>
					<Route exact path="/" element={<Dashboard />} />
					<Route path="/team" element={<Team />} />
					<Route path="/contacts" element={<Contacts />} />
					<Route path="/invoices" element={<Pending />} />
					<Route path="/form" element={<Form />} />
					<Route path="/bar" element={<Bar />} />
					<Route path="/pie" element={<Pie />} />
					<Route path="/line" element={<Line />} />
					<Route path="/calendar" element={<Calendar />} />
					<Route path="/geography" element={<Geography />} />
				</Route>
			</Routes>
		</>
	);
};

export default Main;
