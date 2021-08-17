import {pizzaDataAPI} from '../../api/api';

const SET_PIZZA_DATA = 'SET_PIZZA_DATA';

const initialState = {
    items: [],
    availablePizzaTypes: ['Thin', 'Traditional'],
    availablePizzaSizes: [32, 42, 60],
    isLoaded: false
};

const pizzaReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PIZZA_DATA:
            return {
                ...state,
                items: [...action.payload],
                isLoaded: true
            };

        default:
            return state;
    }
};

export const setPizzaData = (items) => ({
    type: SET_PIZZA_DATA,
    payload: items
});

export const fetchPizzaData = () => async dispatch => {
    try {
        let response = await pizzaDataAPI.fetchData();
        if (response.status === 200) {
            dispatch(setPizzaData(response.data));
        }
    } catch (e) {
        alert(e);
    }
};
export default pizzaReducer;