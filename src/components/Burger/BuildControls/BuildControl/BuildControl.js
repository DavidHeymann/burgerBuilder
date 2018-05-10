import React from 'react';

import classes from './BuildControl.css';


const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.labal}</div>
        <button 
            className={classes.Less} 
            onClick={props.remove} 
            disabled={props.disable}>Less</button>
        <button 
            className={classes.More} 
            onClick={props.add}>More</button>
        <div className={classes.Label}>{props.count}</div>
    </div>
);

export default buildControl;