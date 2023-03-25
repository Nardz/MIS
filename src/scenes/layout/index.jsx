
import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import SpeedDialTooltipOpen from '../global/Fab';
import Sidebar from '../global/Sidebar';
import Topbar from '../global/Topbar';

const Layout = () => {
	const [isSidebar, setIsSidebar] = useState(true);
	return (
		<>
			
				<Sidebar isSidebar={isSidebar} />
				<main className="content">
					<Topbar setIsSidebar={setIsSidebar} />

					<Outlet />
				</main>
				<SpeedDialTooltipOpen />
			
		</>
	);
};

export default Layout;
