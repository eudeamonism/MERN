import React from 'react'
import classes from './App.module.css'

function App() {
  return (
      <div className={classes['coarse-goals']}>
          <h2>Course Goals</h2>
          <ul className={classes['goal-list']}>
          <li>Finish the Course</li>
          <li>Learn all about the Course's Main Topic</li>
          <li>Help Other Students</li>
          </ul>

      </div>
  )
}

export default App;