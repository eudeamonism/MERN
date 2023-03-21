import React, { useState, useCallback, useEffect } from 'react';
import {
	createBrowserRouter,
	RouterProvider,
	useNavigate,
} from 'react-router-dom';

import Users from './user/pages/Users';
import Root from './shared/components/Navigation/Root';
import UserPlaces from './places/pages/UserPlaces';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

let logoutTimer;

//Updated React Router Dom; We use function with parameters of an array filled with objects. Each object represents a route.
const ourRouter = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/',
				element: <Users />,
			},
			{
				path: '/:userId/places',
				element: <UserPlaces />,
			},
			{
				path: '/places/new',
				element: <NewPlace />,
			},
			{
				path: '/places/:placeId',
				element: <UpdatePlace />,
			},
			{
				path: '/auth',
				element: <Auth />,
			},
		],
	},
]);

//Now, we have to return something special below. We use the RouterProvider function and set params of router to call our const ourRouter.
function App() {
	const [token, setToken] = useState(false);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [userId, setUserId] = useState(false);

	let routes;

	if (token) {
		routes = [
			{ path: '/', element: <Users /> },
			{ path: '/:userId/places', element: <UserPlaces /> },
			{ path: '/auth', element: <Auth /> },
		];
	} else {
		routes = {};
	}
	//Will work on storing token for further logins
	//tokenExpirationDate is scoped below and is not the useState variable
	const login = useCallback((uid, token, expirationDate) => {
		setToken(token);
		setUserId(uid);
		const tokenExpirationDate =
			expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid,
				token: token,
				expiration: tokenExpirationDate.toISOString(),
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setTokenExpirationDate(null);
		setUserId(null);
		localStorage.removeItem('userData');
	}, []);

	//If token changes,
	useEffect(() => {
		if (token && tokenExpirationDate) {
			//getTime() converts to milliseconds, which is what is expected in setTimeout.
			const remainingTime =
				tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	//Runs only once per restart, and we will find token when it mounts, renders the first time.
	useEffect(() => {
		//Parse takes a string and converts it to an object.
		//This will have a userId and a token.
		const storedData = JSON.parse(localStorage.getItem('userData'));
		//Token is still in the future therefore valid
		if (
			storedData &&
			storedData.token &&
			new Date(storedData.expiration) > new Date()
		) {
			login(
				storedData.userId,
				storedData.token,
				new Date(storedData.expiration)
			);
		}
	}, [login]);

	//we pass handlers and state in our provider which is connected to the whole application
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				login: login,
				logout: logout,
			}}
		>
			<RouterProvider router={ourRouter} />
		</AuthContext.Provider>
	);
}

export default App;
