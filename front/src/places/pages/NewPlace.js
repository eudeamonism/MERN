import React, { useCallback, useReducer } from 'react';
import Button from '../../shared/FormElements/Button';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';

import Input from '../../shared/FormElements/Input';
import './NewPlace.css';

const formReducer = (state, action) => {
	//actions via switch
	switch (action.type) {
		case 'INPUT_CHANGE':
			let formIsValid = true;
			// for( const whatEver in state.inputs) where state.inputs is the initial state object we set
			for (const inputId in state.inputs) {
				//is the <Input id="?"> === to the <Input action.id="?"> ? where action is the dispatch update function
				if (inputId === action.inputId) {
					formIsValid = formIsValid && action.isValid;
				} else {
					//else means no action for the id, no update has taken place. Therefore, formIsValid = that the past state true is true and that state.inputs takes me to id where the key value is what it was before either description or title and that is set to its default value of isValid which in the beginning would be false
					formIsValid = formIsValid && state.inputs[inputId].isValid;
				}
			}
			//This updates. We take initial state with ...state. Next, we are looking at input which is something we add.
			return {
				...state,
				inputs: {
					...state.inputs,
					[action.inputId]: { value: action.value, isValid: action.isValid },
				},
				isValid: formIsValid,
			};

		default:
			return state;
	}
};

const NewPlace = () => {
	//Multiple states therefore we will use useReducer()
	//title is actually a possible value of the key 'id'
	//Right side:initial state which is updated after dispatch

	const [formState, dispatch] = useReducer(formReducer, {
		inputs: {
			title: {
				value: '',
				isValid: false,
			},
			description: {
				value: '',
				isValid: false,
			},
		},
		isValid: false,
	});

	//Could lead to an infinte loop. So, we need to useCallback hook to prevent this function from rerendering.
	//It does take dependencies like useEffect, but in this instance we leave it blank so IT WILL NOT RERUN.

	const inputHandler = useCallback((id, value, isValid) => {
		//We simply update two keys while adding a new key, inputId to the initial state which may alter id key
		//this works for both cases: description id or title id for Input element properties
		dispatch({
			type: 'INPUT_CHANGE',
			value: value,
			isValid: isValid,
			inputId: id,
		});
	}, []);
    //To send this collected data to the server when we have server.
	const placeSubmitHandler = (event) => {
        event.preventDefault();

        console.log(formState.inputs)
	};

	return (
		<form className="place-form" onSubmit={placeSubmitHandler}>
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
	);
};

export default NewPlace;
