//Will hold all useReducer and state logic here
import { useCallback, useReducer } from 'react';

//Place reducer outside of function as usual per useReducer
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

        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            }

		default:
			return state;
	}
};

//create own function with the convention of useSomething and export
export const useForm = (initialInputs, initialFormValidity) => {
	//Multiple states therefore we will use useReducer()
	//title is actually a possible value of the key 'id'
	//Right side:initial state which is updated after dispatch

	const [formState, dispatch] = useReducer(formReducer, {
		inputs: initialInputs,
		isValid: initialFormValidity,
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

	const setFormData = useCallback((inputData, formValidity) => {
		dispatch({
			type: 'SET_DATA',
			inputs: inputData,
			formIsValid: formValidity,
		});
	}, []);

	//We need to export data to that which imports this function where formState is the current state of useReducer and inputHandler is the handler function
	return [formState, inputHandler, setFormData];
};
