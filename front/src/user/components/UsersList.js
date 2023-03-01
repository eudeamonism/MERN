import React from 'react';
import classes from './UsersList.module.css';

import UserItem from './UserItem';

function UsersList(props) {
	if (props.items.length === 0) {
		return <h1 className={classes.center}>No users found.</h1>;
	}
//using map method for props.items; we simply pass a parameter where we get more attributes for received data.
//Through props.items, we receive a ITEMS array.
	return (
		<ul className={classes['users-list']}>
			{props.items.map((user) => (
				<UserItem
					key={user.id}
					id={user.id}
					image={user.image}
                    name={user.name}
                    placeCount={user.places}
				/>
			))}
		</ul>
	);
}

export default UsersList;
