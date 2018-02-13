import React, { Fragment, PureComponent } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false
    };

    this.purchaseHandler = this.purchaseHandler.bind(this);
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
  }

  componentDidMount() {
    axios.get('/ingredients.json').then(res => {
      this.setState({ingredients: res.data});
    }).catch(err => {
      this.setState({error: true});
    });
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
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Carlos Sosa',
        address: {
          street: 'Strasse 1, Berlin',
          country: 'Germany'
        },
        email: 'c@s.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order).then(res => {
      this.setState({loading: false, purchasing: false});
    }).catch(err => {
      this.setState({loading: false, purchasing: false});
    });
  }

  render() {
    const disabledIngredients = {...this.state.ingredients};
    for(let key in disabledIngredients) {
      disabledIngredients[key] = disabledIngredients[key] < 1;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients cant' be loaded</p> : <Spinner />;
    if(this.state.ingredients) {
      burger = (
        <Fragment>
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

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
    }

    if(this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);