import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

//router.get('/user/:uid', placesControllers.getPlacesByUserId);

function UserPlaces() {
	const [loadedPlaces, setLoadedPlaces] = useState();
	const { sendRequest, isLoading, error, clearError } = useHttpClient();

	const userId = useParams().userId;

	useEffect(() => {
		const fetchPlaces = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:5000/api/places/user/${userId}`
				);
				setLoadedPlaces(responseData.places);
			} catch (err) {}
		};
		fetchPlaces();
	}, [sendRequest, userId]);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}

			{!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
		</>
	);
}

export default UserPlaces;
