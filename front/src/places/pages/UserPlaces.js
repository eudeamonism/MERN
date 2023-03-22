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
                    `${process.env.REACT_APP_BACK_PORT}places/user/${userId}`
                );
                setLoadedPlaces(responseData.places);

            } catch (err) { }
        };
        fetchPlaces();
    }, [sendRequest, userId]);

    const placeDeletedHandler = (deletedPlaceId) => {
        setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
    }

        return (
            <>
                <ErrorModal error={error} onClear={clearError} />
                {isLoading && (
                    <div className="center">
                        <LoadingSpinner />
                    </div>
                )}

                {!isLoading && loadedPlaces && (
                    <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
                )}
            </>
        );
    }


export default UserPlaces;
