import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
//import { Link } from 'react-router-dom';
import { tokens } from '../../theme';

import { Link, useNavigate } from 'react-router-dom';
import * as React from 'react';
//import axios from 'axios';
import axiosInstance from '../../api/axios';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { imageExists } from 'image-exists'


const Item = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<MenuItem
			active={selected === title}
			style={{
				color: colors.grey[100],
			}}
			onClick={() => setSelected(title)}
			icon={icon}
		>
			<Typography>{title}</Typography>
			<Link to={to} />
		</MenuItem>
	);
};

const Sidebar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [selected, setSelected] = useState('Dashboard');
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();

	const token = sessionStorage.getItem("token")
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	};

	const [empId, setEmpId] = useState(0);
	const [userType, setuserType] = useState('');
	const [Name, setName] = useState('');
	const [Pic, setPic] = useState('');

	
	function checkIfImageExists(url, callback) {
		const img = new Image();
		img.src = url;
		
		if (img.complete) {
			callback(true);
		} else {
			img.onload = () => {
				callback(true);
			};
			
			img.onerror = () => {
				callback(false);
			};
		}
	}


	useEffect(() => {
		 axiosInstance.get('UserAuth/Details',config)
		 .then((res) => {
			setEmpId(res.data.empid)
			setuserType(res.data.usertype)

			const name = res.data.name;
			const properName = name.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
			setName(properName)
			
			const yourImage = process.env.PUBLIC_URL + `assets/user/${empId}.png`;
			const defaultImage = process.env.PUBLIC_URL + `assets/user/user.png`;

			 
			
							checkIfImageExists(yourImage, (exists) => {
				if (exists) {
					setPic(yourImage)
				} else {
					setPic(defaultImage)
				}
				});

		 }).catch((err) =>{
			console.log(err)
			if(err.response.status == 401){
				sessionStorage.clear()
				navigate('/login');
			}else {
						console.log(err)
						const variant = 'error';
					enqueueSnackbar('Unable to retrieve user data', {
						variant,
					});
			}
		 })
			
		
	}, [empId, userType, Name,Pic]);




	return (
		<Box
			sx={{
				'& .pro-sidebar-inner': {
					background: `${colors.primary[400]} !important`,
				},
				'& .pro-icon-wrapper': {
					backgroundColor: 'transparent !important',
				},
				'& .pro-inner-item': {
					padding: '5px 35px 5px 20px !important',
				},
				'& .pro-inner-item:hover': {
					color: '#868dfb !important',
				},
				'& .pro-menu-item.active': {
					color: '#6870fa !important',
				},
			}}
		>
			<ProSidebar collapsed={isCollapsed}>
				<Menu iconShape="square">
					{/* LOGO AND MENU ICON */}
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
						style={{
							margin: '10px 0 20px 0',
							color: colors.grey[100],
						}}
					>
						{!isCollapsed && (
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								ml="15px"
							>
								<img
									alt="profile-user"
									width="30px"
									height="30px"
									src={`../../assets/logo.png`}
									style={{ cursor: 'pointer', borderRadius: '50%' }}
								/>
								<Typography
									variant="h2"
									color={colors.grey[100]}
									sx={{ fontWeight: 'bolder' }}
								>
									TWMC
								</Typography>
								<IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
									<MenuOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>

					{!isCollapsed && (
						<Box mb="25px">
							<Box display="flex" justifyContent="center" alignItems="center">
								<img
									alt="profile-user"
									width="100px"
									height="100px"
									src={`${Pic}`}
									style={{ cursor: 'pointer', borderRadius: '50%' }}
								/>
							</Box>
							<Box textAlign="center">
								<Typography
									variant="h2"
									color={colors.grey[100]}
									fontWeight="bold"
									sx={{ m: '10px 0 0 0' }}
								>
									{//Juan Dela Cruz
										Name
									}
								</Typography>
								<Typography variant="h5" color={colors.greenAccent[500]}>
								
									{userType}
								
								</Typography>
							</Box>
						</Box>
					)}

					<Box paddingLeft={isCollapsed ? undefined : '10%'}>
						<Item
							title="Dashboard"
							to="/"
							icon={<HomeOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Typography
							variant="h6"
							color={colors.grey[300]}
							sx={{ m: '15px 0 5px 20px' }}
						>
							Pages
						</Typography>

						<Item
							title="Employees "
							to="/employees"
							icon={<ContactsOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Vehicles "
							to="/vehicles"
							icon={<LocalShippingIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Pending Requests"
							to="/pending"
							icon={<ReceiptOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Approved Requests"
							to="/approved"
							icon={<ThumbUpAltIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Typography
							variant="h6"
							color={colors.grey[300]}
							sx={{ m: '15px 0 5px 20px' }}
						>
							Forms
						</Typography>
						<Item
							title="Add Employee"
							to="/newEmployee"
							icon={<PersonOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Add Vehicle"
							to="/newVehicle"
							icon={<NoCrashIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Calendar"
							to="/calendar"
							icon={<CalendarTodayOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						{/*			<Item
							title="FAQ Page"
							to="/faq"
							icon={<HelpOutlineOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

					<Typography
							variant="h6"
							color={colors.grey[300]}
							sx={{ m: '15px 0 5px 20px' }}
						>
							 Charts
						</Typography>
						<Item
							title="Bar Chart"
							to="/bar"
							icon={<BarChartOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Pie Chart"
							to="/pie"
							icon={<PieChartOutlineOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Line Chart"
							to="/line"
							icon={<TimelineOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Geography Chart"
							to="/geography"
							icon={<MapOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/> */}
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	);
};

export default Sidebar;
