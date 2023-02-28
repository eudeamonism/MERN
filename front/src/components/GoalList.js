import React from 'react';
import classes from './GoalList.module.css';

function GoalList(props) {
	console.log(props.goals);
	return (
        <ul className={classes['goal-list']}>
            {props.goals.map((goal) => {
                return <li key={goal.id}>{goal.text}</li>
            })}
        </ul>
	);
}

export default GoalList;
