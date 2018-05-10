import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const controls=[
    { labal: 'Salad', type: 'salad'},
    { labal: 'Bacon', type: 'bacon'},
    { labal: 'Cheese', type: 'cheese'},
    { labal: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
        {
            controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.labal} 
                    labal={ctrl.labal} 
                    add={() => props.addIngredient(ctrl.type)}
                    remove={() => props.removeIngredient(ctrl.type)}
                    disable={props.disabled[ctrl.type]}
                    count={props.ingredients[ctrl.type]}/>
            ))
        }
        <button 
            className={classes.OrderButton} 
            disabled={props.purchasable}
            onClick={props.order}>ORDER NOW</button>
    </div>
)

export default buildControls;