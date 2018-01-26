import React, { Fragment, PureComponent } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

export default class BurgerBuilder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false
    };

    this.purchaseHandler = this.purchaseHandler.bind(this);
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(ing => ingredients[ing]).reduce((sum, ingSum) => sum + ingSum, 0);
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = this.state.ingredients[type] + 1;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const updatedIngredients = {...this.state.ingredients};
    if(updatedIngredients[type] < 1) {
      return;
    }
    updatedIngredients[type] = this.state.ingredients[type] - 1;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler() {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler() {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    alert('Success');
  }

  render() {
    const disabledIngredients = {...this.state.ingredients};
    for(let key in disabledIngredients) {
      disabledIngredients[key] = disabledIngredients[key] < 1;
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          add={this.addIngredientHandler}
          remove={this.removeIngredientHandler}
          disabled={disabledIngredients}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler} />
      </Fragment>
    );
  }
}