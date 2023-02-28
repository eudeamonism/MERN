import React from 'react';
import classes from './App.module.css';
import GoalList from './components/GoalList';

function App() {
	const coarseGoals = [
		{ id: 'cg1', text: 'Finish the course!' },
		{ id: 'cg2', text: 'Learn stuff!' },
		{ id: 'cg3', text: 'Help others!' },
	];
	return (
		<div className={classes['coarse-goals']}>
			<h2>Course Goals</h2>
			<GoalList goals={coarseGoals} />
		</div>
	);
}

export default App;
