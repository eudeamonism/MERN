import { Outlet } from 'react-router-dom';

import MainNavigation from './MainNavigation';
import classes from './Root.module.css'
//Could add class to main but it inherits classes from child Header L273 React
function RootLayout() {
	return (
		<>
			<MainNavigation />
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default RootLayout;
