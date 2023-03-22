import { useState, useCallback, useEffect } from 'react';

export const useAuth = () => {
	let logoutTimer;

	const [token, setToken] = useState(false);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [userId, setUserId] = useState(false);

	const login = useCallback((uid, token, expirationDate) => {
		setToken(token);
		setUserId(uid);
		const tokenExpirationDate =
			expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid,
				token: token,
				expiration: tokenExpirationDate.toISOString(),
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setTokenExpirationDate(null);
		setUserId(null);
		localStorage.removeItem('userData');
	}, []);

	//Will work on storing token for further logins
	//tokenExpirationDate is scoped below and is not the useState variable

	//If token changes,
	useEffect(() => {
		if (token && tokenExpirationDate) {
			//getTime() converts to milliseconds, which is what is expected in setTimeout.
			const remainingTime =
				tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	//Runs only once per restart, and we will find token when it mounts, renders the first time.
	useEffect(() => {
		//Parse takes a string and converts it to an object.
		//This will have a userId and a token.
		const storedData = JSON.parse(localStorage.getItem('userData'));
		//Token is still in the future therefore valid
		if (
			storedData &&
			storedData.token &&
			new Date(storedData.expiration) > new Date()
		) {
			login(
				storedData.userId,
				storedData.token,
				new Date(storedData.expiration)
			);
		}
	}, [login]);
	return { token, login, logout, userId };
};
