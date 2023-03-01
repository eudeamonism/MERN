import React from 'react';
import classes from './MainNavigation.module.css';
import { Link } from 'react-router-dom';
import MainHeader from './MainHeader';

function MainNavigation() {
	return (
		<MainHeader>
			<button className={classes['main-navigation__menu-btn']}>
				<span />
				<span />
				<span />
			</button>
			<h1 className={classes['main-navigation__title']}>
				<Link to="/">Your Places</Link>
			</h1>
			<nav>...</nav>
		</MainHeader>
	);
}

export default MainNavigation;
