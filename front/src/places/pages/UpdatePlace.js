import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card'
import './PlaceForm.css';

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

const UpdatePlace = () => {
	const [isLoading, setIsLoading] = useState(true);

	const placeId = useParams().placeId;

	const [formState, inputHandler, setFormData] = useForm(
		{
			title: {
				value: '',
				isValid: false,
			},
			description: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
	// We placed it below database so we can access from it.

	useEffect(() => {
		if (identifiedPlace) {
			//Checking data to see if we have variables below.
			setFormData(
				{
					title: {
						value: identifiedPlace.title,
						isValid: true,
					},
					description: {
						value: identifiedPlace.description,
						isValid: true,
					},
				},
				true
			);
		}
		setIsLoading(false);
	}, [setFormData, identifiedPlace]);

	const placeUpdateSubmitHandler = (event) => {
		event.preventDefault();
		console.log(formState.inputs);
	};

if (!identifiedPlace) {
	return (
		<div className="center">
			<Card>
				<h2>Could not find place!</h2>
			</Card>
		</div>
	);
}

	if (isLoading) {
		return <h2 className="center">Loading...</h2>;
	}
	// formState.inputs.title.value
	//formState is what passes data from custom Hook to here where it holds the initial state of inputs. title is what we want so we access it's value property


	return (
		<form className="place-form" onSubmit={placeUpdateSubmitHandler}>
			<Input
				id="title"
				element="input"
				type="text"
				label="Title"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid title"
				onInput={inputHandler}
				initialValue={formState.inputs.title.value}
				initialValid={formState.inputs.title.isValid}
			/>
			<Input
				id="description"
				type="textarea"
				label="Description"
				validators={VALIDATOR_MINLENGTH(5)}
				errorText="Please enter a valid description (min. 5 characters"
				onInput={inputHandler}
				initialValue={formState.inputs.description.value}
				initialValid={formState.inputs.description.isValid}
			/>

			<Button type="submit" disabled={!formState.isValid}>
				UPDATE PLACE
			</Button>
		</form>
	);
};

export default UpdatePlace;
