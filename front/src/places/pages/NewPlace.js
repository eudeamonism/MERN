import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
//Custom Hook
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './PlaceForm.css';

const NewPlace = () => {
	const navigate = useNavigate();
	const auth = useContext(AuthContext);
	const { sendRequest, isLoading, error, clearError } = useHttpClient();
	//Custom Hook and pass initial state values (right side): Takes two arguments: initial state, and validity which we pass false only.
	//we are going to intercept the two left arguments from our custom hook, array destructuring.
	//We do this without having to call props!!
	const [formState, inputHandler] = useForm(
		{
			title: {
				value: '',
				isValid: false,
			},
			description: {
				value: '',
				isValid: false,
			},
			address: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	//To send this collected data to the server when we have server.
	const placeSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			await sendRequest(
				'http://localhost:5000/api/places',
				'POST',
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
					address: formState.inputs.address.value,
					creator: auth.userId,
				}),
				{ 'Content-Type': 'application/json' }
			);
			//Redirect the user to a different page
        } catch (err) { }
        navigate('/')
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
				<Input
					id="title"
					element="input"
					type="text"
					label="Title"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Please enter a valid title."
					onInput={inputHandler}
				/>
				<Input
					id="description"
					element="textarea"
					label="Description"
					validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
					errorText="Please enter a valid description (at least 5 characters)."
					onInput={inputHandler}
				/>
				<Input
					id="address"
					element="input"
					label="Address"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Please enter a valid address."
					onInput={inputHandler}
				/>
				<Button type="submit" disabled={!formState.isValid}>
					ADD PLACE
				</Button>
			</form>
		</>
	);
};

export default NewPlace;
