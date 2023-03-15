import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import { AuthContext } from '../../shared/context/auth-context';
import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook';
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './Auth.css';

const Auth = () => {
	const navigate = useNavigate();
	const auth = useContext(AuthContext);
	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: '',
				isValid: false,
			},
			password: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	const switchModeHandler = () => {
		//In signup mode however the useState will switch to logged in mode. Therefore, we have to update name to undefined to drop it.
		if (!isLogin) {
			setFormData(
				{
					...formState.inputs,
					name: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: '',
						isValid: false,
					},
				},
				false
			);
		}
		setIsLogin((prevMode) => !prevMode);
	};

	//For this handler, we want to fetch both login and signup.
	const authSubmitHandler = async (event) => {
		event.preventDefault();
		//Set loading spinner here since loading will most likely take a lot of time
		setIsLoading(true);
		if (isLogin) {
			try {
				//login fetch
				const response = await fetch('http://localhost:5000/api/users/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
				});
				//Parse response body: This also includes, if applicable, error
				const responseData = await response.json();
				//this catches 400 or 500'sh responses
				if (!response.ok) {
					//this is default JS error and throw returns where catch block triggers
					throw new Error(responseData.message);
				}
				setIsLoading(false);
				auth.login();
				navigate('/');
			} catch (err) {
				console.log(err);
				setIsLoading(false);
				setError(err.message || 'Something went wrong, please try again.');
			}
		} else {
			try {
				//signup fetch
				const response = await fetch('http://localhost:5000/api/users/signup', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: formState.inputs.name.value,
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
				});
				//Parse response body: This also includes, if applicable, error
				const responseData = await response.json();
				//this catches 400 or 500'sh responses
				if (!response.ok) {
					//this is default JS error and throw returns where catch block triggers
					throw new Error(responseData.message);
				}

				setIsLoading(false);
				auth.login();
				navigate('/');
			} catch (err) {
				console.log(err);
				setIsLoading(false);
				setError(err.message || 'Something went wrong, please try again.');
			}
		}
	};

	//We want to reset our error Modal: null to clear rather than false because otherwise it will refresh
	const errorHandler = () => {
		setError(null);
	};
	return (
		<>
			<ErrorModal error={error} onClear={errorHandler} />
			<Card className="authentication">
				{isLoading && <LoadingSpinner asOverlay />}
				<h2>Login Required</h2>
				<hr />
				<form onSubmit={authSubmitHandler}>
					{!isLogin && (
						<Input
							element="input"
							id="name"
							type="text"
							label="Your Name"
							validators={[VALIDATOR_REQUIRE()]}
							errorText="Please enter a name"
							onInput={inputHandler}
						/>
					)}
					<Input
						id="email"
						element="input"
						type="email"
						label="Email"
						validators={[VALIDATOR_EMAIL()]}
						errorText="Please enter a valid email address"
						onInput={inputHandler}
					/>
					<Input
						id="password"
						element="input"
						type="password"
						label="Password"
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText="Please enter a valid password"
						onInput={inputHandler}
					/>
					<Button disabled={!formState.isValid}>
						{isLogin ? 'LOGIN' : 'SIGNUP'}
					</Button>
				</form>
				<Button inverse onClick={switchModeHandler}>
					SWITCH TO {isLogin ? 'SIGNUP' : 'LOGIN'}
				</Button>
			</Card>
		</>
	);
};

export default Auth;
