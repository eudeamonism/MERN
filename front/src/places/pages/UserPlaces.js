import React from 'react';
import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom';
const DUMMY_PLACES = [
	{
		id: 'p1',
		image:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.irlabnp.org%2Fwp-content%2Fuploads%2F2016%2F11%2Fpisa.jpg&f=1&nofb=1&ipt=f71b9f70d1c19614479a9c567cd9ccd8600db33986ed55455e7624c7abefc38c&ipo=images',
		title: 'Some Italian Landmark',
		description:
			'A remarkable image which most likely would entail a remarkable yet flooded destination.',
		address: '123 I-Dunno Street, Some Place In Italy, Italy',
		location: {
			lat: 43.722971,
			lng: 10.3966543,
		},
		creatorId: 'u1',
	},
	{
		id: 'p2',
		image:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flonelyplanetimages.imgix.net%2Fa%2Fg%2Fhi%2Ft%2Fd9960974f6e911075de951b22a332fbe-tokyo-national-museum.jpg&f=1&nofb=1&ipt=2df7161738847d67bc47510aa8885b7721df230583a6315d65489a732bcc9c26&ipo=images',
		title: 'National Museum of Modern Art, Tokyo',
		description:
			'Renovated 1969 gallery housing Japanese art created since the start of the Meiji period (1868).',
		address: '3-1 Kitanomarukoen, Chiyoda City, Tokyo 102-8322, Japan',
		location: {
			lat: 35.6905432,
			lng: 139.7423121,
		},
		creatorId: 'u2',
	},
];

//This houses DB where we will pass DUMMY data.
function UserPlaces() {
    //We use this to get things with a colon: /:id/places
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(pl => pl.creatorId === userId)


	return <PlaceList items={loadedPlaces} />;
}

export default UserPlaces;
