import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
function Users() {
	const { sendRequest, isLoading, error, clearError } = useHttpClient();
	const [loadedUsers, setLoadedUsers] = useState();

	//We're using useEffect hook and IIFE to run async await
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const responseData = await sendRequest('http://localhost:5000/api/users');



				setLoadedUsers(responseData.users);
			} catch (err) {

			}

		};
		fetchUsers();
	}, [sendRequest]);


	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
		</>
	);
}

export default Users;
