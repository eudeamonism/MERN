import React, { useState } from 'react';
import classes from './MainNavigation.module.css';
import { Link } from 'react-router-dom';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

function MainNavigation() {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	const openDrawer = () => {
		setDrawerIsOpen(true);
	};

	const closeDrawer = () => {
		setDrawerIsOpen(false);
	};

	return (
		<>
            {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
			{drawerIsOpen && (
				<SideDrawer>
					<nav className={classes['main-navigation__drawer-nav']}>
						<NavLinks />
					</nav>
				</SideDrawer>
			)}
			<MainHeader>
				<button
					className={classes['main-navigation__menu-btn']}
					onClick={openDrawer}
				>
					<span />
					<span />
					<span />
				</button>
				<h1 className={classes['main-navigation__title']}>
					<Link to="/">Your Places</Link>
				</h1>
				<nav className={classes['main-navigation__header-nav']}>
					<NavLinks />
				</nav>
			</MainHeader>
		</>
	);
}

export default MainNavigation;
