import React from 'react';
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Link,
} from 'react-router-dom';

import Users from './user/pages/Users';
import Places from './places/pages/Places'

//Updated React Router Dom; We use function with parameters of an array filled with objects. Each object represents a route.
const ourRouter = createBrowserRouter([
	{
		path: '/',
        element: <Users />,
	},
	{
		path: '/places',
        element: <Places />,
	},
]);

//Now, we have to return something special below. We use the RouterProvider function and set params of router to call our const ourRouter.
function App() {
	return <RouterProvider router={ourRouter} />;
}

export default App;
