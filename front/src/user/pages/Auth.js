import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import { AuthContext } from '../../shared/context/auth-context';
import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
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
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

	const authSubmitHandler = async (event) => {
		event.preventDefault();
		if (isLogin) {
			try {
				const responseData = await sendRequest(
					'http://localhost:5000/api/users/login',
					'POST',
					JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
					{
						'Content-Type': 'application/json',
					}
				);
				auth.login(responseData.user.id);
				navigate('/');
			} catch (err) {}
		} else {
			try {
				const responseData = await sendRequest(
					'http://localhost:5000/api/users/signup',
					'POST',
					JSON.stringify({
						name: formState.inputs.name.value,
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
					{
						'Content-Type': 'application/json',
					}
				);
				auth.login(responseData.user.id);
				navigate('/');
			} catch (err) {}
		}
	};
	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
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
