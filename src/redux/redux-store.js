import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import filtersReducer from './reducers/filters-reducer';
import pizzaReducer from './reducers/pizza-reducer';
import thunk from 'redux-thunk';
import cartReducer from './reducers/cart-reducer';
/*

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
*/
const mainReducer = combineReducers({
    pizzaData: pizzaReducer,
    filters: filtersReducer,
    cart: cartReducer
});
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(mainReducer, composeEnhancers(
    applyMiddleware(thunk)
));
window.store = store;

export default store;
