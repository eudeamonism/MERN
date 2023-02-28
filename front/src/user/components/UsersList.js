import React from 'react';
import classes from './UsersList.module.css';

import UserItem from './UserItem';

function UsersList(props) {
	if (props.items.length === 0) {
		return <div className={classes.center}>No users found.</div>;
	}
//using map method for props.items; we simply pass a parameter where we get more attributes for received data.
	return (
		<>
			{props.items.map((user) => (
				<UserItem
					key={user.id}
					id={user.id}
					image={user.image}
                    name={user.name}
                    placeCount={user.places}
				/>
			))}
		</>
	);
}

export default UsersList;
