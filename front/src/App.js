import React, { useState } from 'react';
import classes from './App.module.css';
import GoalList from './components/GoalList/GoalList';
import NewGoal from './components/NewGoal/NewGoal';

function App() {
	const [coarseGoals, setCoarseGoals] = useState([
		{ id: 'cg1', text: 'Finish the course!' },
		{ id: 'cg2', text: 'Learn stuff!' },
		{ id: 'cg3', text: 'Help others!' },
	]);

	//commented out: This opposite prop chain. We take useState constant and use the concat array method instead of push so no mutation takes place. We pass handlers parameter of newGoal.
	//This ensures order of execution
	//spread operator actually works as alternative
	const addNewGoalHandler = (newGoal) => {
		// setCoarseGoals(coarseGoals.concat(newGoal))
		setCoarseGoals(
			(prevCourseGoals) => prevCourseGoals.concat(newGoal)
			// return [...prevCourseGoals, newGoal]
		);
	};

	return (
		<div className={classes['coarse-goals']}>
			<h2>Course Goals</h2>
			<NewGoal onAddGoal={addNewGoalHandler} />
			<GoalList goals={coarseGoals} />
		</div>
	);
}

export default App;
