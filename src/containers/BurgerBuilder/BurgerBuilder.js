import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    addIngredientHandler = (type) => {
        const updateCount = this.state.ingredients[type];
        const newCount = updateCount + 1;
        const updateIngredients = { ...this.state.ingredients }
        updateIngredients[type] = newCount;
        const oldPrice = this.state.totalPrice;
        const typePrice = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + typePrice;
        this.setState({ totalPrice: newPrice, ingredients: updateIngredients });
        this.updatePurchaseState(updateIngredients)
    };

    removedIngredientHandler = (type) => {
        const updateCount = this.state.ingredients[type];
        const newCount = updateCount - 1;
        const updateIngredients = { ...this.state.ingredients }
        updateIngredients[type] = newCount;
        const oldPrice = this.state.totalPrice;
        const typePrice = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - typePrice;
        this.setState({ totalPrice: newPrice, ingredients: updateIngredients });
        this.updatePurchaseState(updateIngredients)
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => { return sum + el }, 0);
        this.setState({ purchasable: sum > 0 });

    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    cancalPurchaseHandler = () => {
        this.setState({ purchasing: false });
    };

    continuePurchaseHandler = () => {
        alert('Continue Order!');
    };

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} cancalOrder={this.cancalPurchaseHandler}>
                    <OrderSummary
                        price={this.state.totalPrice}
                        ingredient={this.state.ingredients}
                        continue={this.continuePurchaseHandler}
                        cancel={this.cancalPurchaseHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredients={this.state.ingredients}
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removedIngredientHandler}
                    disabled={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={!this.state.purchasable}
                    order={this.purchaseHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;