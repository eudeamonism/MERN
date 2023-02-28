import classes from './NewGoal.module.css';

function NewGoal(props) {

	const addGoalHandler = (event) => {
		event.preventDefault();

        const newGoal = { id: Math.random().toString(), text: 'My new goal!' };
        
		props.onAddGoal(newGoal)
	};

	return (
		<form className={classes['new-goal']} onSubmit={addGoalHandler}>
			<input type="text" />
			<button type="submit">Add Goal</button>
		</form>
	);
}

export default NewGoal;
