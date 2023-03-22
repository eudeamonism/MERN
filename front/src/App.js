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
import { useAuth } from './shared/hooks/auth-hook';

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
	const { token, login, logout, userId } = useAuth();
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
