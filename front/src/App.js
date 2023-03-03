import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Users from './user/pages/Users';
import Root from './shared/components/Navigation/Root';
import UserPlaces from './places/pages/UserPlaces';
import NewPlace from './places/pages/NewPlace'

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
				path: '/:userId/add',
				element: <NewPlace />,
			},
		],
	},
]);

//Now, we have to return something special below. We use the RouterProvider function and set params of router to call our const ourRouter.
function App() {
	return <RouterProvider router={ourRouter} />;
}

export default App;
