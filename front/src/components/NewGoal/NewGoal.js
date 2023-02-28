import React, { useState } from 'react';
import classes from './NewGoal.module.css'

const NewGoal = (props) => {
	const [enteredText, setEnteredText] = useState('');

    //onSubmit for form submission recreates a newGoal for each click. It resets fields to blank, it forwards new Goal.
	const addGoalHandler = (event) => {
		event.preventDefault();

		const newGoal = {
			id: Math.random().toString(),
			text: enteredText,
		};

		setEnteredText('');

		props.onAddGoal(newGoal);
	};
    //onChange for html element sees every typed text
	const textChangeHandler = (event) => {
		setEnteredText(event.target.value);
	};

	return (
		<form className={classes['new-goal']} onSubmit={addGoalHandler}>
			<input type="text" value={enteredText} onChange={textChangeHandler} />
			<button type="submit">Add Goal</button>
		</form>
	);
};

export default NewGoal;
